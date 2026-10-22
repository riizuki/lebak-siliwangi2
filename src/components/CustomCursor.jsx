import { useEffect, useState, useRef } from 'react';

const DARK_AREAS = '#beranda, #kontak, .bg-moss, .bg-moss-dark, .bg-ink, [data-dark]';

// Tombol/link yang lebih besar dari ini tidak dibungkus, cukup titik kecil
const MAX_WRAP = { w: 320, h: 120 };

/*
  Jenis efek hover:
  - person   : lingkaran besar berisi nama + teks melingkar berputar (kartu anggota tim)
  - view     : lingkaran kaca buram + ikon perbesar + label (foto galeri, gambar, peta)
  - external : bulatan dengan panah ↗ (link yang membuka tab baru)
  - action   : cursor "menempel" dan membungkus bentuk tombol/link (efek magnet)
*/
export default function CustomCursor() {
  const [hover, setHover] = useState({ type: null, label: '' });
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
      if (el) setIsDark(!!el.closest(DARK_AREAS));
    };

    // Lingkaran pengikut: lerp + efek "stretch" sesuai arah dan kecepatan gerak
    const animate = () => {
      const ring = ringRef.current;
      const wrapEl = hoverTypeRef.current === 'action' ? hoverElRef.current : null;
      let target = mouse.current;

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
      pos.current.x += dx * (wrapEl ? 0.22 : 0.16);
      pos.current.y += dy * (wrapEl ? 0.22 : 0.16);

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

    const set = (type, label = '', el = null) => {
      hoverElRef.current = el;
      setHover((h) => (h.type === type && h.label === label ? h : { type, label }));
    };

    const onMouseOver = (e) => {
      const t = e.target;

      const labelEl = t.closest('[data-cursor]');
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
    ? { border: 'border-white', borderSoft: 'border-white/60', fill: 'bg-white', fillSoft: 'bg-white/10', text: 'text-ink', ripple: 'border-white/70' }
    : { border: 'border-moss', borderSoft: 'border-moss/50', fill: 'bg-moss', fillSoft: 'bg-moss/10', text: 'text-white', ripple: 'border-moss/60' };

  const type = hover.type;

  const ringSize = {
    person: 'w-[104px] h-[104px]',
    view: 'w-[88px] h-[88px]',
    external: 'w-16 h-16',
    action: 'w-12 h-12',
  }[type] || (isClicking ? 'w-6 h-6' : 'w-9 h-9');

  const ringStyle = {
    person: `${c.fill} border-transparent shadow-[0_12px_40px_rgba(0,0,0,0.18)]`,
    view: 'opacity-0 border-transparent',
    external: `${c.fill} border-transparent shadow-[0_10px_30px_rgba(0,0,0,0.15)]`,
    action: `${c.fillSoft} ${c.border} border-[1.5px]`,
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
            type === 'person' || type === 'view' || type === 'external'
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
