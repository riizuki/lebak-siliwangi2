import { useEffect, useState, useRef } from 'react';

const DARK_AREAS = '#beranda, #kontak, .bg-moss, .bg-moss-dark, .bg-ink';

export default function CustomCursor() {
  const [hover, setHover] = useState({ type: null, label: '' }); // type: 'action' | 'card' | 'label' | null
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [ripples, setRipples] = useState([]);

  const dotRef = useRef(null);
  const followerRef = useRef(null);
  const ringRef = useRef(null);
  const hoverTypeRef = useRef(null);

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
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      pos.current.x += dx * 0.16;
      pos.current.y += dy * 0.16;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        const speed = Math.min(Math.hypot(dx, dy) / 120, 0.45);
        const stretch = hoverTypeRef.current ? 0 : speed;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        ringRef.current.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch * 0.5})`;
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

    const onMouseOver = (e) => {
      const t = e.target;

      const labelEl = t.closest('[data-cursor]');
      if (labelEl) return setHover({ type: 'label', label: labelEl.dataset.cursor });

      if (t.closest('a, button, input, textarea, select, [role="button"]')) {
        return setHover({ type: 'action', label: '' });
      }

      if (t.closest('figure, img, iframe')) return setHover({ type: 'card', label: '' });

      setHover({ type: null, label: '' });
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

  const ringSize = {
    label: 'w-3 h-3',
    card: 'w-16 h-16',
    action: 'w-12 h-12',
  }[hover.type] || (isClicking ? 'w-6 h-6' : 'w-9 h-9');

  const ringStyle = {
    label: 'opacity-0 border-transparent',
    card: `${c.fillSoft} ${c.borderSoft} backdrop-blur-[2px]`,
    action: `${c.fillSoft} ${c.border} border-2`,
  }[hover.type] || `${c.borderSoft}`;

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
          className={`absolute left-0 top-0 rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-out ${ringSize} ${ringStyle}`}
        />
        {/* Label: pil kaca kecil di kanan bawah cursor */}
        <span
          className={`absolute left-4 top-4 origin-top-left flex items-center gap-2 pl-2.5 pr-3.5 py-1.5 rounded-full text-[12px] font-medium tracking-wide whitespace-nowrap backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDark ? 'bg-white/90 text-ink' : 'bg-ink/85 text-white'
          } ${hover.type === 'label' ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-1'}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-moss' : 'bg-clay'}`} />
          {hover.label}
        </span>
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
            hover.type === 'action' ? 'w-1.5 h-1.5' : isClicking ? 'w-3 h-3' : 'w-2 h-2'
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
