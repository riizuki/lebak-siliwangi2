/* ═══════════════════════════════════════════════════════════════════
   DATA KKN BERDAMPAK UNIKOM 2026 - KELOMPOK 2 COBLONG
   Dipisahkan dari App.jsx agar struktur kode modular dan mudah diedit
   ═══════════════════════════════════════════════════════════════════ */

export const NAV_LINKS = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Struktur Tim', href: '#tentang' },
  { label: 'Program Kerja', href: '#proker' },
  { label: 'Lokasi', href: '#lokasi' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Ringkasan', href: '#ringkasan' },
  { label: 'Kontak', href: '#kontak' },
];

export const HERO_CONTENT = {
  badge: 'KKN Berdampak UNIKOM 2026 — Kelompok Lebak Siliwangi 2',
  title: 'Mengelola sampah bersama warga',
  titleHighlight: 'Kelurahan Lebak Siliwangi',
  description:
    'Selama KKN, kami menghidupkan kembali bank sampah, memilah sampah bersama Tim Gaslah, dan membuat mesin press botol serta pencacah daun untuk warga RW 05 dan RW 07, Kecamatan Coblong, Kota Bandung.',
  ctaPrimary: 'Lihat Program Kerja',
  ctaSecondary: 'Dokumentasi Kegiatan',
  poskoImage: '/images/maggot-kelurahan.jpg',
};

export const TEAM_MEMBERS = [
  {
    name: 'Naufal Putra Firmansyah',
    role: 'Ketua Kelompok',
    jurusan: 'S1 Teknik Informatika',
    division: 'Pimpinan Kelompok',
    avatar: '/images/tim/ketua.jpg',
    badge: 'Ketua',
  },
  {
    name: 'Muhamad Irsad Assopi',
    nickname: 'Irsad',
    role: 'Sekretaris',
    jurusan: 'S1 Teknik Informatika',
    division: 'Sekretariat',
    avatar: '/images/tim/sekretaris.jpg',
    badge: 'Sekretaris',
  },
  {
    name: 'Muhammad Rizki',
    nickname: 'Rizki',
    role: 'Bendahara',
    jurusan: 'S1 Teknik Informatika',
    division: 'Keuangan',
    avatar: '/images/tim/bendahara.jpg',
    badge: 'Bendahara',
  },
  {
    name: 'Rizky Al Farid Hafizh',
    role: 'Divisi Acara',
    jurusan: 'S1 Teknik Informatika',
    division: 'Divisi Acara',
    avatar: '/images/tim/acara1.jpg',
    badge: 'Divisi Acara',
  },
  {
    name: 'Fadilah Aulia Rahman',
    role: 'Divisi Acara',
    jurusan: 'S1 Teknik Arsitektur',
    division: 'Divisi Acara',
    avatar: '/images/tim/acara2.jpg',
    badge: 'Divisi Acara',
  },
  {
    name: 'Farhan',
    role: 'Divisi Acara',
    jurusan: 'S1 Desain Interior',
    division: 'Divisi Acara',
    avatar: '/images/tim/acara3.jpg',
    badge: 'Divisi Acara',
  },
  {
    name: 'Novi Fitriani',
    role: 'Divisi Medinfo',
    jurusan: 'S1 Akuntansi',
    division: 'Divisi Medinfo',
    avatar: '/images/tim/pdd1.jpg',
    badge: 'Divisi Medinfo',
  },
  {
    name: 'Pebi Pitra Rahman',
    role: 'Divisi Medinfo',
    jurusan: 'S1 Sistem Komputer',
    division: 'Divisi Medinfo',
    avatar: '/images/tim/pdd2.jpg',
    badge: 'Divisi Medinfo',
  },
  {
    name: 'Arasya Melandri Winardi',
    role: 'Divisi Medinfo',
    jurusan: 'S1 Teknik Sipil',
    division: 'Divisi Medinfo',
    avatar: '/images/tim/pdd3.jpg',
    badge: 'Divisi Medinfo',
  },
  {
    name: 'Rimo Saptazi',
    role: 'Divisi Medinfo',
    jurusan: 'D3 Manajemen Informatika',
    division: 'Divisi Medinfo',
    avatar: '/images/tim/humas1.jpg',
    badge: 'Divisi Medinfo',
  },
  {
    name: 'Lion Star Sabolo Gaho',
    role: 'Divisi Medinfo',
    jurusan: 'S1 Ilmu Pemerintahan',
    division: 'Divisi Medinfo',
    avatar: '/images/tim/humas2.jpg',
    badge: 'Divisi Medinfo',
  },
];

