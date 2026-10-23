/* ═══════════════════════════════════════════════════════════════════
   DATA VERSI BAHASA INGGRIS
   Dibangun dari kknData.js: hanya teks yang diterjemahkan, sedangkan
   foto, tanggal, dan urutan tetap mengikuti data bahasa Indonesia.
   ═══════════════════════════════════════════════════════════════════ */

import * as ID from './kknData';

export const NAV_LINKS = ID.NAV_LINKS.map((l, i) => ({
  ...l,
  label: ['Home', 'Team', 'Programs', 'Location', 'Gallery', 'Summary', 'Contact'][i],
}));

export const HERO_CONTENT = {
  ...ID.HERO_CONTENT,
  badge: 'KKN Berdampak UNIKOM 2026 — Lebak Siliwangi 2 Group',
  title: 'Managing waste together with the residents of',
  titleHighlight: 'Lebak Siliwangi Village',
  description:
    'During our community service (KKN), we revived the waste bank, sorted waste with the Gaslah Team, and built a bottle press and a leaf shredder for residents of RW 05 and RW 07, Coblong District, Bandung.',
  ctaPrimary: 'View Work Programs',
  ctaSecondary: 'Activity Documentation',
};

const ROLES = {
  'Ketua Kelompok': 'Group Leader',
  Sekretaris: 'Secretary',
  Bendahara: 'Treasurer',
  'Divisi Acara': 'Events Division',
  'Divisi Medinfo': 'Media & Info Division',
  'Pimpinan Kelompok': 'Group Leadership',
  Sekretariat: 'Secretariat',
  Keuangan: 'Finance',
};

const MAJORS = {
  'S1 Teknik Informatika': 'Informatics Engineering',
  'S1 Teknik Arsitektur': 'Architecture',
  'S1 Desain Interior': 'Interior Design',
  'S1 Akuntansi': 'Accounting',
  'S1 Sistem Komputer': 'Computer Systems',
  'S1 Teknik Sipil': 'Civil Engineering',
  'D3 Manajemen Informatika': 'Informatics Management (Diploma)',
  'S1 Ilmu Pemerintahan': 'Government Studies',
};

export const TEAM_MEMBERS = ID.TEAM_MEMBERS.map((m) => ({
  ...m,
  role: ROLES[m.role] || m.role,
  division: ROLES[m.division] || m.division,
  badge: ROLES[m.badge] || m.badge,
  jurusan: MAJORS[m.jurusan] || m.jurusan,
}));

const PROGRAM_TEXT = {
  '01': {
    category: 'Inorganic',
    title: 'Reviving the Waste Bank',
    shortTitle: 'Reviving the Waste Bank',
    desc: 'Revived the waste bank through education and direct outreach to residents of RW 05 and RW 07.',
    date: 'Weeks 4–7 (3 Sep – 3 Oct 2026)',
  },
  '02': {
    category: 'Sorting',
    title: 'Sorting Organic & Inorganic Waste with the Gaslah Team',
    shortTitle: 'Organic & Inorganic Sorting',
    desc: 'Helped the Gaslah Team sort organic and inorganic waste. Sellable inorganic waste is sold, and the proceeds go back to the residents.',
    date: '9 Sep – 31 Oct 2026',
  },
  '03': {
    category: 'Utilization',
    title: 'Building a Bottle & Can Press',
    shortTitle: 'Bottle & Can Press',
    desc: 'Built a press for drink bottles and cans so they are easier to sell and take up less space and fewer trash bags.',
    date: '9 – 11 Sep 2026',
  },
  '04': {
    category: 'Utilization',
    title: 'Building a Leaf Shredder',
    shortTitle: 'Leaf Shredder',
    desc: 'Built a shredder for fallen leaves so they can be turned into compost.',
    date: '6 – 10 Oct 2026',
  },
};

export const PROGRAMS = ID.PROGRAMS.map((p) => ({ ...p, ...PROGRAM_TEXT[p.id] }));

const FILTER_LABELS = {
  semua: 'All',
  maggot: 'Maggot & Organic',
  alat: 'Tool Making',
  warga: 'With Residents',
  pemilahan: 'Waste Sorting',
  'kerja-bakti': 'Clean-ups',
  pengepul: 'Waste Collector',
  sosialisasi: 'Outreach',
};

