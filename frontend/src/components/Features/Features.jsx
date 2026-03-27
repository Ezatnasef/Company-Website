import React, { useEffect, useMemo, useState } from 'react';
import { useSite } from '../../context/SiteContext';
import './Features.css';

const getWrappedIndex = (index, length) => {
  if (index < 0) {
    return length - 1;
  }

  if (index >= length) {
    return 0;
  }

  return index;
};

const Features = () => {
  const { copy } = useSite();
  const [activeIndex, setActiveIndex] = useState(0);
  const items = useMemo(() => copy.features.items, [copy.features.items]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [items.length]);

  const move = (direction) => {
    setActiveIndex((current) => getWrappedIndex(current + direction, items.length));
  };

  const active = items[activeIndex];
  const previous = items[getWrappedIndex(activeIndex - 1, items.length)];
  const next = items[getWrappedIndex(activeIndex + 1, items.length)];

  return (
    <section className="section features-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{copy.features.tag}</span>
          <h2>{copy.features.title}</h2>
          <p>{copy.features.subtitle}</p>
        </div>

        <div className="features-controls reveal">
          <button className="icon-button" aria-label={copy.features.previous} onClick={() => move(-1)} type="button">
            ‹
          </button>
          <div className="features-indicators" aria-hidden="true">
            {items.map((item, index) => (
              <span key={item.title} className={index === activeIndex ? 'active' : ''} />
            ))}
          </div>
          <button className="icon-button" aria-label={copy.features.next} onClick={() => move(1)} type="button">
            ›
          </button>
        </div>

        <div className="features-stage reveal-scale">
          <article className="feature-card side">
            <div className="feature-icon-badge">{previous.icon}</div>
            <h3>{previous.title}</h3>
            <p>{previous.description}</p>
          </article>

          <article className="feature-card active">
            <div className="feature-card-head">
              <div className="feature-icon-badge">{active.icon}</div>
              <small>{String(activeIndex + 1).padStart(2, '0')}</small>
            </div>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
            <div className="feature-card-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </article>

          <article className="feature-card side">
            <div className="feature-icon-badge">{next.icon}</div>
            <h3>{next.title}</h3>
            <p>{next.description}</p>
          </article>
        </div>

        <div className="features-quick-nav reveal">
          {items.map((item, index) => (
            <button
              key={item.title}
              className={`feature-chip ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