export const PROGRAMS = [
  {
    id: '01',
    category: 'Anorganik',
    title: 'Pembangkitan Bank Sampah',
    shortTitle: 'Pembangkitan Bank Sampah',
    desc: 'Menghidupkan kembali bank sampah lewat edukasi dan pendekatan langsung kepada warga RW 05 dan RW 07.',
    date: 'Minggu 4–7 (3 Sep – 3 Okt 2026)',
    start: '2026-09-03',
    end: '2026-10-03',
    status: 'selesai',
    // Foto kegiatan terkait (nama file di /images/kegiatan)
    photos: ['kunjungan-bank-sampah', 'bank-sampah-gaslah', 'sosialisasi-pendampingan'],
  },
  {
    id: '02',
    category: 'Pemilahan',
    title: 'Pemilahan Sampah Organik & Anorganik bersama Tim Gaslah',
    shortTitle: 'Pemilahan Sampah Organik & Anorganik',
    desc: 'Membantu Tim Gaslah memilah sampah organik dan anorganik. Sampah anorganik yang laku dijual, dan hasil penjualannya dikembalikan untuk warga.',
    date: '9 Sep – 31 Okt 2026',
    start: '2026-09-09',
    end: '2026-10-31',
    status: 'berjalan',
    // Foto kegiatan terkait (nama file di /images/kegiatan)
    photos: ['hanggar-maggot', 'mencacah-organik', 'pengepul-memilah-plastik'],
  },
  {
    id: '03',
    category: 'Pemanfaatan',
    title: 'Pembuatan Mesin Press Botol & Kaleng',
    shortTitle: 'Mesin Press Botol & Kaleng',
    desc: 'Membuat alat press botol dan kaleng minuman supaya lebih mudah dijual dan tidak memakan banyak tempat maupun trash bag.',
    date: '9 – 11 Sep 2026',
    start: '2026-09-09',
    end: '2026-09-11',
    status: 'selesai',
    // Foto kegiatan terkait (nama file di /images/kegiatan)
    photos: ['memotong-kayu', 'menguji-bor'],
  },
  {
    id: '04',
    category: 'Pemanfaatan',
    title: 'Pembuatan Mesin Pencacah Daun',
    shortTitle: 'Mesin Pencacah Daun',
    desc: 'Membuat mesin pencacah untuk daun-daun yang berjatuhan agar bisa diolah menjadi kompos tanah.',
    date: '6 – 10 Okt 2026',
    start: '2026-10-06',
    end: '2026-10-10',
    status: 'selesai',
    // Foto kegiatan terkait (nama file di /images/kegiatan)
    photos: ['merakit-rangka', 'rw07-menyapu', 'rw07-anak-membantu'],
  },
];

export const GALLERY_FILTERS = [
  { key: 'semua', label: 'Semua' },
  { key: 'maggot', label: 'Maggot & Organik' },
  { key: 'alat', label: 'Pembuatan Alat' },
  { key: 'warga', label: 'Bersama Warga' },
  { key: 'kerja-bakti', label: 'Kerja Bakti' },
  { key: 'pengepul', label: 'Pengepul' },
  { key: 'sosialisasi', label: 'Sosialisasi' },
];

const img = (name) => `/images/kegiatan/${name}.jpg`;

