import { useState, useEffect, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faXmark, faArrowRight, faArrowUp, faArrowUpRightFromSquare,
  faLocationDot, faGlobe, faSun, faMoon
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

import { createPortal } from 'react-dom';
import { usePrefs } from './preferences';
import CustomCursor from './components/CustomCursor';

const scrollTo = (e, href) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

/* ── Header section: nomor + label di kiri, judul di kanan ── */

function SectionHeader({ no, label, title, subtitle }) {
  return (
    <div className="grid md:grid-cols-12 gap-3 md:gap-6 border-t border-ink/20 pt-5 mb-10 md:mb-14">
      <p className="md:col-span-3 text-sm text-muted">
        <span className="text-clay">{no}</span> &nbsp;{label}
      </p>
      <div className="md:col-span-9">
        <h2 className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] leading-[1.1] text-ink">{title}</h2>
        {subtitle && <p className="mt-3 max-w-xl text-muted leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ── Tombol bahasa & mode tampilan ── */

function SiteControls({ solid = true }) {
  const { lang, setLang, theme, toggleTheme, t } = usePrefs();
  const dark = theme === 'dark';

  return (
    <div className="flex items-center gap-2 shrink-0">
      {/* Mobile: satu tombol yang langsung mengganti bahasa */}
      <button
        onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
        aria-label={`${t.language}: ${lang.toUpperCase()}`}
        className={`sm:hidden h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
          solid ? 'bg-paper-2 text-ink hover:bg-line' : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
        }`}
      >
        <FontAwesomeIcon icon={faGlobe} className="text-[13px]" />
        {lang}
      </button>

      <div
        role="group"
        aria-label={t.language}
        className={`hidden sm:flex items-center rounded-full p-1 text-xs font-medium transition-colors ${solid ? 'bg-paper-2' : 'bg-white/10 backdrop-blur-md'}`}
      >
        {['id', 'en'].map((code) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`px-2.5 py-1 rounded-full uppercase tracking-wide transition-colors ${
              lang === code
                ? solid ? 'bg-paper text-ink shadow-sm' : 'bg-white/25 text-white'
                : solid ? 'text-muted hover:text-ink' : 'text-white/70 hover:text-white'
            }`}
          >
            {code}
          </button>
        ))}
      </div>

      <button
        onClick={toggleTheme}
        aria-label={dark ? t.toLight : t.toDark}
        title={dark ? t.toLight : t.toDark}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
          solid ? 'bg-paper-2 text-ink hover:bg-line' : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
        }`}
      >
        <FontAwesomeIcon icon={dark ? faSun : faMoon} className="text-sm" />
      </button>
    </div>
  );
}

/* ── Navbar ── */

function Navbar() {
  const { NAV_LINKS, t } = usePrefs();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#beranda');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.75);

      // Tandai section yang sedang terlihat
      const y = window.scrollY + 120;
      let current = NAV_LINKS[0].href;
      for (const { href } of NAV_LINKS) {
        const el = document.querySelector(href);
        if (el && el.offsetTop <= y) current = href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [NAV_LINKS]);

  const handleClick = (e, href) => {
    setIsOpen(false);
    scrollTo(e, href);
  };

  const solid = scrolled || isOpen;
  const links = NAV_LINKS.slice(1, -1);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-paper/85 backdrop-blur-xl border-b border-line shadow-[0_1px_12px_rgba(16,24,20,0.04)] text-ink'
          : 'bg-transparent border-b border-transparent text-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        <a href="#beranda" onClick={(e) => handleClick(e, '#beranda')} className="flex items-center gap-2.5 min-w-0">
          <img src="/images/logo-kkn.jpg" alt="Logo KKN Lebak Siliwangi 2" className="w-9 h-9 rounded-full bg-white object-contain shrink-0" />
          <span className="leading-tight min-w-0">
            <span className="block font-heading font-semibold text-[15px] tracking-tight truncate">KKN Lebak Siliwangi 2</span>
            <span className={`block text-[11px] ${solid ? 'text-muted' : 'text-white/70'}`}>UNIKOM 2026</span>
          </span>
        </a>

        <nav
          className={`hidden lg:flex items-center gap-1 rounded-full p-1 text-sm transition-colors ${
            solid ? 'bg-paper-2' : 'bg-white/10 backdrop-blur-md'
          }`}
        >
          {links.map(({ label, href }) => {
            const isActive = active === href;
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={`px-3.5 py-1.5 rounded-full transition-colors ${
                  isActive
                    ? solid ? 'bg-paper text-ink shadow-sm' : 'bg-white/20 text-white'
                    : solid ? 'text-muted hover:text-ink' : 'text-white/80 hover:text-white'
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <SiteControls solid={solid} />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden w-10 h-10 -mr-1 flex items-center justify-center rounded-full ${solid ? 'bg-paper-2' : 'bg-white/15'}`}
            aria-label={t.menu}
          >
            <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="lg:hidden bg-paper border-t border-line px-4 sm:px-6 py-3 space-y-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className={`block px-3 py-2.5 rounded-xl ${active === href ? 'bg-paper-2 text-ink font-medium' : 'text-muted'}`}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ── Hero ── */

function HeroSection() {
  const { HERO_CONTENT, TEAM_MEMBERS, t } = usePrefs();
  const facts = [
    [t.factLocation, 'Lebak Siliwangi · RW 05 & RW 07'],
    [t.factFocus, t.factFocusValue],
    [t.factTeam, t.students(TEAM_MEMBERS.length)],
  ];

  return (
    <section id="beranda" className="relative min-h-[100svh] flex flex-col justify-end bg-night text-white overflow-hidden">
      <img
        src={HERO_CONTENT.poskoImage}
        alt={t.heroAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

      <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10 sm:pb-14">
        <p className="text-sm text-white/75 mb-4">{HERO_CONTENT.badge}</p>
        <h1 className="text-[2.1rem] sm:text-5xl lg:text-[4.25rem] leading-[1.08] sm:leading-[1.05] max-w-4xl">
          {HERO_CONTENT.title}{' '}
          <span className="text-[#9fe3bf]">{HERO_CONTENT.titleHighlight}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed">
          {HERO_CONTENT.description}
        </p>

        <a
          href="#proker"
          onClick={(e) => scrollTo(e, '#proker')}
          className="mt-8 inline-flex items-center gap-2 border-b border-white/60 pb-1 hover:border-white"
        >
          {HERO_CONTENT.ctaPrimary}
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </a>

        <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 border-t border-white/25 pt-5 text-sm">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="text-white/60">{k}</dt>
              <dd className="mt-0.5">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ── Foto kegiatan berjalan (infinite marquee) ── */

function MarqueeRow({ items, reverse, duration }) {
  const { t } = usePrefs();
  // Daftar digandakan supaya animasi geser -50% menyambung tanpa jeda
  return (
    <div className="marquee-track overflow-hidden">
      <div className={`marquee ${reverse ? 'marquee-reverse' : ''}`} style={{ '--marquee-duration': `${duration}s` }}>
        {[...items, ...items].map((item, i) => (
          <a
            key={i}
            href="/galeri"
            data-cursor={t.cursorGallery}
            data-cursor-type="slide"
            aria-hidden={i >= items.length}
            tabIndex={i >= items.length ? -1 : undefined}
            className="group relative shrink-0 pr-3 sm:pr-4"
          >
            <div className="relative w-48 h-36 sm:w-64 sm:h-48 lg:w-[300px] lg:h-56 overflow-hidden rounded-2xl bg-paper-2">
              <img src={item.src} alt={item.title} className="w-full h-full object-cover object-[center_35%] transition-[filter] duration-500 group-hover:brightness-[0.8]" loading="lazy" />
              <span className="absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-night/80 to-transparent text-white text-xs leading-snug opacity-0 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                {item.title}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ActivityMarquee() {
  const { GALLERY_ITEMS, t } = usePrefs();
  const half = Math.ceil(GALLERY_ITEMS.length / 2);
  return (
    <section id="dokumentasi" aria-label={t.marqueeLabel} className="py-14 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex items-end justify-between gap-6">
        <p className="text-sm text-muted max-w-md">
          <span className="text-ink font-medium">{t.marqueeLead}</span>{t.marqueeText}
        </p>
        <a href="/galeri" className="shrink-0 inline-flex items-center gap-2 text-sm text-ink border-b border-ink/30 hover:border-ink pb-0.5 transition-colors">
          {t.viewGallery}
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </a>
      </div>
      <div className="marquee-fade space-y-3 sm:space-y-4">
        <MarqueeRow items={GALLERY_ITEMS.slice(0, half)} duration={70} />
        <MarqueeRow items={GALLERY_ITEMS.slice(half)} duration={80} reverse />
      </div>
    </section>
  );
}

/* ── Struktur Tim ── */

function Person({ m, role, tag, caption = true, cursorType = 'person', cursorSub }) {
  const { TEAM_MEMBERS } = usePrefs();
  const no = TEAM_MEMBERS.findIndex((x) => x.name === m.name) + 1;

  return (
    <figure data-cursor={m.nickname || m.name.split(' ')[0]} data-cursor-type={cursorType} data-cursor-sub={cursorSub} className="team-person group">
      <div className="@container relative aspect-[4/5] overflow-hidden rounded-xl bg-paper-2">
        {m.avatar ? (
          <img src={m.avatar} alt={m.name} className="w-full h-full object-cover object-[center_35%]" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-heading text-4xl text-muted/60">
            {m.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
          </div>
        )}
        {/* Bingkai ganda ala pigura: garis tumbuh dari tengah tiap sisi, lalu nomor & keterangan muncul */}
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/55 via-night/5 to-night/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <span aria-hidden="true" className="absolute inset-3 pointer-events-none">
          <span className="absolute inset-x-0 top-0 h-px bg-white/80 scale-x-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100" />
          <span className="absolute inset-x-0 bottom-0 h-px bg-white/80 scale-x-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100" />
          <span className="absolute inset-y-0 left-0 w-px bg-white/80 scale-y-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100 group-hover:delay-150" />
          <span className="absolute inset-y-0 right-0 w-px bg-white/80 scale-y-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100 group-hover:delay-150" />
        </span>
        <span aria-hidden="true" className="absolute inset-[18px] pointer-events-none border border-white/30 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:delay-500" />
        <span aria-hidden="true" className="absolute inset-x-7 bottom-7 flex items-end justify-between gap-3 text-white pointer-events-none">
          <span className="font-heading text-xl sm:text-2xl leading-none tabular-nums opacity-0 translate-y-2 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-500">
            {tag || String(no).padStart(2, '0')}
          </span>
          <span className="hidden @[260px]:inline whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-white/80 opacity-0 translate-y-2 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-[600ms]">
            Lebak Siliwangi 2
          </span>
        </span>
      </div>
      {caption && <figcaption className="mt-3">
        {role && <p className="text-xs text-clay mb-0.5">{role}</p>}
        <p className="font-heading text-base leading-snug">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_1px] bg-[position:0_100%] transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_1px]">
            {m.name}
          </span>
        </p>
        <p className="text-sm text-muted">{m.jurusan}</p>
      </figcaption>}
    </figure>
  );
}

// Judul kelompok bergaris bawah: nama di kiri, keterangan di kanan
function TeamGroupHeading({ title, note }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3 mb-6">
      <h3 className="text-xl sm:text-2xl">{title}</h3>
      <span className="text-xs sm:text-sm text-muted text-right">{note}</span>
    </div>
  );
}

function AboutSection() {
  const { TEAM_MEMBERS, DPL, t } = usePrefs();
  const [ketua, sekretaris, bendahara] = TEAM_MEMBERS;
  const dpl = { name: DPL.name, nickname: DPL.nickname, avatar: DPL.photo, jurusan: DPL.affiliation };
  const divisions = [
    { name: t.divEvents, note: t.divEventsNote, members: TEAM_MEMBERS.slice(3, 6) },
    { name: t.divMedia, note: t.divMediaNote, members: TEAM_MEMBERS.slice(6, 11) },
  ];

  return (
    <section id="tentang" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          no="01"
          label={t.teamLabel}
          title="Lebak Siliwangi 2"
          subtitle={t.teamSubtitle}
        />

        {/* Dosen Pembimbing Lapangan: foto seukuran kartu anggota + keterangan di sampingnya */}
        <TeamGroupHeading title={t.divSupervisor} note={t.divSupervisorNote} />
        <div className="team-grid grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6">
          <Person m={dpl} tag="DPL" caption={false} cursorType="mentor" cursorSub={DPL.role} />
          <div className="sm:col-span-2 flex flex-col justify-center sm:pl-6 lg:pl-10">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.16em] text-clay">{DPL.role}</p>
            <p className="mt-2 font-heading text-lg sm:text-3xl leading-snug">{DPL.name}</p>
            <p className="mt-1 text-xs sm:text-sm text-muted">{DPL.affiliation}</p>
            <p className="hidden sm:block mt-5 max-w-lg text-muted leading-relaxed">{DPL.desc}</p>
          </div>
        </div>

        <div className="mt-20">
          <TeamGroupHeading title={t.divLeaders} note={`${t.divLeadersNote} · ${t.people(3)}`} />
          <div className="team-grid grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6">
            <Person m={ketua} role={t.roleLeader} />
            <Person m={sekretaris} role={t.roleSecretary} />
            <Person m={bendahara} role={t.roleTreasurer} />
          </div>
        </div>

        {divisions.map((d) => (
          <div key={d.name} className="mt-20">
            <TeamGroupHeading title={d.name} note={`${d.note} · ${t.people(d.members.length)}`} />
            <div className="team-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
              {d.members.map((m) => <Person key={m.name} m={m} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Program Kerja ── */

const STATUS = {
  selesai: { key: 'statusDone', cls: 'bg-moss text-white' },
  berjalan: { key: 'statusOngoing', cls: 'bg-clay/15 text-moss' },
  rencana: { key: 'statusPlanned', cls: 'bg-paper-2 text-muted border border-line' },
};

function ProgramSection() {
  const { PROGRAMS, GALLERY_ITEMS, t } = usePrefs();
  const [open, setOpen] = useState(null); // { items, index }

  const photosOf = (prog) =>
    (prog.photos || []).map((name) => GALLERY_ITEMS.find((g) => g.src === `/images/kegiatan/${name}.jpg`)).filter(Boolean);

  const close = useCallback(() => setOpen(null), []);
  const nav = useCallback((d) => setOpen((o) => o && { ...o, index: (o.index + d + o.items.length) % o.items.length }), []);

  return (
    <section id="proker" className="py-20 md:py-28 bg-paper-2/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          no="02"
          label={t.programLabel}
          title={t.programTitle}
          subtitle={t.programSubtitle}
        />

        <ol className="divide-y divide-line border-y border-line">
          {PROGRAMS.map((prog) => {
            const st = STATUS[prog.status];
            return (
              <li key={prog.id} className="grid md:grid-cols-12 gap-3 md:gap-6 py-8 md:py-10">
                <span className="md:col-span-1 font-heading text-2xl sm:text-3xl text-clay leading-none">{prog.id}</span>
                <div className="md:col-span-7">
                  <p className="text-xs uppercase tracking-wide text-muted mb-2">{prog.category}</p>
                  <h3 className="text-xl sm:text-2xl leading-snug mb-3">{prog.title}</h3>
                  <p className="text-muted leading-relaxed max-w-xl">{prog.desc}</p>
                  {photosOf(prog).length > 0 && (
                    <div className="mt-5 grid grid-cols-4 gap-1.5 sm:gap-2.5">
                      {photosOf(prog).map((g, i, arr) => (
                        <button
                          key={g.src}
                          type="button"
                          onClick={() => setOpen({ items: arr, index: i })}
                          data-cursor={t.cursorView}
                          data-cursor-type="frame"
                          aria-label={g.title}
                          className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-paper-2"
                        >
                          <img src={g.src} alt={g.title} loading="lazy" className="w-full h-full object-cover transition-[filter] duration-500 group-hover:brightness-90" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <dl className="md:col-span-4 md:pl-6 md:border-l border-line text-sm space-y-3 md:pt-6">
                  <div>
                    <dt className="text-muted text-xs mb-0.5">{t.time}</dt>
                    <dd>{prog.date}</dd>
                  </div>
                  <div>
                    <dt className="text-muted text-xs mb-1">{t.status}</dt>
                    <dd>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${st.cls}`}>{t[st.key]}</span>
                    </dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ol>
      </div>

      {open && <Lightbox items={open.items} index={open.index} onClose={close} onNav={nav} />}
    </section>
  );
}

