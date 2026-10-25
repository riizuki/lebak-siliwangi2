import { createContext, useContext, useEffect, useRef, useState } from 'react';

import * as DATA_ID from './data/kknData';
import * as DATA_EN from './data/kknData.en';
import { UI } from './data/ui';


const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Mode privat / penyimpanan diblokir: preferensi cukup berlaku di sesi ini
  }
};

const initialTheme = () => {
  const saved = read('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  // Render awal selalu 'id' + 'light' agar sama dengan HTML prerender; preferensi tersimpan
  // diterapkan setelah hydrate. Warna gelap sudah dipasang skrip di index.html sebelum halaman tampil.
  const [lang, setLang] = useState('id');
  const [theme, setTheme] = useState('light');
  const ready = useRef(false);

  useEffect(() => {
    if (!ready.current) return;
    document.documentElement.lang = lang;
    write('lang', lang);
  }, [lang]);

  useEffect(() => {
    if (!ready.current) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0e1411' : '#ffffff');
    write('theme', theme);
  }, [theme]);

  useEffect(() => {
    ready.current = true;
    setLang(read('lang') === 'en' ? 'en' : 'id');
    setTheme(initialTheme());
  }, []);

  const value = {
    lang,
    setLang,
    theme,
    toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    t: UI[lang],
    ...(lang === 'en' ? DATA_EN : DATA_ID),
  };

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export const usePrefs = () => useContext(PreferencesContext);