export const GALLERY_ITEMS = [
  { src: img('memilah-maggot'), category: 'maggot', title: 'Memilah maggot hasil budidaya', location: 'Lebak Siliwangi · Okt 2026' },
  { src: img('menguji-bor'), category: 'alat', title: 'Pengeboran komponen rangka mesin', location: 'Lebak Siliwangi' },
  { src: img('kunjungan-bank-sampah'), category: 'warga', title: 'Berbincang dengan pengurus bank sampah', location: 'Lebak Siliwangi · Agu 2026' },
  { src: img('maggot-panen'), category: 'maggot', title: 'Maggot siap dipisahkan dari media', location: 'Lebak Siliwangi · Okt 2026' },
  { src: img('merakit-rangka'), category: 'alat', title: 'Merakit rangka kayu mesin', location: 'Lebak Siliwangi' },
  { src: img('ngobrol-warga'), category: 'warga', title: 'Pendekatan langsung ke warga', location: 'Lebak Siliwangi' },
  { src: img('mencacah-sayur'), category: 'maggot', title: 'Mencacah sisa sayur untuk pakan maggot', location: 'Lebak Siliwangi · Okt 2026' },
  { src: img('memotong-kayu'), category: 'alat', title: 'Memotong kayu untuk rangka mesin', location: 'Lebak Siliwangi' },
  { src: img('bank-sampah-gaslah'), category: 'warga', title: 'Bank sampah bersama Tim Gaslah', location: 'Lebak Siliwangi · Agu 2026' },
  { src: img('mencacah-organik'), category: 'maggot', title: 'Mengolah sampah organik bersama', location: 'Lebak Siliwangi · Okt 2026' },
  { src: img('foto-tim'), category: 'warga', title: 'Tim di lokasi bank sampah', location: 'Lebak Siliwangi · Agu 2026' },
  { src: img('maggot-closeup'), category: 'maggot', title: 'Hasil panen maggot', location: 'Lebak Siliwangi · Okt 2026' },
  { src: img('kantor-kelurahan'), category: 'warga', title: 'Kantor Kelurahan Lebak Siliwangi, mitra koordinasi program', location: 'Lebak Siliwangi' },
  { src: img('hanggar-maggot'), category: 'maggot', title: 'Mengolah sampah organik di Hanggar Maggot kelurahan', location: 'Lebak Siliwangi · Okt 2026' },
  { src: img('rw07-foto-bersama'), category: 'kerja-bakti', title: 'Foto bersama anak-anak RW 07 setelah kerja bakti', location: 'RW 07 · Sep 2026' },
  { src: img('rw05-gotong-royong'), category: 'kerja-bakti', title: 'Gotong royong menata taman RW 05', location: 'RW 05 · Sep 2026' },
  { src: img('pengepul-tumpukan-plastik'), category: 'pengepul', title: 'Meninjau tumpukan botol plastik di pengepul', location: 'Lokasi pengepul · Okt 2026' },
  { src: img('sosialisasi-aplikasi'), category: 'sosialisasi', title: 'Warga menunjukkan aplikasi yang sudah terpasang', location: 'Lebak Siliwangi · Sep 2026' },
  { src: img('rw07-menyapu'), category: 'kerja-bakti', title: 'Menyapu daun kering di lapangan RW 07', location: 'RW 07 · Sep 2026' },
  { src: img('rw05-menanam'), category: 'kerja-bakti', title: 'Menanam ulang tanaman hias saat kerja bakti RW 05', location: 'RW 05 · Sep 2026' },
  { src: img('pengepul-tim'), category: 'pengepul', title: 'Tim mendata sampah anorganik di pengepul', location: 'Lokasi pengepul · Okt 2026' },
  { src: img('sosialisasi-diskusi'), category: 'sosialisasi', title: 'Berbincang dengan warga tentang aplikasi', location: 'Lebak Siliwangi · Sep 2026' },
  { src: img('rw07-memilah-sampah'), category: 'kerja-bakti', title: 'Memilah sampah ke tempat sampah terpilah', location: 'RW 07 · Sep 2026' },
  { src: img('rw05-dari-atas'), category: 'kerja-bakti', title: 'Suasana kerja bakti RW 05 dari atas', location: 'RW 05 · Sep 2026' },
  { src: img('pengepul-memilah-plastik'), category: 'pengepul', title: 'Pemilahan botol plastik oleh petugas pengepul', location: 'Lokasi pengepul · Okt 2026' },
  { src: img('sosialisasi-kartu'), category: 'sosialisasi', title: 'Membagikan kartu informasi aplikasi kepada warga', location: 'Lebak Siliwangi · Sep 2026' },
  { src: img('sosialisasi-pendampingan'), category: 'sosialisasi', title: 'Mendampingi warga mencoba aplikasi', location: 'Lebak Siliwangi · Sep 2026' },
  { src: img('rw05-merawat-tanaman'), category: 'kerja-bakti', title: 'Memindahkan tanaman ke pot baru', location: 'RW 05 · Sep 2026' },
  { src: img('pengepul-kardus'), category: 'pengepul', title: 'Memilah kardus bekas di gudang pengepul', location: 'Lokasi pengepul · Okt 2026' },
  { src: img('rw07-memungut-sampah'), category: 'kerja-bakti', title: 'Memungut sampah di pinggir lapangan RW 07', location: 'RW 07 · Sep 2026' },
  { src: img('rw07-membersihkan-taman'), category: 'kerja-bakti', title: 'Membersihkan daun kering di taman bersama anak-anak RW 07', location: 'RW 07 · Sep 2026' },
  { src: img('rw07-tempat-sampah-pilah'), category: 'kerja-bakti', title: 'Memasukkan sampah ke tempat sampah sesuai jenisnya', location: 'RW 07 · Sep 2026' },
  { src: img('rw05-media-tanam'), category: 'kerja-bakti', title: 'Menyiapkan media tanam bersama warga RW 05', location: 'RW 05 · Sep 2026' },
  { src: img('pengepul-angkut'), category: 'pengepul', title: 'Sampah pilahan siap diangkut dari pengepul', location: 'Lokasi pengepul · Okt 2026' },
  { src: img('sosialisasi-warga'), category: 'sosialisasi', title: 'Warga yang hadir di acara sosialisasi', location: 'Lebak Siliwangi · Sep 2026' },
  { src: img('sosialisasi-persiapan'), category: 'sosialisasi', title: 'Persiapan konsumsi untuk acara sosialisasi', location: 'Lebak Siliwangi · Sep 2026' },
  { src: img('rw07-membersihkan-semak'), category: 'kerja-bakti', title: 'Membersihkan semak dan sampah di pagar lapangan RW 07', location: 'RW 07 · Sep 2026' },
  { src: img('rw05-merapikan-tanaman'), category: 'kerja-bakti', title: 'Merapikan tanaman kering di taman warga', location: 'RW 05 · Sep 2026' },
  { src: img('rw07-anak-membantu'), category: 'kerja-bakti', title: 'Anak-anak ikut mengumpulkan daun kering', location: 'RW 07 · Sep 2026' },
  { src: img('rw07-menyapu-bersama-anak'), category: 'kerja-bakti', title: 'Menyapu daun kering bersama anak-anak RW 07', location: 'RW 07 · Sep 2026' },
];