/* ── Lokasi ── */

const mapsEmbed = (q) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed`;
const mapsLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

function LocationSection() {
  const { LOCATIONS, t } = usePrefs();
  const [selectedId, setSelectedId] = useState(LOCATIONS[0].id);
  const loc = LOCATIONS.find((l) => l.id === selectedId) || LOCATIONS[0];
  const details = [
    [t.address, loc.address],
    [t.hours, loc.hours],
    [t.contact, loc.contact],
  ].filter(([, v]) => v);

  return (
    <section id="lokasi" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          no="03"
          label={t.locationLabel}
          title={t.locationTitle}
          subtitle={t.locationSubtitle}
        />

        <div className="flex gap-6 overflow-x-auto border-b border-line mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {LOCATIONS.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelectedId(l.id)}
              className={`shrink-0 pb-3 -mb-px border-b-2 text-sm transition-colors ${
                selectedId === l.id ? 'border-moss text-ink font-medium' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {l.tabLabel}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 h-[340px] sm:h-[440px] bg-paper-2 rounded-xl overflow-hidden">
            <iframe
              key={loc.id}
              title={t.mapOf(loc.name)}
              src={mapsEmbed(loc.query)}
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm text-clay mb-2">{loc.category}</p>
            <h3 className="text-[1.375rem] sm:text-3xl leading-snug">{loc.name}</h3>
            <p className="mt-3 text-muted leading-relaxed">{loc.desc}</p>

            <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
              {details.map(([k, v]) => (
                <div key={k} className="py-3 flex justify-between gap-4">
                  <dt className="text-muted shrink-0">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>

            <a
              href={mapsLink(loc.query)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-moss hover:bg-moss-dark text-white text-sm rounded-full transition-colors"
            >
              {t.openRoute}
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Galeri ── */

// Jumlah foto yang tampil di landing page; sisanya di halaman /galeri
const HOME_GALLERY_LIMIT = 13;

function Lightbox({ items, index, onClose, onNav }) {
  const { GALLERY_FILTERS, t } = usePrefs();
  const item = items[index];
  // Arah geser foto: 1 = ke foto berikutnya, -1 = ke sebelumnya, 0 = baru dibuka
  const [dir, setDir] = useState(0);
  const stripRef = useRef(null);
  const touchX = useRef(null);

  const go = useCallback((d) => {
    if (!d) return;
    setDir(d > 0 ? 1 : -1);
    onNav(d);
  }, [onNav]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, go]);

  // Thumbnail aktif selalu di tengah filmstrip. Hanya filmstrip yang digulir:
  // scrollIntoView ikut menggeser wadah induk sehingga overlay bisa bergeser ke samping.
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.querySelector('[data-active="true"]');
    if (!active) return;
    const sr = strip.getBoundingClientRect();
    const ar = active.getBoundingClientRect();
    strip.scrollTo({ left: strip.scrollLeft + (ar.left - sr.left) - (sr.width - ar.width) / 2, behavior: 'smooth' });
  }, [index]);

  const pad = (n) => String(n).padStart(2, '0');
  const cat = GALLERY_FILTERS.find((f) => f.key === item.category)?.label;
  const navBtn =
    'absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-colors duration-300 hover:bg-white hover:text-night';

  // Dirender langsung ke body supaya posisi fixed tidak terpengaruh transform elemen induk
  return createPortal(
    <div
      data-dark
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      className="lightbox fixed inset-0 z-[100] bg-night flex flex-col overflow-clip"
    >
      {/* Latar: foto yang sama, diperbesar dan diburamkan supaya warnanya menyatu */}
      <img key={`bg-${item.src}`} src={item.src} alt="" aria-hidden="true" className="lightbox-bg absolute inset-0 w-full h-full object-cover scale-125 blur-3xl saturate-150 opacity-55 pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/45 to-night/95 pointer-events-none" />

      {/* Bilah atas: nomor, progres, kategori, tutup */}
      <div className="relative flex items-center gap-4 sm:gap-6 px-4 sm:px-6 h-16 text-white" onClick={(e) => e.stopPropagation()}>
        <span className="font-heading text-xl tabular-nums leading-none">
          {pad(index + 1)}
          <span className="text-sm text-white/40"> / {pad(items.length)}</span>
        </span>
        <span className="relative flex-1 max-w-[220px] h-px bg-white/15 overflow-hidden">
          <span className="absolute inset-y-0 left-0 bg-white transition-[width] duration-500 ease-out" style={{ width: `${((index + 1) / items.length) * 100}%` }} />
        </span>
        {cat && (
          <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
            {cat}
          </span>
        )}
        <button onClick={onClose} aria-label={t.close} className="ml-auto w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white hover:text-night text-white flex items-center justify-center transition-colors duration-300">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* Foto utama */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-24">
        <img
          key={item.src}
          src={item.src}
          alt={item.title}
          data-cursor-none
          onClick={(e) => e.stopPropagation()}
          style={{ '--dir': dir }}
          className="lightbox-img max-w-full max-h-full object-contain rounded-xl ring-1 ring-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
        />
        {items.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={t.prevPhoto} className={`${navBtn} left-3 sm:left-6`}>
              <FontAwesomeIcon icon={faArrowRight} className="rotate-180" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={t.nextPhoto} className={`${navBtn} right-3 sm:right-6`}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </>
        )}
      </div>

      {/* Keterangan + filmstrip */}
      <div className="relative px-4 sm:px-6 pt-4 pb-5" onClick={(e) => e.stopPropagation()}>
        <div key={item.src} className="lightbox-caption text-center">
          <p className="font-heading text-lg sm:text-xl text-white leading-snug">{item.title}</p>
          <p className="mt-1 text-xs sm:text-sm text-white/55">{item.location}</p>
        </div>
        {items.length > 1 && (
          <div ref={stripRef} className="no-scrollbar mt-4 overflow-x-auto [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
            <div className="flex gap-2 w-max mx-auto px-6 py-1.5">
              {items.map((it, i) => (
                <button
                  key={it.src}
                  data-active={i === index}
                  onClick={() => go(i - index)}
                  aria-label={it.title}
                  className={`shrink-0 w-14 h-10 sm:w-16 sm:h-11 rounded-md overflow-hidden transition-all duration-300 ${
                    i === index ? 'ring-2 ring-white opacity-100 -translate-y-0.5' : 'opacity-35 hover:opacity-80'
                  }`}
                >
                  <img src={it.src} alt="" loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

function GalleryGrid({ limit, picks, layout = 'classic' }) {
  const { GALLERY_ITEMS, GALLERY_FILTERS, t } = usePrefs();
  const [filter, setFilter] = useState('semua');
  const [openIdx, setOpenIdx] = useState(null);
  const matches = filter === 'semua' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === filter);
  // Tab "Semua" bisa memakai daftar foto pilihan; tab kategori tetap mengambil foto pertama sesuai batas
  const picked = picks && filter === 'semua' ? picks.map((src) => GALLERY_ITEMS.find((i) => i.src === src)).filter(Boolean) : matches;
  const filtered = limit ? picked.slice(0, limit) : picked;
  const countOf = (key) => (key === 'semua' ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.category === key).length);
  const justified = layout === 'justified';
  // Rasio asli tiap foto (dibaca saat foto selesai dimuat) untuk tata letak justified
  const [ratios, setRatios] = useState({});

  const close = useCallback(() => setOpenIdx(null), []);
  const nav = useCallback((d) => setOpenIdx((i) => (i + d + filtered.length) % filtered.length), [filtered.length]);

  return (
    <>
      <div className={`flex flex-wrap mb-8 text-sm ${justified ? 'gap-2' : 'gap-x-5 gap-y-2'}`}>
        {GALLERY_FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={
              justified
                ? `px-4 py-2 rounded-full border transition-colors ${filter === key ? 'bg-ink border-ink text-paper' : 'border-line text-muted hover:text-ink hover:border-ink/30'}`
                : filter === key ? 'text-ink underline underline-offset-4' : 'text-muted hover:text-ink'
            }
          >
            {label} <span className={justified && filter === key ? 'text-paper/60' : 'text-muted'}>({countOf(key)})</span>
          </button>
        ))}
      </div>

      {justified ? (
        <div className="justified-gallery flex flex-wrap gap-2.5 sm:gap-3.5">
          {filtered.map((item, idx) => {
            const cat = GALLERY_FILTERS.find((f) => f.key === item.category)?.label;
            const ratio = ratios[item.src] || 1.5;
            const scale = idx % 7 === 0 ? 1.8 : 1; // tiap 7 foto, satu tampil lebih besar
            return (
              <figure
                key={item.src}
                data-cursor={t.cursorOpen}
                data-cursor-type="shutter"
                onClick={() => setOpenIdx(idx)}
                style={{ flexGrow: ratio * scale, flexBasis: `calc(var(--row-h) * ${ratio * scale})` }}
                className="group relative overflow-hidden rounded-[18px] sm:rounded-3xl bg-paper-2 cursor-pointer"
              >
                <div style={{ paddingBottom: `${100 / (ratio * scale)}%` }} />
                <img
                  src={item.src}
                  alt={item.title}
                  onLoad={(e) => {
                    const r = e.currentTarget.naturalWidth / e.currentTarget.naturalHeight;
                    setRatios((prev) => (prev[item.src] === r ? prev : { ...prev, [item.src]: r }));
                  }}
                  className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-[filter] duration-500 group-hover:brightness-[0.78]"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-medium uppercase tracking-[0.14em] text-night opacity-0 -translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  {cat}
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4 pt-12 bg-gradient-to-t from-night/85 via-night/30 to-transparent text-white opacity-0 translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="block text-xs sm:text-sm leading-snug">{item.title}</span>
                  <span className="hidden sm:block text-[11px] text-white/70 mt-0.5">{item.location}</span>
                </figcaption>
              </figure>
            );
          })}
          {/* Penahan supaya foto di baris terakhir tidak melebar berlebihan */}
          <div aria-hidden="true" className="grow-[10]" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
          {filtered.map((item, idx) => {
            const featured = idx === 0 && filtered.length > 2;
            return (
              <figure key={item.src} data-cursor={t.cursorView} data-cursor-type="album" data-cursor-img={item.src} data-cursor-count={`${String(idx + 1).padStart(2, '0')} / ${String(filtered.length).padStart(2, '0')}`} onClick={() => setOpenIdx(idx)} className={featured ? 'col-span-2 row-span-2' : ''}>
                <div className={`overflow-hidden rounded-sm bg-paper-2 ${featured ? 'aspect-[4/3] lg:aspect-auto lg:h-[calc(100%-3.5rem)]' : 'aspect-[4/3]'}`}>
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <figcaption className="mt-2 text-sm">
                  <span className="text-ink">{item.title}</span>
                  <span className="block text-xs text-muted mt-0.5">{item.location}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}

      {openIdx !== null && filtered[openIdx] && <Lightbox items={filtered} index={openIdx} onClose={close} onNav={nav} />}
    </>
  );
}

function GallerySection() {
  const { GALLERY_ITEMS, HOME_GALLERY, t } = usePrefs();
  return (
    <section id="galeri" className="py-20 md:py-28 bg-paper-2/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          no="04"
          label={t.galleryLabel}
          title={t.galleryTitle}
          subtitle={t.gallerySubtitle}
        />

        <GalleryGrid limit={HOME_GALLERY_LIMIT} picks={HOME_GALLERY} />

        <div className="mt-12 flex justify-center">
          <a
            href="/galeri"
            className="inline-flex items-center gap-2 px-5 py-3 bg-ink hover:bg-moss text-paper hover:text-white text-sm rounded-full transition-colors"
          >
            {t.seeAllPhotos(GALLERY_ITEMS.length)}
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Halaman /galeri ── */

function GalleryPage() {
  const { GALLERY_ITEMS, FOOTER_INFO, t } = usePrefs();

  useEffect(() => {
    document.title = t.galleryMetaTitle;
  }, [t]);

  return (
    <div className="min-h-screen flex flex-col">
      <CustomCursor />
      <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur-xl border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
          <a href="/" className="flex items-center gap-2.5 min-w-0">
            <img src="/images/logo-kkn.jpg" alt="Logo KKN Lebak Siliwangi 2" className="w-9 h-9 rounded-full bg-white object-contain shrink-0" />
            <span className="leading-tight min-w-0 hidden min-[420px]:block">
              <span className="block font-heading font-semibold text-[15px] tracking-tight truncate">KKN Lebak Siliwangi 2</span>
              <span className="block text-[11px] text-muted">UNIKOM 2026</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <SiteControls />
            <a href="/#galeri" className="shrink-0 inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-paper-2 hover:bg-line transition-colors">
              <FontAwesomeIcon icon={faArrowRight} className="text-xs rotate-180" />
              <span><span className="hidden sm:inline">{t.backTo}</span>{t.home}</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            no="04"
            label={t.galleryLabel}
            title={t.galleryPageTitle}
            subtitle={t.galleryPageSubtitle(GALLERY_ITEMS.length)}
          />
          <GalleryGrid layout="justified" />
        </div>
      </main>

      <footer className="border-t border-line py-6 text-xs text-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{FOOTER_INFO.copyright}</div>
      </footer>
    </div>
  );
}

/* ── Ringkasan ── */

const TIMELINE_START = new Date('2026-09-01');
const TIMELINE_END = new Date('2026-10-31');
const toPct = (d) => ((new Date(d) - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)) * 100;
const fmtDay = (d, locale) => new Date(d).toLocaleDateString(locale, { day: 'numeric', month: 'short' });

function SummarySection() {
  const { PROGRAMS, TEAM_MEMBERS, DIVISION_OUTCOMES, t } = usePrefs();
  const done = PROGRAMS.filter((p) => p.status === 'selesai').length;
  const majors = new Set(TEAM_MEMBERS.map((m) => m.jurusan)).size;
  const stats = [
    [PROGRAMS.length, t.statPrograms, t.statProgramsNote(done)],
    ['2', t.statRw, 'RW 05 & RW 07'],
    [TEAM_MEMBERS.length, t.statStudents, t.statStudentsNote(majors)],
    ['2', t.statMonths, t.statMonthsNote],
  ];

  return (
    <section id="ringkasan" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          no="05"
          label={t.summaryLabel}
          title={t.summaryTitle}
          subtitle={t.summarySubtitle}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {stats.map(([value, label, note]) => (
            <div key={label} className="bg-paper p-5 sm:p-7">
              <p className="font-heading text-3xl sm:text-5xl text-moss leading-none">{value}</p>
              <p className="mt-3 font-medium">{label}</p>
              <p className="text-sm text-muted mt-0.5">{note}</p>
            </div>
          ))}
        </div>

        {/* Timeline proker */}
        <div className="mt-16">
          <div className="flex items-baseline justify-between border-b border-line pb-3 mb-6">
            <h3 className="text-xl sm:text-2xl">{t.timeline}</h3>
            <span className="text-xs sm:text-sm text-muted">{t.timelineRange}</span>
          </div>

          <div className="relative">
            <div className="hidden sm:flex absolute inset-0 left-[38%] pointer-events-none">
              <span className="absolute left-1/2 top-0 bottom-0 w-px bg-line" />
            </div>
            <div className="hidden sm:grid grid-cols-[38%_1fr] text-xs text-muted mb-3">
              <span />
              <div className="flex justify-between">
                <span>{t.september}</span>
                <span className="w-1/2">{t.october}</span>
              </div>
            </div>

            {/* Sumbu bulan versi mobile */}
            <div className="sm:hidden relative h-5 mb-2 text-[11px] text-muted">
              <span className="absolute left-0">{t.sepShort}</span>
              <span className="absolute left-1/2 pl-1.5 border-l border-line">{t.octShort}</span>
            </div>

            <ul className="space-y-5 sm:space-y-3">
              {PROGRAMS.map((p) => {
                const left = toPct(p.start);
                const width = Math.max(toPct(p.end) - left, 2);
                return (
                  <li key={p.id} className="sm:grid grid-cols-[38%_1fr] items-center gap-0">
                    <div className="flex items-start justify-between gap-3 mb-2 sm:mb-0 sm:block">
                      <p className="text-sm sm:pr-6 leading-snug sm:leading-5">
                        <span className="text-clay mr-2">{p.id}</span>
                        {p.title}
                      </p>
                      <span className="sm:hidden shrink-0 text-[11px] text-muted tabular-nums pt-0.5">
                        {fmtDay(p.start, t.dateLocale)} – {fmtDay(p.end, t.dateLocale)}
                      </span>
                    </div>
                    <div className="relative h-2.5 sm:h-7 rounded-full bg-paper-2">
                      <span className="sm:hidden absolute left-1/2 -top-1 -bottom-1 w-px bg-line" />
                      <span
                        className={`absolute inset-y-0 sm:top-1 sm:bottom-1 min-w-2.5 sm:min-w-0 rounded-full ${p.status === 'selesai' ? 'bg-moss' : 'bg-clay'}`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex gap-5 mt-5 text-xs text-muted">
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-full bg-moss" />{t.statusDone}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-full bg-clay" />{t.statusOngoing}</span>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-xl sm:text-2xl border-b border-line pb-3">{t.divisionWork}</h3>
          <div className="divide-y divide-line">
            {DIVISION_OUTCOMES.map((d) => (
              <div key={d.title} className="grid md:grid-cols-12 gap-2 md:gap-6 py-5 text-sm">
                <p className="md:col-span-3 font-medium text-ink">{d.title}</p>
                <p className="md:col-span-6 text-ink/80 leading-relaxed">{d.desc}</p>
                <p className="md:col-span-3 text-muted md:text-right">{d.lead}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Instansi mitra kerja sama ── */

function PartnersSection() {
  const { PARTNER_LOGOS, t } = usePrefs();

  // Logo miring 3D mengikuti posisi mouse
  const tilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty('--rx', `${(-y * 22).toFixed(2)}deg`);
    e.currentTarget.style.setProperty('--ry', `${(x * 26).toFixed(2)}deg`);
  };
  const untilt = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <section aria-labelledby="mitra-title" className="py-16 md:py-20 border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div className="lg:col-span-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-clay mb-3">{t.partnersLabel}</p>
          <h2 id="mitra-title" className="font-heading text-[1.375rem] sm:text-2xl md:text-3xl leading-tight">{t.partnersTitle}</h2>
          <p className="mt-3 text-sm text-muted leading-relaxed max-w-sm">{t.partnersDesc}</p>
        </div>

        {/* Saat satu logo disorot, logo lain meredup */}
        <ol className="group/logos lg:col-span-8 relative flex flex-wrap justify-center sm:flex-nowrap gap-y-10">
          {PARTNER_LOGOS.map((logo, i) => (
            <li
              key={logo.name}
              data-cursor={logo.level}
              data-cursor-type="logo"
              data-cursor-sub={logo.name}
              data-cursor-color={logo.color}
              onMouseMove={tilt}
              onMouseLeave={untilt}
              style={{ '--logo': logo.color }}
              className={`group relative w-1/2 sm:w-auto px-2 flex flex-col items-center text-center transition-[opacity,filter] duration-500 [@media(pointer:fine)]:group-hover/logos:opacity-35 [@media(pointer:fine)]:group-hover/logos:grayscale hover:opacity-100! hover:grayscale-0! ${
                logo.wide ? 'sm:flex-[1.5]' : 'sm:flex-1'
              }`}
            >
              {/* Garis jenjang dari tingkat lokal ke nasional */}
              <span
                aria-hidden="true"
                className={`hidden sm:block absolute top-[7.3rem] h-px bg-clay/30 ${i === 0 ? 'left-1/2' : 'left-0'} ${i === PARTNER_LOGOS.length - 1 ? 'right-1/2' : 'right-0'}`}
              />
              <div data-logo-box className={`h-24 w-full flex items-center justify-center [perspective:600px] ${logo.darkText ? 'dark:brightness-[1.6] dark:contrast-[0.9]' : ''}`}>
                <img
                  src={logo.src}
                  alt={`Logo ${logo.name}`}
                  loading="lazy"
                  style={{ transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--s, 1))' }}
                  className={`object-contain max-w-full [--s:1] group-hover:[--s:1.14] transition-[transform,filter] duration-300 ease-out group-hover:[filter:drop-shadow(0_14px_22px_color-mix(in_srgb,var(--logo)_45%,transparent))] ${
                    logo.wide ? 'h-14 md:h-16' : 'h-20 md:h-24'
                  }`}
                />
              </div>
              <span
                className="relative z-10 mt-4 w-2.5 h-2.5 rounded-full border-2 border-paper bg-clay hidden sm:block transition-transform duration-500 group-hover:scale-150 group-hover:bg-[var(--logo)] group-hover:opacity-100!"
                style={{ opacity: 0.45 + i * 0.14 }}
              />
              <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-clay whitespace-nowrap transition-colors duration-300 group-hover:text-[var(--logo)]">{logo.level}</span>
              <span className="mt-1 text-xs text-muted leading-snug max-w-[10rem] transition-colors duration-300 group-hover:text-ink">{logo.name}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Footer ── */

function Footer() {
  const { NAV_LINKS, PROGRAMS, FOOTER_INFO, t } = usePrefs();
  const socials = [
    ['Instagram', FOOTER_INFO.instagram, faInstagram],
    ['YouTube', FOOTER_INFO.youtube, faYoutube],
    ['Website UNIKOM', FOOTER_INFO.unikomUrl, faGlobe],
  ];
  const contacts = [
    [faLocationDot, FOOTER_INFO.address],
  ];
  const heading = 'text-xs font-medium uppercase tracking-[0.14em] text-white/45 mb-5';

  return (
    <footer id="kontak" className="bg-moss-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kolom informasi */}
        <div className="py-14 md:py-16 grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo-kkn.jpg" alt="Logo KKN Lebak Siliwangi 2" className="w-12 h-12 rounded-full bg-white object-contain" />
              <div className="leading-tight">
                <p className="font-heading text-lg">KKN Lebak Siliwangi 2</p>
                <p className="text-xs text-white/55 mt-0.5">Universitas Komputer Indonesia</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-white/60 leading-relaxed max-w-sm">
              {t.footerDesc}
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(([label, url, icon]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-night hover:bg-white hover:border-white transition-colors"
                >
                  <FontAwesomeIcon icon={icon} className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <p className={heading}>{t.footerNav}</p>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.slice(0, -1).map(({ label, href }) => (
                <li key={href}>
                  <a href={href} onClick={(e) => scrollTo(e, href)} className="text-white/75 hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className={heading}>{t.footerPrograms}</p>
            <ul className="space-y-2.5 text-sm">
              {PROGRAMS.map((p) => (
                <li key={p.id}>
                  <a href="#proker" onClick={(e) => scrollTo(e, '#proker')} className="text-white/75 hover:text-white transition-colors">
                    {p.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <p className={heading}>{t.footerAddress}</p>
            <ul className="space-y-3.5 text-sm">
              {contacts.map(([icon, text, href]) => (
                <li key={text} className="flex gap-3">
                  <FontAwesomeIcon icon={icon} className="text-white/40 text-xs mt-1 w-3.5 shrink-0" />
                  {href ? (
                    <a href={href} className="text-white/75 hover:text-white transition-colors break-all">{text}</a>
                  ) : (
                    <span className="text-white/75 leading-relaxed">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Baris bawah */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/45">
          <div className="flex items-center gap-2.5">
            <img src="/images/logo/unikom.png" alt="Logo UNIKOM" className="w-6 h-6 object-contain" />
            <p>{FOOTER_INFO.copyright}</p>
          </div>
          <a
            href="#beranda"
            onClick={(e) => scrollTo(e, '#beranda')}
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            {t.backToTop}
            <FontAwesomeIcon icon={faArrowUp} className="text-[10px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}

const isGalleryRoute = () => window.location.pathname.replace(/\/+$/, '') === '/galeri';

export default function App() {
  const { t } = usePrefs();

  // Datang dari /galeri lewat link "/#galeri": gulir ke section setelah halaman tampil
  useEffect(() => {
    if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView();
  }, []);

  useEffect(() => {
    if (!isGalleryRoute()) document.title = t.metaTitle;
  }, [t]);

  if (isGalleryRoute()) return <GalleryPage />;

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <ActivityMarquee />
        <AboutSection />
        <ProgramSection />
        <LocationSection />
        <GallerySection />
        <SummarySection />
      </main>
      <PartnersSection />
      <Footer />
    </div>
  );
}
