import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { siteCopy } from '../content/siteContent';
import { STORAGE_KEYS } from '../utils/storageKeys';

const SiteContext = createContext(null);

const getInitialLocale = () => {
  const stored = window.localStorage.getItem(STORAGE_KEYS.locale);
  return stored === 'en' ? 'en' : 'ar';
};

const getInitialTheme = () => {
  const stored = window.localStorage.getItem(STORAGE_KEYS.theme);
  return stored === 'dark' ? 'dark' : 'light';
};

export const SiteProvider = ({ children }) => {
  const [locale, setLocale] = useState(getInitialLocale);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.locale, locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.body.dataset.locale = locale;
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.theme, theme);
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
  }, [theme]);

  const value = useMemo(() => ({
    locale,
    theme,
    isArabic: locale === 'ar',
    copy: siteCopy[locale],
    setLocale,
    toggleLocale: () => setLocale((current) => (current === 'ar' ? 'en' : 'ar')),
    setTheme,
    toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
  }), [locale, theme]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export const useSite = () => {
  const context = useContext(SiteContext);

  if (!context) {
    throw new Error('useSite must be used inside SiteProvider');
  }

  return context;
};
