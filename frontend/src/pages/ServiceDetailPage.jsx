import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { servicePages } from '../content/servicePages';
import { useSite } from '../context/SiteContext';
import './ServiceDetailPage.css';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const { locale } = useSite();
  const service = servicePages[slug]?.[locale];
  const mockupType = servicePages[slug]?.mockup;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!service) {
    return null;
  }

  return (
    <main className="service-page">
      <section className="service-page-hero section">
        <div className="container service-page-hero-layout">
          <div className="service-page-copy reveal-right">
            <span className="section-tag">{service.eyebrow}</span>
            <h1>{service.title}</h1>
            <p>{service.description}</p>
            <div className="service-page-actions">
              <Link className="button-primary" to="/#contact">
                {service.primaryAction}
              </Link>
              <Link className="button-secondary" to="/#contact">
                {service.secondaryAction}
              </Link>
            </div>
          </div>

          <div className="service-page-mockup reveal-left">
            {mockupType === 'browser' ? (
              <div className="service-browser-shell">
                <div className="service-browser-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="service-browser-screen">
                  <div className="service-browser-hero-card" />
                  <div className="service-browser-grid">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="service-browser-footer">
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            ) : (
              <div className="service-phone-stage">
                <div className="service-phone back left">
                  <div className="service-phone-screen mini" />
                </div>
                <div className="service-phone front">
                  <div className="service-phone-screen">
                    <div className="service-phone-top">
                      <small>09:41</small>
                      <span className="service-phone-notch" />
                    </div>
                    <div className="service-phone-banner" />
                    <div className="service-phone-grid">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="service-phone-list">
                      <div><span /> <small>{locale === 'ar' ? 'الرئيسية' : 'Home'}</small></div>
                      <div><span /> <small>{locale === 'ar' ? 'القوائم' : 'Lists'}</small></div>
                      <div><span /> <small>{locale === 'ar' ? 'الحجوزات' : 'Bookings'}</small></div>
                      <div><span /> <small>{locale === 'ar' ? 'الملف الشخصي' : 'Profile'}</small></div>
                    </div>
                  </div>
                </div>
                <div className="service-phone back right">
                  <div className="service-phone-screen mini alt" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section service-page-stats">
        <div className="container service-stat-grid">
          {service.stats.map((item) => (
            <article key={item.label} className="service-stat-card reveal-scale">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      {service.highlights?.length ? (
        <section className="section">
          <div className="container">
            <div className="service-block-title reveal">
              <h2>{service.highlightsTitle}</h2>
            </div>
            <div className="service-highlights-grid">
              {service.highlights.map((item) => (
                <article key={item.title} className="service-highlight-card reveal-scale">
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container service-page-block">
          <div className="service-block-title reveal">
            <h2>{service.deliverablesTitle}</h2>
          </div>
          <div className="service-check-grid">
            {service.deliverables.map((item) => (
              <article key={item} className="service-check-card reveal-scale">
                <span>✓</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-block-title reveal">
            <h2>{service.sectionsTitle}</h2>
          </div>
          <div className="service-sections-grid">
            {service.sections.map((item) => (
              <article key={item.title} className="service-section-card reveal-scale">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {service.idealFor?.length ? (
        <section className="section">
          <div className="container">
            <div className="service-block-title reveal">
              <h2>{service.idealForTitle}</h2>
            </div>
            <div className="service-fit-grid">
              {service.idealFor.map((item) => (
                <article key={item} className="service-fit-card reveal">
                  <span>+</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <div className="service-block-title reveal">
            <h2>{service.processTitle}</h2>
          </div>
          <div className="service-process-list">
            {service.process.map((item, index) => (
              <article key={item} className="service-process-item reveal">
                <strong>{String(index + 1).padStart(2, '0')}</strong>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-block-title reveal">
            <h2>{service.faqTitle}</h2>
          </div>
          <div className="service-faq-list">
            {service.faq.map((item) => (
              <article key={item.question} className="service-faq-item reveal">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailPage;
