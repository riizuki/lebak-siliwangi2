import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faXmark, faArrowRight, faArrowUp, faArrowUpRightFromSquare,
  faLocationDot, faGlobe
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

import {
  NAV_LINKS,
  HERO_CONTENT,
  TEAM_MEMBERS,
  PROGRAMS,
  GALLERY_FILTERS,
  GALLERY_ITEMS,
  LOCATIONS,
  DIVISION_OUTCOMES,
  FOOTER_INFO,
} from './data/kknData';
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
        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] text-ink">{title}</h2>
        {subtitle && <p className="mt-3 max-w-xl text-muted leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ── Navbar ── */

function Navbar() {
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
  }, []);

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
          ? 'bg-white/85 backdrop-blur-xl border-b border-line shadow-[0_1px_12px_rgba(16,24,20,0.04)] text-ink'
          : 'bg-transparent border-b border-transparent text-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <a href="#beranda" onClick={(e) => handleClick(e, '#beranda')} className="flex items-center gap-2.5 shrink-0">
          <img src="/images/logo-kkn.jpg" alt="Logo KKN Lebak Siliwangi 2" className="w-9 h-9 rounded-full bg-white object-contain" />
          <span className="leading-tight">
            <span className="block font-heading font-semibold text-[15px] tracking-tight">KKN Lebak Siliwangi 2</span>
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
                    ? solid ? 'bg-white text-ink shadow-sm' : 'bg-white/20 text-white'
                    : solid ? 'text-muted hover:text-ink' : 'text-white/80 hover:text-white'
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <a
          href="#kontak"
          onClick={(e) => handleClick(e, '#kontak')}
          className={`hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            solid ? 'bg-ink text-white hover:bg-moss' : 'bg-white text-ink hover:bg-white/90'
          }`}
        >
          Kontak
          <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden w-10 h-10 -mr-1 flex items-center justify-center rounded-full ${solid ? 'bg-paper-2' : 'bg-white/15'}`}
          aria-label="Menu"
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
        </button>
      </div>

      {isOpen && (
        <nav className="lg:hidden bg-white border-t border-line px-4 sm:px-6 py-3 space-y-1">
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
  const facts = [
    ['Lokasi', 'Lebak Siliwangi · RW 05 & RW 07'],
    ['Fokus', 'Sampah & lingkungan'],
    ['Tim', `${TEAM_MEMBERS.length} mahasiswa`],
  ];

  return (
    <section id="beranda" className="relative min-h-[100svh] flex flex-col justify-end bg-ink text-white overflow-hidden">
      <img
        src={HERO_CONTENT.poskoImage}
        alt="Kegiatan budidaya maggot bersama warga Kelurahan Lebak Siliwangi"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

      <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10 sm:pb-14">
        <p className="text-sm text-white/75 mb-4">{HERO_CONTENT.badge}</p>
        <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] leading-[1.05] max-w-4xl">
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

/* ── Struktur Tim ── */

function Person({ m, role }) {
  return (
    <figure data-cursor={m.name.split(' ')[0]} className="group">
      <div className="aspect-[4/5] overflow-hidden rounded-xl bg-paper-2">
        {m.avatar ? (
          <img
            src={m.avatar}
            alt={m.name}
            className="w-full h-full object-cover object-[center_35%] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-heading text-4xl text-muted/60">
            {m.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
          </div>
        )}
      </div>
      <figcaption className="mt-3">
        {role && <p className="text-xs text-clay mb-0.5">{role}</p>}
        <p className="font-heading text-base leading-snug">{m.name}</p>
        <p className="text-sm text-muted">{m.jurusan}</p>
      </figcaption>
    </figure>
  );
}

function AboutSection() {
  const [ketua, sekretaris, bendahara] = TEAM_MEMBERS;
  const divisions = [
    { name: 'Divisi Acara', note: 'Acara & lapangan', members: TEAM_MEMBERS.slice(3, 6) },
    { name: 'Divisi Medinfo & Humas', note: 'Media & informasi', members: TEAM_MEMBERS.slice(6, 11) },
  ];

  return (
    <section id="tentang" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          no="01"
          label="Struktur Tim"
          title="Lebak Siliwangi 2"
          subtitle="Sebelas mahasiswa UNIKOM dari berbagai jurusan yang tinggal dan bekerja bersama warga Coblong selama masa KKN."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6">
          <Person m={ketua} role="Ketua" />
          <Person m={sekretaris} role="Sekretaris" />
          <Person m={bendahara} role="Bendahara" />
        </div>

        {divisions.map((d) => (
          <div key={d.name} className="mt-20">
            <div className="flex items-baseline justify-between border-b border-line pb-3 mb-6">
              <h3 className="text-2xl">{d.name}</h3>
              <span className="text-sm text-muted">{d.note} · {d.members.length} orang</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
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
  selesai: { label: 'Selesai', cls: 'bg-moss text-white' },
  berjalan: { label: 'Berjalan', cls: 'bg-clay/15 text-moss' },
  rencana: { label: 'Rencana', cls: 'bg-paper-2 text-muted border border-line' },
};

function ProgramSection() {
  return (
    <section id="proker" className="py-20 md:py-28 bg-paper-2/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          no="02"
          label="Program Kerja"
          title="Empat program kerja"
          subtitle="Dari menghidupkan bank sampah sampai membuat alat sendiri untuk mengolah sampah warga RW 05 dan RW 07."
        />

        <ol className="divide-y divide-line border-y border-line">
          {PROGRAMS.map((prog) => {
            const st = STATUS[prog.status];
            return (
              <li key={prog.id} className="grid md:grid-cols-12 gap-3 md:gap-6 py-8 md:py-10">
                <span className="md:col-span-1 font-heading text-3xl text-clay leading-none">{prog.id}</span>
                <div className="md:col-span-7">
                  <p className="text-xs uppercase tracking-wide text-muted mb-2">{prog.category}</p>
                  <h3 className="text-2xl leading-snug mb-3">{prog.title}</h3>
                  <p className="text-muted leading-relaxed max-w-xl">{prog.desc}</p>
                </div>
                <dl className="md:col-span-4 md:pl-6 md:border-l border-line text-sm space-y-3 md:pt-6">
                  <div>
                    <dt className="text-muted text-xs mb-0.5">Waktu</dt>
                    <dd>{prog.date}</dd>
                  </div>
                  <div>
                    <dt className="text-muted text-xs mb-1">Status</dt>
                    <dd>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${st.cls}`}>{st.label}</span>
                    </dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ── Lokasi ── */