export const GALLERY_FILTERS = ID.GALLERY_FILTERS.map((f) => ({ ...f, label: FILTER_LABELS[f.key] || f.label }));

// Judul foto berdasarkan nama file
const GALLERY_TITLES = {
  'memilah-maggot': 'Sorting farmed maggots',
  'menguji-bor': 'Drilling parts for the machine frame',
  'kunjungan-bank-sampah': 'Talking with the waste bank managers',
  'maggot-panen': 'Maggots ready to be separated from the growing medium',
  'merakit-rangka': 'Assembling the wooden machine frame',
  'ngobrol-warga': 'Reaching out directly to residents',
  'mencacah-sayur': 'Chopping vegetable scraps for maggot feed',
  'memotong-kayu': 'Cutting wood for the machine frame',
  'bank-sampah-gaslah': 'The waste bank with the Gaslah Team',
  'mencacah-organik': 'Processing organic waste together',
  'foto-tim': 'The team at the waste bank',
  'maggot-closeup': 'Maggot harvest',
  'kantor-kelurahan': 'Lebak Siliwangi Village Office, our program partner',
  'hanggar-maggot': 'Processing organic waste at the village Maggot Hangar',
  'rw07-foto-bersama': 'Group photo with RW 07 children after the clean-up',
  'rw05-gotong-royong': 'Working together to tidy up the RW 05 garden',
  'pengepul-tumpukan-plastik': 'Checking piles of plastic bottles at the collector',
  'sosialisasi-aplikasi': 'Residents showing the app they installed',
  'rw07-menyapu': 'Sweeping dry leaves at the RW 07 field',
  'rw05-menanam': 'Replanting ornamental plants during the RW 05 clean-up',
  'pengepul-tim': 'The team recording inorganic waste at the collector',
  'sosialisasi-diskusi': 'Chatting with residents about the app',
  'rw07-memilah-sampah': 'Sorting waste into separate bins',
  'rw05-dari-atas': 'The RW 05 clean-up seen from above',
  'pengepul-memilah-plastik': 'A collector worker sorting plastic bottles',
  'sosialisasi-kartu': 'Handing out app information cards to residents',
  'sosialisasi-pendampingan': 'Helping residents try out the app',
  'rw05-merawat-tanaman': 'Moving plants into new pots',
  'pengepul-kardus': 'Sorting used cardboard at the collector’s warehouse',
  'rw07-memungut-sampah': 'Picking up litter along the RW 07 field',
  'rw07-membersihkan-taman': 'Clearing dry leaves in the garden with RW 07 children',
  'rw07-tempat-sampah-pilah': 'Putting waste into the right bins',
  'rw05-media-tanam': 'Preparing planting soil with RW 05 residents',
  'pengepul-angkut': 'Sorted waste ready to be hauled from the collector',
  'sosialisasi-warga': 'Residents attending the outreach event',
  'sosialisasi-persiapan': 'Preparing refreshments for the outreach event',
  'rw07-membersihkan-semak': 'Clearing bushes and litter along the RW 07 field fence',
  'rw05-merapikan-tanaman': 'Trimming dry plants in a residents’ garden',
  'rw07-anak-membantu': 'Children helping collect dry leaves',
  'rw07-menyapu-bersama-anak': 'Sweeping dry leaves with RW 07 children',
  'pembekalan-kelurahan': 'Briefing from the Lebak Siliwangi Village Office',
  'pemilahan-bersama-gaslah': 'Sorting waste with a Gaslah Team officer',
  'rangka-pencacah': 'Checking the wooden frame of the leaf shredder',
  'maggot-tumpukan': 'Farmed maggots at the Maggot Hangar',
  'wawancara-warga': 'Interviewing a resident about waste habits',
  'sosialisasi-tertawa': 'A warm chat with a resident during the outreach',
  'memotong-besi-press': 'Cutting steel plates for the bottle press',
  'penjelasan-hanggar-maggot': 'Learning about organic waste processing at the Maggot Hangar',
  'pemilahan-ember-organik': 'Organic and inorganic waste, sorted',
  'survei-warung-warga': 'Greeting a stall owner during the neighborhood survey',
  'mesin-press-jadi': 'The assembled bottle & can press',
  'mencacah-bersama-ibu': 'Chopping organic waste with local mothers',
  'bank-sampah-induk': 'Visiting the Bandung City Central Waste Bank',
  'dinamo-pencacah': 'Mounting the motor on the shredder frame',
  'sosialisasi-menjelaskan': 'Explaining how to use the app to a resident',
  'pemilahan-hasil-terkumpul': 'Sorted waste ready for the waste bank',
  'diskusi-pengurus-rw05': 'Discussion with RW 05 community leaders',
  'mencacah-closeup': 'Chopping leftover vegetables into small pieces',
  'mengebor-plat-press': 'Drilling the press machine’s steel plate',
  'pemilahan-bank-sampah-rw05': 'Morning sorting at the RW 05 waste bank',
  'cermin-gang': 'Walking the alleys of Lebak Siliwangi',
  'rw05-tersenyum-menanam': 'Planting together in the RW 05 garden',
  'maggot-media': 'Maggots and their growing medium in the rearing tubs',
  'pemilahan-sarung-tangan': 'Sorting plastic waste with gloves on',
  'pertemuan-dpl': 'Activity review with our field supervisor',
  'merakit-wadah-pencacah': 'Assembling the leaf shredder’s container',
  'berbincang-warga-sampah': 'Talking with residents about waste management',
  'pemilahan-pagi-rw05': 'Sorting waste with the Gaslah Team in front of the waste bank',
  'istirahat-hanggar': 'A short break while processing organic waste',
};

