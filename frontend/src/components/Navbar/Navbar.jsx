import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { brand } from '../../content/brand';
import { useSite } from '../../context/SiteContext';
import './Navbar.css';

const MenuDotsIcon = () => (
  <svg className="nav-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="5" cy="12" r="2.1" />
    <circle cx="12" cy="12" r="2.1" />
    <circle cx="19" cy="12" r="2.1" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg className={`nav-chevron ${open ? 'open' : ''}`} viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M3.25 5.75 8 10.25l4.75-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ThemeIcon = ({ theme }) => (
  theme === 'light' ? (
    <svg className="nav-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14.5 3.5a8 8 0 1 0 6 13.3 7 7 0 0 1-6-13.3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg className="nav-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.78 1.78M7.24 16.76l-1.78 1.78M18.54 18.54l-1.78-1.78M7.24 7.24 5.46 5.46"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
);

const Navbar = () => {
  const { copy, locale, theme, setLocale, toggleTheme } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isServicesRoute = location.pathname.startsWith('/services/');
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setMenuOpen(false);
        setServicesMenuOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setServicesMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const quickLinks = useMemo(() => copy.nav.quickLinks, [copy.nav.quickLinks]);
  const navLinks = useMemo(() => copy.nav.links, [copy.nav.links]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setServicesMenuOpen(false);

    if (id === 'admin') {
      navigate('/admin/login');
      return;
    }

    if (!isHome) {
      navigate(id === 'top' ? '/' : `/#${id}`);
      return;
    }

    if (id === 'top') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleQuickMenu = () => {
    setServicesMenuOpen(false);
    setMenuOpen((open) => !open);
  };

  const toggleServicesMenu = () => {
    setMenuOpen(false);
    setServicesMenuOpen((open) => !open);
  };

  const openServicePage = (to) => {
    setMenuOpen(false);
    setServicesMenuOpen(false);
    navigate(to);
  };

  return (
    <div className="navbar-shell" ref={navRef}>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <div className="nav-actions">
            <button
              className={`icon-button nav-dots ${menuOpen ? 'active' : ''}`}
              aria-label={copy.nav.menu}
              aria-controls="nav-quick-menu"
              aria-expanded={menuOpen}
              onClick={toggleQuickMenu}
              type="button"
            >
              <MenuDotsIcon />
            </button>

            <div className="language-toggle" role="group" aria-label={copy.nav.language}>
              <button
                className={locale === 'ar' ? 'active' : ''}
                onClick={() => setLocale('ar')}
                type="button"
              >
                AR
              </button>
              <button
                className={locale === 'en' ? 'active' : ''}
                onClick={() => setLocale('en')}
                type="button"
              >
                EN
              </button>
            </div>

            <button
              className="icon-button nav-theme"
              aria-label={copy.nav.theme}
              onClick={toggleTheme}
              type="button"
            >
              <span className="theme-icon" aria-hidden="true">
                <ThemeIcon theme={theme} />
              </span>
            </button>
          </div>

          <ul className="nav-links">
            {navLinks.map((item) => (
              <li key={item.key} className={item.children?.length ? 'nav-item-with-menu' : ''}>
                {item.children?.length ? (
                  <>
                    <button
                      className={`nav-link nav-link-with-icon ${servicesMenuOpen || isServicesRoute ? 'active' : ''}`}
                      aria-controls="services-submenu"
                      aria-expanded={servicesMenuOpen}
                      aria-haspopup="menu"
                      onClick={toggleServicesMenu}
                      type="button"
                    >
                      <span>{item.label}</span>
                      <ChevronIcon open={servicesMenuOpen} />
                    </button>

                    <div className={`nav-submenu ${servicesMenuOpen ? 'open' : ''}`} id="services-submenu" role="menu">
                      {item.children.map((child) => (
                        <button
                          key={child.key}
                          className="nav-submenu-link"
                          onClick={() => openServicePage(child.to)}
                          role="menuitem"
                          type="button"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <button className="nav-link" onClick={() => scrollTo(item.key === 'about' ? 'about' : item.key)} type="button">
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <Link className="nav-brand" to="/">
            <span className="brand-mark">
              <span>{brand.markPrimary}</span>
              <span>{brand.markSecondary}</span>
            </span>
            <span className="brand-copy">
              <strong>{brand.name}</strong>
              <small>{brand.descriptor}</small>
            </span>
          </Link>
        </div>
      </nav>

      <div className={`nav-quick-menu ${menuOpen ? 'open' : ''}`} id="nav-quick-menu">
        <div className="container nav-quick-inner-wrap">
          <div className="nav-quick-inner">
            {quickLinks.map((item) => (
              <button key={item.key} className="nav-quick-link" onClick={() => scrollTo(item.key)} type="button">
                {item.label}
              </button>
            ))}
            <button className="nav-quick-link" onClick={() => scrollTo('top')} type="button">
              {locale === 'ar' ? 'أعلى الصفحة' : 'Back to top'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
