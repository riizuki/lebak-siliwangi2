import { useEffect, useState, useRef } from 'react';

const DARK_AREAS = '#beranda, #kontak, .bg-moss, .bg-moss-dark, .bg-night, [data-dark]';

// Tombol/link yang lebih besar dari ini tidak dibungkus, cukup titik kecil
const MAX_WRAP = { w: 320, h: 120 };

/*
  Jenis efek hover:
  - person   : lingkaran besar berisi nama + teks melingkar berputar (kartu anggota tim)
  - view     : lingkaran kaca buram + ikon perbesar + label (halaman galeri, gambar lain, peta)
  - orbit    : lingkaran gelap berisi ikon orbit 3D yang berputar + label (model 3D, bisa diputar dengan drag)
  - slide    : kapsul berisi label + panah yang terus bergeser (foto berjalan di Dokumentasi)
  - frame    : bingkai jendela bidik kamera + titik REC berkedip (foto program kerja)
  - shutter  : lingkaran putih berisi bukaan lensa kamera yang terbuka saat masuk foto dan "menjepret" saat diklik (halaman galeri)
  - album    : tumpukan kartu polaroid berisi foto yang disorot + nomor urut (galeri beranda)
  - external : bulatan dengan panah ↗ (link yang membuka tab baru)
  - action   : cursor "menempel" dan membungkus bentuk tombol/link (efek magnet)
  - mentor   : lencana emas eksklusif untuk DPL: cincin emas berkilau, peran melingkar, ikon toga + nama
  - logo     : cincin warna berputar + nama instansi melingkar, tertarik ke tengah logo (logo mitra)
*/
export default function CustomCursor() {
  const [hover, setHover] = useState({ type: null, label: '', sub: '', color: '', img: '' });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [ripples, setRipples] = useState([]);

  const dotRef = useRef(null);
  const followerRef = useRef(null);
  const ringRef = useRef(null);
  const hoverTypeRef = useRef(null);
  const hoverElRef = useRef(null);

  const mouse = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -200, y: -200 });

  hoverTypeRef.current = hover.type;

  useEffect(() => {
    // Nonaktifkan pada layar sentuh
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animId;
    let visible = false;

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) {
        visible = true;
        setIsVisible(true);
        pos.current = { x: e.clientX, y: e.clientY };
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      const el = document.elementFromPoint(e.clientX, e.clientY);
      // Mode gelap aktif: seluruh halaman dianggap area gelap
      if (el) setIsDark(document.documentElement.classList.contains('dark') || !!el.closest(DARK_AREAS));
    };

    // Lingkaran pengikut: lerp + efek "stretch" sesuai arah dan kecepatan gerak
    const animate = () => {
      const ring = ringRef.current;
      const wrapEl = hoverTypeRef.current === 'action' ? hoverElRef.current : null;
      const logoEl = hoverTypeRef.current === 'logo' ? hoverElRef.current : null;
      let target = mouse.current;

      if (logoEl) {
        // Logo mitra: tertarik kuat ke tengah logo, tapi masih ikut sedikit gerakan mouse
        const r = logoEl.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        target = { x: cx + (mouse.current.x - cx) * 0.3, y: cy + (mouse.current.y - cy) * 0.3 };
      }

      if (wrapEl && ring) {
        // Efek magnet: menempel ke tengah tombol, sedikit tertarik ke arah mouse
        const r = wrapEl.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        target = { x: cx + (mouse.current.x - cx) * 0.12, y: cy + (mouse.current.y - cy) * 0.12 };
        ring.style.width = `${r.width + 14}px`;
        ring.style.height = `${r.height + 10}px`;
        ring.style.borderRadius = `${Math.min(parseFloat(getComputedStyle(wrapEl).borderRadius) + 6 || 10, (r.height + 10) / 2)}px`;
      } else if (ring && ring.style.width) {
        ring.style.width = '';
        ring.style.height = '';
        ring.style.borderRadius = '';
      }

      const dx = target.x - pos.current.x;
      const dy = target.y - pos.current.y;
      const ease = wrapEl || logoEl ? 0.22 : 0.16;
      pos.current.x += dx * ease;
      pos.current.y += dy * ease;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      if (ring) {
        const speed = Math.min(Math.hypot(dx, dy) / 120, 0.45);
        const stretch = hoverTypeRef.current ? 0 : speed;
        const angle = hoverTypeRef.current ? 0 : (Math.atan2(dy, dx) * 180) / Math.PI;
        ring.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch * 0.5})`;
      }

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    const onMouseDown = (e) => {
      setIsClicking(true);
      const id = Date.now() + Math.random();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    };
    const onMouseUp = () => setIsClicking(false);

    const onLeave = () => { visible = false; setIsVisible(false); };

    const set = (type, label = '', el = null, sub = '', color = '', img = '') => {
      hoverElRef.current = el;
      setHover((h) => (h.type === type && h.label === label && h.img === img ? h : { type, label, sub, color, img }));
    };

    const onMouseOver = (e) => {
      const t = e.target;

      if (t.closest('[data-cursor-none]')) return set(null);

      const labelEl = t.closest('[data-cursor]');
      if (labelEl?.dataset.cursorType === 'logo') {
        const d = labelEl.dataset;
        return set('logo', d.cursor, labelEl.querySelector('[data-logo-box]') || labelEl, d.cursorSub, d.cursorColor);
      }
      if (labelEl?.dataset.cursorType === 'mentor') return set('mentor', labelEl.dataset.cursor, null, labelEl.dataset.cursorSub);
      if (labelEl?.dataset.cursorType === 'album') {
        const d = labelEl.dataset;
        return set('album', d.cursor, null, d.cursorCount, '', d.cursorImg);
      }
      if (labelEl?.dataset.cursorType === 'orbit') return set('orbit', labelEl.dataset.cursor, null, labelEl.dataset.cursorSub);
      if (labelEl) return set(labelEl.dataset.cursorType || 'view', labelEl.dataset.cursor);

      const link = t.closest('a, button, input, textarea, select, [role="button"]');
      if (link) {
        if (link.matches('a[target="_blank"]')) return set('external');
        const r = link.getBoundingClientRect();
        const wrap = r.width <= MAX_WRAP.w && r.height <= MAX_WRAP.h;
        return set('action', '', wrap ? link : null);
      }

      if (t.closest('figure, img, iframe')) return set('view');

      set(null);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Putih di area gelap, hijau di area terang
  const c = isDark
    ? { border: 'border-white', borderSoft: 'border-white/60', fill: 'bg-white', fillSoft: 'bg-white/10', text: 'text-night', ripple: 'border-white/70' }
    : { border: 'border-moss', borderSoft: 'border-moss/50', fill: 'bg-moss', fillSoft: 'bg-moss/10', text: 'text-white', ripple: 'border-moss/60' };

  const type = hover.type;

  const ringSize = {
    person: 'w-[104px] h-[104px]',
    view: 'w-[88px] h-[88px]',
    external: 'w-16 h-16',
    action: 'w-12 h-12',
    logo: 'w-[148px] h-[148px]',
    slide: 'w-0 h-0',
    orbit: 'w-0 h-0',
    frame: 'w-0 h-0',
    album: 'w-0 h-0',
    shutter: 'w-0 h-0',
    mentor: 'w-0 h-0',
  }[type] || (isClicking ? 'w-6 h-6' : 'w-9 h-9');

  const ringStyle = {
    person: `${c.fill} border-transparent shadow-[0_12px_40px_rgba(0,0,0,0.18)]`,
    view: 'opacity-0 border-transparent',
    external: `${c.fill} border-transparent shadow-[0_10px_30px_rgba(0,0,0,0.15)]`,
    action: `${c.fillSoft} ${c.border} border-[1.5px]`,
    logo: 'opacity-0 border-transparent',
    slide: 'opacity-0 border-transparent',
    orbit: 'opacity-0 border-transparent',
    frame: 'opacity-0 border-transparent',
    album: 'opacity-0 border-transparent',
    shutter: 'opacity-0 border-transparent',
    mentor: 'opacity-0 border-transparent',
  }[type] || `${c.borderSoft}`;

  const show = (t) => (type === t ? 'opacity-100 scale-100' : 'opacity-0 scale-50');

  return (
    <>
      {/* Lingkaran pengikut */}
      <div
        ref={followerRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div
          ref={ringRef}
          className={`absolute left-0 top-0 rounded-full border transition-[width,height,border-radius,background-color,border-color,opacity] duration-300 ease-out ${ringSize} ${ringStyle}`}
        />

        {/* person: lingkaran besar berisi nama + teks melingkar yang berputar */}
        <div
          className={`absolute left-0 top-0 w-[104px] h-[104px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${c.text} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${show('person')}`}
        >
          <svg viewBox="0 0 100 100" className="cursor-orbit absolute inset-0 w-full h-full">
            <defs>
              <path id="cursor-orbit-path" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
            </defs>
            <text className="fill-current text-[8.4px] font-medium uppercase tracking-[0.2em] opacity-60">
              <textPath href="#cursor-orbit-path">Lebak Siliwangi 2 • KKN UNIKOM • </textPath>
            </text>
          </svg>
          <span className="relative font-heading text-[15px] leading-none whitespace-nowrap">{type === 'person' && hover.label}</span>
        </div>

        {/* view: lingkaran kaca buram berisi ikon perbesar + label */}
        <div
          className={`absolute left-0 top-0 w-[88px] h-[88px] -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center gap-1 text-white bg-white/15 backdrop-blur-md border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${show('view')}`}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          {hover.label && (
            <span className="text-[10px] font-medium uppercase tracking-[0.18em]">{type === 'view' && hover.label}</span>
          )}
        </div>

        {/* logo: cincin warna instansi yang berputar + nama instansi melingkar */}
        <div
          style={{ '--logo': hover.color || 'var(--color-clay)' }}
          className={`absolute left-0 top-0 w-[148px] h-[148px] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            type === 'logo' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-[0.4] -rotate-90'
          }`}
        >
          <div className="cursor-logo-halo absolute inset-0 rounded-full" />
          <div className="cursor-logo-ring absolute inset-[10px] rounded-full" />
          <svg viewBox="0 0 100 100" className="cursor-orbit-reverse absolute inset-0 w-full h-full">
            <defs>
              <path id="cursor-logo-path" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
            </defs>
            <text className="text-[5.6px] font-semibold uppercase" style={{ fill: 'var(--logo)' }}>
              <textPath href="#cursor-logo-path" textLength="262" lengthAdjust="spacing">
                {type === 'logo' && `${hover.label} • ${hover.sub} • `}
              </textPath>
            </text>
          </svg>
        </div>

        {/* orbit: lingkaran gelap berisi orbit 3D yang berputar, mengecil saat model digenggam */}
        <div
          className={`absolute left-0 top-0 w-[84px] h-[84px] -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center gap-1 text-white bg-night/80 backdrop-blur-md border border-white/25 shadow-[0_12px_32px_rgba(0,0,0,0.3)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            type === 'orbit' ? (isClicking ? 'opacity-100 scale-[0.82]' : 'opacity-100 scale-100') : 'opacity-0 scale-50'
          }`}
        >
          <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="16" cy="16" r="4" className="fill-current opacity-90" stroke="none" />
            <ellipse cx="16" cy="16" rx="13" ry="5.5" transform="rotate(-20 16 16)" opacity="0.55" />
            <g className={isClicking ? 'cursor-orbit-fast' : 'cursor-orbit-dot'} style={{ transformOrigin: '16px 16px' }}>
              <circle cx="29" cy="16" r="2" className="fill-current" stroke="none" />
            </g>
          </svg>
          <span className="text-[9px] font-medium uppercase tracking-[0.18em] whitespace-nowrap">{type === 'orbit' && (isClicking ? hover.sub || hover.label : hover.label)}</span>
        </div>

        {/* slide: kapsul berisi label + panah yang terus bergeser */}
        <div
          className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 h-12 pl-5 pr-4 rounded-full flex items-center gap-3 bg-white text-night shadow-[0_12px_32px_rgba(0,0,0,0.22)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            type === 'slide' ? 'opacity-100 scale-100' : 'opacity-0 scale-x-50 scale-y-75'
          }`}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap">{type === 'slide' && hover.label}</span>
          <span className="relative w-6 h-6 overflow-hidden rounded-full bg-night text-white">
            <svg viewBox="0 0 24 24" className="cursor-slide-arrow absolute inset-0 m-auto w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>

        {/* frame: bingkai jendela bidik kamera */}
        <div
          className={`absolute left-0 top-0 w-[84px] h-[64px] -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            type === 'frame' ? 'opacity-100 scale-100' : 'opacity-0 scale-150'
          }`}
        >
          <span className="absolute left-0 top-0 w-4 h-4 border-l-2 border-t-2 border-current rounded-tl-md" />
          <span className="absolute right-0 top-0 w-4 h-4 border-r-2 border-t-2 border-current rounded-tr-md" />
          <span className="absolute left-0 bottom-0 w-4 h-4 border-l-2 border-b-2 border-current rounded-bl-md" />
          <span className="absolute right-0 bottom-0 w-4 h-4 border-r-2 border-b-2 border-current rounded-br-md" />
          <span className="absolute left-1/2 top-1/2 w-3 h-px -translate-x-1/2 bg-current" />
          <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-y-1/2 bg-current" />
          <span className="absolute left-2.5 top-2 flex items-center gap-1 text-[8px] font-semibold tracking-[0.16em]">
            <span className="cursor-rec w-1.5 h-1.5 rounded-full bg-red-500" />
            REC
          </span>
          <span className="absolute left-1/2 -bottom-6 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.2em] whitespace-nowrap">{type === 'frame' && hover.label}</span>
        </div>

        {/* mentor: lencana emas eksklusif untuk DPL */}
        <div
          className={`absolute left-0 top-0 w-[132px] h-[132px] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            type === 'mentor' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'
          }`}
        >
          <div className="cursor-mentor-glow absolute -inset-3 rounded-full" />
          <div className="cursor-mentor-ring absolute inset-0 rounded-full" />
          <div className="absolute inset-[3px] rounded-full bg-night/45 backdrop-blur-[3px]" />
          <svg viewBox="0 0 100 100" className="cursor-orbit-reverse absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="cursor-mentor-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff1c1" />
                <stop offset="50%" stopColor="#e0b04a" />
                <stop offset="100%" stopColor="#fff1c1" />
              </linearGradient>
              <path id="cursor-mentor-path" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
            </defs>
            <text className="text-[5.4px] font-semibold uppercase" fill="url(#cursor-mentor-gold)">
              <textPath href="#cursor-mentor-path" textLength="250" lengthAdjust="spacing">
                {type === 'mentor' && `${hover.sub} ✦ ${hover.sub} ✦ `}
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-[30px] rounded-full bg-night/85 backdrop-blur-md border border-[#e0b04a]/50 shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center gap-1 text-white">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#f0cb6b]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 9l10-5 10 5-10 5L2 9z" />
              <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
              <path d="M22 9v6" />
            </svg>
            <span className="font-heading text-[12px] leading-none whitespace-nowrap">{type === 'mentor' && hover.label}</span>
          </div>
        </div>

        {/* shutter: lingkaran putih berisi bukaan lensa kamera */}
        <div
          className={`absolute left-0 top-0 w-[72px] h-[72px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-night shadow-[0_12px_32px_rgba(0,0,0,0.28)] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            type === 'shutter' ? (isClicking ? 'opacity-100 scale-90' : 'opacity-100 scale-100') : 'opacity-0 scale-50'
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <g
              className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transformOrigin: '12px 12px',
                transform: type !== 'shutter' ? 'rotate(-120deg) scale(0.4)' : isClicking ? 'rotate(45deg) scale(0.7)' : 'rotate(0deg) scale(1)',
              }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
              <line x1="9.69" y1="8" x2="21.17" y2="8" />
              <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
              <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
              <line x1="14.31" y1="16" x2="2.83" y2="16" />
              <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
            </g>
          </svg>
        </div>

        {/* album: tumpukan kartu polaroid berisi foto yang disorot + nomor urut */}
        <div
          className={`absolute left-5 top-5 w-[104px] h-[100px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            type === 'album' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{ transformOrigin: '0 0' }}
        >
          <span className={`absolute inset-x-1 top-1 h-[86px] rounded-[4px] bg-white/90 shadow-[0_6px_18px_rgba(0,0,0,0.25)] transition-transform duration-500 ${type === 'album' ? 'rotate-[-11deg] -translate-x-2' : ''}`} />
          <span className={`absolute inset-x-1 top-1 h-[86px] rounded-[4px] bg-white/95 shadow-[0_6px_18px_rgba(0,0,0,0.25)] transition-transform duration-500 delay-75 ${type === 'album' ? 'rotate-[9deg] translate-x-2' : ''}`} />
          {hover.img && (
            <div key={hover.img} className="cursor-card-in absolute inset-0 rotate-[-2deg] rounded-[4px] bg-white p-1.5 pb-0 shadow-[0_14px_34px_rgba(0,0,0,0.35)]">
              <img src={hover.img} alt="" className="w-full h-[70px] object-cover rounded-[2px]" />
              <div className="h-[24px] flex items-center justify-between px-0.5 text-night">
                <span className="text-[8px] font-semibold uppercase tracking-[0.16em]">{hover.label}</span>
                <span className="text-[8px] tabular-nums text-night/60">{hover.sub}</span>
              </div>
            </div>
          )}
        </div>

        {/* external: panah ↗ yang berputar masuk */}
        <div
          className={`absolute left-0 top-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${c.text} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${show('external')}`}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-6 h-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${type === 'external' ? 'rotate-0' : '-rotate-90'}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </div>
      </div>

      {/* Titik pusat */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translate3d(-200px, -200px, 0)' }}
      >
        <div
          className={`rounded-full ${c.fill} transition-all duration-200 ${
            ['person', 'view', 'external', 'logo', 'slide', 'orbit', 'frame', 'shutter', 'mentor'].includes(type)
              ? 'w-0 h-0'
              : type === 'action' ? 'w-1.5 h-1.5' : isClicking ? 'w-3 h-3' : 'w-2 h-2'
          }`}
        />
      </div>

      {/* Gelombang saat klik */}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className={`cursor-ripple fixed pointer-events-none z-[9998] rounded-full border ${c.ripple}`}
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  );
}