const translateLocation = (loc) =>
  loc.replace('Lokasi pengepul', 'Collector site').replace('Kantor Kelurahan', 'Village Office').replace('Kota Bandung', 'Bandung City').replace('Okt', 'Oct').replace('Agu', 'Aug');

export const GALLERY_ITEMS = ID.GALLERY_ITEMS.map((item) => {
  const name = item.src.split('/').pop().replace(/\.jpg$/, '');
  return { ...item, title: GALLERY_TITLES[name] || item.title, location: translateLocation(item.location) };
});

const DIVISION_TEXT = [
  {
    title: 'Leadership & Secretariat',
    desc: 'Handled permits and administration, drafted activity proposals, and coordinated with the village office and the campus.',
    status: '100% complete',
  },
  {
    title: 'Events & Field Division',
    desc: 'Planned and ran the 4 work programs, coordinated activity logistics, and mobilized clean-ups with residents.',
    status: 'Fully delivered',
  },
  {
    title: 'Media, Info & PR Division',
    desc: 'Produced activity documentation, designed visual education materials, managed publications, and kept the base’s digital reports.',
    status: 'Fully documented',
  },
  {
    title: 'Treasury & Logistics',
    desc: 'Kept transparent records of the operating budget, procured sorted waste bins, and supplied field equipment.',
    status: 'Neatly recorded',
  },
];

export const DIVISION_OUTCOMES = ID.DIVISION_OUTCOMES.map((d, i) => ({ ...d, ...DIVISION_TEXT[i] }));

const LOCATION_TEXT = {
  posko: {
    tabLabel: 'Base & Waste Bank',
    name: 'KKN Base & Lebak Siliwangi Waste Bank',
    category: 'Team base · Waste bank',
    desc: 'Where the team gathers and coordinates, and also the waste bank where residents drop off sorted waste with the Gaslah Team.',
    address: 'Lebak Siliwangi Village, Coblong District, Bandung',
  },
  kelurahan: {
    tabLabel: 'Village Office',
    name: 'Lebak Siliwangi Village Office',
    category: 'Government office',
    desc: 'Our coordination partner for the KKN program, and the maggot farming site we help manage.',
    address: 'Coblong District, Bandung',
  },
};

export const LOCATIONS = ID.LOCATIONS.map((l) => ({ ...l, ...LOCATION_TEXT[l.id] }));

export const FOOTER_INFO = {
  ...ID.FOOTER_INFO,
  address: 'KKN Base, Lebak Siliwangi Village, Coblong District, Bandung 40132',
  copyright: '© 2026 KKN Berdampak UNIKOM - Lebak Siliwangi 2 Group. Universitas Komputer Indonesia.',
};