const mapsEmbed = (q) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed`;
const mapsLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

function LocationSection() {
  const [selectedId, setSelectedId] = useState(LOCATIONS[0].id);
  const loc = LOCATIONS.find((l) => l.id === selectedId) || LOCATIONS[0];
  const details = [
    ['Alamat', loc.address],
    ['Buka', loc.hours],
    ['Kontak', loc.contact],
  ].filter(([, v]) => v);

  return (
    <section id="lokasi" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          no="03"
          label="Lokasi"
          title="Titik-titik kegiatan kami"
          subtitle="Posko tim sekaligus bank sampah, dan kantor kelurahan yang jadi mitra kami."
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
              title={`Peta ${loc.name}`}
              src={mapsEmbed(loc.query)}
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm text-clay mb-2">{loc.category}</p>
            <h3 className="text-2xl sm:text-3xl leading-snug">{loc.name}</h3>
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
              data-cursor="Buka ↗"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-moss hover:bg-moss-dark text-white text-sm rounded-full transition-colors"
            >
              Buka rute di Google Maps
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Galeri ── */

function GallerySection() {
  const [filter, setFilter] = useState('semua');
  const filtered = filter === 'semua' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === filter);
  const countOf = (key) => (key === 'semua' ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.category === key).length);

  return (
    <section id="galeri" className="py-20 md:py-28 bg-paper-2/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          no="04"
          label="Galeri"
          title="Catatan dari lapangan"
          subtitle="Dokumentasi kegiatan tim selama di Coblong."
        />

        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8 text-sm">
          {GALLERY_FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={filter === key ? 'text-ink underline underline-offset-4' : 'text-muted hover:text-ink'}
            >
              {label} <span className="text-muted">({countOf(key)})</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
          {filtered.map((item, idx) => {
            const featured = idx === 0 && filtered.length > 2;
            return (
              <figure key={item.title} data-cursor="Lihat" className={featured ? 'col-span-2 row-span-2' : ''}>
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
      </div>
    </section>
  );
}

/* ── Ringkasan ── */

const TIMELINE_START = new Date('2026-09-01');
const TIMELINE_END = new Date('2026-10-31');
const toPct = (d) => ((new Date(d) - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)) * 100;

function SummarySection() {
  const done = PROGRAMS.filter((p) => p.status === 'selesai').length;
  const majors = new Set(TEAM_MEMBERS.map((m) => m.jurusan)).size;
  const stats = [
    [PROGRAMS.length, 'Program kerja', `${done} sudah selesai`],
    ['2', 'RW dampingan', 'RW 05 & RW 07'],
    [TEAM_MEMBERS.length, 'Mahasiswa', `dari ${majors} program studi`],
    ['2', 'Bulan di lapangan', 'September – Oktober 2026'],
  ];

  return (
    <section id="ringkasan" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          no="05"
          label="Ringkasan"
          title="KKN kami dalam angka"
          subtitle="Gambaran singkat apa saja yang sudah dikerjakan Lebak Siliwangi 2 selama di lapangan."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {stats.map(([value, label, note]) => (
            <div key={label} className="bg-white p-5 sm:p-7">
              <p className="font-heading text-4xl sm:text-5xl text-moss leading-none">{value}</p>
              <p className="mt-3 font-medium">{label}</p>
              <p className="text-sm text-muted mt-0.5">{note}</p>
            </div>
          ))}
        </div>

        {/* Timeline proker */}
        <div className="mt-16">
          <div className="flex items-baseline justify-between border-b border-line pb-3 mb-6">
            <h3 className="text-2xl">Linimasa program</h3>
            <span className="text-sm text-muted">Sep – Okt 2026</span>
          </div>

          <div className="relative">
            <div className="hidden sm:flex absolute inset-0 left-[38%] pointer-events-none">
              <span className="absolute left-1/2 top-0 bottom-0 w-px bg-line" />
            </div>
            <div className="hidden sm:grid grid-cols-[38%_1fr] text-xs text-muted mb-3">
              <span />
              <div className="flex justify-between">
                <span>September</span>
                <span className="w-1/2">Oktober</span>
              </div>
            </div>

            <ul className="space-y-4 sm:space-y-3">
              {PROGRAMS.map((p) => {
                const left = toPct(p.start);
                const width = Math.max(toPct(p.end) - left, 2);
                return (
                  <li key={p.id} className="sm:grid grid-cols-[38%_1fr] items-center gap-0">
                    <p className="text-sm pr-6 mb-1.5 sm:mb-0">
                      <span className="text-clay mr-2">{p.id}</span>
                      {p.title}
                    </p>
                    <div className="relative h-7 rounded-full bg-paper-2">
                      <span
                        className={`absolute top-1 bottom-1 rounded-full ${p.status === 'selesai' ? 'bg-moss' : 'bg-clay'}`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex gap-5 mt-5 text-xs text-muted">
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-full bg-moss" />Selesai</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-full bg-clay" />Berjalan</span>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl border-b border-line pb-3">Pembagian kerja per divisi</h3>
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

/* ── Footer ── */

function Footer() {
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
        {/* Ajakan */}
        <div className="py-14 md:py-16 border-b border-white/10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl leading-tight">Mampir ke posko kami.</h2>
            <p className="mt-3 max-w-lg text-white/65 leading-relaxed">
              Mau setor sampah pilahan, ikut kerja bakti, atau ngobrol soal program? Datang langsung ke posko kami di Lebak Siliwangi.
            </p>
          </div>
        </div>

        {/* Kolom informasi */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo-kkn.jpg" alt="Logo KKN Lebak Siliwangi 2" className="w-12 h-12 rounded-full bg-white object-contain" />
              <div className="leading-tight">
                <p className="font-heading text-lg">KKN Lebak Siliwangi 2</p>
                <p className="text-xs text-white/55 mt-0.5">Universitas Komputer Indonesia</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-white/60 leading-relaxed max-w-sm">
              KKN Berdampak UNIKOM 2026 di RW 05 dan RW 07, Kelurahan Lebak Siliwangi, dengan fokus pengelolaan sampah dan lingkungan.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(([label, url, icon]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-ink hover:bg-white hover:border-white transition-colors"
                >
                  <FontAwesomeIcon icon={icon} className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <p className={heading}>Navigasi</p>
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
            <p className={heading}>Program</p>
            <ul className="space-y-2.5 text-sm">
              {PROGRAMS.map((p) => (
                <li key={p.id}>
                  <a href="#proker" onClick={(e) => scrollTo(e, '#proker')} className="text-white/75 hover:text-white transition-colors">
                    {p.title.replace(/^Pembuatan /, '').split(' bersama')[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <p className={heading}>Alamat</p>
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
            <img src="/logo-unikom.png" alt="Logo UNIKOM" className="w-5 h-5 object-contain opacity-80" />
            <p>{FOOTER_INFO.copyright}</p>
          </div>
          <a
            href="#beranda"
            onClick={(e) => scrollTo(e, '#beranda')}
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            Kembali ke atas
            <FontAwesomeIcon icon={faArrowUp} className="text-[10px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramSection />
        <LocationSection />
        <GallerySection />
        <SummarySection />
      </main>
      <Footer />
    </div>
  );
}
