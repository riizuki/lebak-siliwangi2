import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/geist/wght.css'
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import './index.css'
import App from './App.jsx'
import { PreferencesProvider } from './preferences'

const app = (
  <StrictMode>
    <PreferencesProvider>
      <App />
    </PreferencesProvider>
  </StrictMode>
)

// Hasil build berisi HTML prerender (scripts/prerender.mjs): cukup di-hydrate. Saat `vite dev` root kosong.
const root = document.getElementById('root')
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
