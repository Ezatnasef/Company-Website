import React from 'react';
import { brand } from '../../content/brand';
import { useSite } from '../../context/SiteContext';
import './Footer.css';

const Footer = () => {
  const { copy } = useSite();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        <div className="footer-brand">
          <div className="nav-brand footer-brand-mark">
            <span className="brand-mark">
              <span>{brand.markPrimary}</span>
              <span>{brand.markSecondary}</span>
            </span>
            <span className="brand-copy">
              <strong>{brand.name}</strong>
              <small>{brand.descriptor}</small>
            </span>
          </div>
          <p>{copy.footer.description}</p>
        </div>

        <div className="footer-column">
          <h4>{copy.footer.linksTitle}</h4>
          <button onClick={() => scrollTo('about')} type="button">{copy.footer.links[0]}</button>
          <button onClick={() => scrollTo('projects')} type="button">{copy.footer.links[1]}</button>
          <button onClick={() => scrollTo('testimonials')} type="button">{copy.footer.links[2]}</button>
          <button onClick={() => scrollTo('contact')} type="button">{copy.footer.links[3]}</button>
        </div>

        <div className="footer-column">
          <h4>{copy.footer.legalTitle}</h4>
          <a href="#!">{copy.footer.legal[0]}</a>
          <a href="#!">{copy.footer.legal[1]}</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>{copy.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
