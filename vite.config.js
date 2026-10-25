import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Sisipkan CSS hasil build langsung ke index.html supaya tidak ada request CSS yang memblokir render
const inlineCss = () => ({
  name: 'inline-css',
  apply: 'build',
  enforce: 'post',
  generateBundle(_, bundle) {
    const html = bundle['index.html'];
    if (!html) return;
    for (const css of Object.values(bundle).filter((f) => f.fileName.endsWith('.css'))) {
      const tag = new RegExp(`<link rel="stylesheet"[^>]*href="/${css.fileName}"[^>]*>`);
      if (!tag.test(html.source)) continue;
      html.source = html.source.replace(tag, () => `<style>${css.source}</style>`);
      delete bundle[css.fileName];
    }
    // Preload font latin utama supaya teks cepat tampil dengan font yang benar
    const fonts = Object.values(bundle).filter((f) => /(geist|bricolage-grotesque)-latin-(wght|opsz)-normal.*\.woff2$/.test(f.fileName));
    const preload = fonts.map((f) => `<link rel="preload" as="font" type="font/woff2" href="/${f.fileName}" crossorigin>`).join('');
    html.source = html.source.replace('</title>', `</title>${preload}`);
  },
})

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    inlineCss(),
  ],
})
