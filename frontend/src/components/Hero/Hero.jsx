import React from 'react';
import { useSite } from '../../context/SiteContext';
import './Hero.css';

const Hero = () => {
  const { copy, locale } = useSite();

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section className="hero-section" id="top">
      <div className="hero-circuit" aria-hidden="true" />
      <div className="hero-floor" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy reveal">
          <span className="eyebrow">{copy.hero.eyebrow}</span>
          <h1>
            <span>{copy.hero.title[0]}</span>
            <span>{copy.hero.title[1]}</span>
          </h1>
          <p>{copy.hero.description}</p>
          <div className="hero-actions">
            <button className="button-primary" onClick={() => scrollTo('contact')} type="button">
              <span>{copy.hero.primaryAction}</span>
              <span aria-hidden="true">{locale === 'ar' ? '✦' : '→'}</span>
            </button>
            <button className="button-secondary" onClick={() => scrollTo('projects')} type="button">
              {copy.hero.secondaryAction}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
