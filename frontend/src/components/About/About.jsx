import React, { useEffect, useMemo, useRef, useState } from 'react';
import API from '../../utils/api';
import { useSite } from '../../context/SiteContext';
import './About.css';

const defaultStats = {
  workHours: 253440,
  coffeeCups: 73370,
  projects: 307,
  yearsExperience: 10,
};

const formatNumber = (value, locale) => (
  new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US').format(value)
);

const AnimatedStat = ({ value, locale, prefix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || started) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) {
      return undefined;
    }

    let frameId;
    const duration = 1400;
    const startedAt = performance.now();

    const animate = (timestamp) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const eased = 1 - ((1 - progress) ** 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [started, value]);

  return (
    <strong ref={ref}>
      {prefix}
      {formatNumber(displayValue, locale)}
    </strong>
  );
};

const About = () => {
  const { copy, locale } = useSite();
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    API.get('/stats')
      .then(({ data }) => {
        if (data.data) {
          setStats(data.data);
        }
      })
      .catch(() => setStats(defaultStats));
  }, []);

  const items = useMemo(() => copy.about.stats.map((item) => ({
    ...item,
    value: stats[item.key],
  })), [copy.about.stats, stats]);

  return (
    <section className="section about-section">
      <div className="container about-layout">
        <div className="about-copy reveal-right">
          <span className="section-tag">{copy.about.tag}</span>
          <h2>{copy.about.title}</h2>
          <p>{copy.about.description}</p>
        </div>

        <div className="about-stats reveal-left">
          {items.map((item) => (
            <article key={item.key} className="about-stat-card">
              <AnimatedStat value={item.value} locale={locale} prefix={item.key === 'yearsExperience' ? '+' : ''} />
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