export const DIVISION_OUTCOMES = [
  {
    title: 'Pimpinan & Sekretariat',
    lead: 'Naufal Putra & Muhamad Irsad',
    desc: 'Pengelolaan administrasi perizinan, penyusunan proposal kegiatan, serta koordinasi lintas lembaga dengan pihak kelurahan dan kampus.',
    status: 'Selesai 100%',
  },
  {
    title: 'Divisi Acara & Lapangan',
    lead: 'Rizky Al Farid, Fadilah Aulia, Farhan',
    desc: 'Perencanaan dan pelaksanaan 4 program kerja, koordinasi logistik kegiatan, serta mobilisasi kerja bakti bersama warga.',
    status: 'Terealisasi Penuh',
  },
  {
    title: 'Divisi Medinfo & Humas',
    lead: 'Novi, Pebi, Arasya, Rimo, Lion Star',
    desc: 'Produksi konten dokumentasi kegiatan, perancangan materi edukasi visual, pengelolaan publikasi, dan laporan digital posko.',
    status: 'Terdokumentasi Lengkap',
  },
  {
    title: 'Bendahara & Logistik',
    lead: 'Muhammad Rizki',
    desc: 'Pencatatan transparansi anggaran operasional, pengadaan sarana tempat sampah pilah, dan perlengkapan kegiatan lapangan.',
    status: 'Tercatat Rapi',
  },
];

// `query` dipakai untuk peta & tombol rute Google Maps.
// Ganti dengan alamat lengkap / nama tempat di Google Maps supaya titiknya tepat.
export const LOCATIONS = [
  {
    id: 'posko',
    tabLabel: 'Posko & Bank Sampah',
    name: 'Posko KKN & Bank Sampah Lebak Siliwangi',
    category: 'Basecamp tim · Bank sampah',
    desc: 'Tempat tim berkumpul dan berkoordinasi, sekaligus bank sampah tempat warga menyetor sampah pilahan bersama Tim Gaslah.',
    address: 'Kelurahan Lebak Siliwangi, Kecamatan Coblong, Kota Bandung',
    // 6°53'43.2"S 107°36'30.0"E
    query: '-6.895333,107.608333',
    hours: null,
    contact: null,
  },
  {
    id: 'kelurahan',
    tabLabel: 'Kantor Kelurahan',
    name: 'Kantor Kelurahan Lebak Siliwangi',
    category: 'Kantor pemerintahan',
    desc: 'Mitra koordinasi program KKN, sekaligus lokasi budidaya maggot yang kami bantu kelola.',
    address: 'Kecamatan Coblong, Kota Bandung',
    query: 'Kantor Kelurahan Lebak Siliwangi, Bandung',
    hours: null,
    contact: null,
  },
];

export const FOOTER_INFO = {
  address: 'Posko KKN Kelurahan Lebak Siliwangi, Kecamatan Coblong, Kota Bandung 40132',
  instagram: 'https://instagram.com',
  youtube: 'https://youtube.com',
  unikomUrl: 'https://unikom.ac.id',
  copyright: '© 2026 KKN Berdampak UNIKOM - Kelompok Lebak Siliwangi 2. Universitas Komputer Indonesia.',
};