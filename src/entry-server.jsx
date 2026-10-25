import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { PreferencesProvider } from './preferences';

// Dipakai scripts/prerender.mjs untuk menulis HTML awal halaman saat build
export const render = (gallery) =>
  renderToString(
    <PreferencesProvider>
      <App gallery={gallery} />
    </PreferencesProvider>,
  );
