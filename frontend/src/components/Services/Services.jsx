import React from 'react';
import { Link } from 'react-router-dom';
import { servicePages } from '../../content/servicePages';
import { useSite } from '../../context/SiteContext';
import './Services.css';

const primaryServiceSlugs = ['web-applications', 'mobile-applications'];
const supportingServiceKeys = ['support', 'marketing', 'ai'];

const browserPreviewTiles = ['hero', 'stats', 'services', 'cta'];
const phonePreviewItems = [1, 2, 3, 4];

const servicePreviewLabels = {
  ar: {
    webHeadline: 'واجهة رئيسية واضحة',
    webCopy: 'بنية صفحات تدعم القرار والتحويل',
    miniPhone: ['الرئيسية', 'القوائم', 'الحجوزات'],
    mainPhoneTitle: ['واجهة التطبيق', 'تدفق أوضح للمستخدم'],
    mainPhone: ['الرئيسية', 'القوائم', 'الحجوزات', 'الملف الشخصي'],
    pageCta: 'الانتقال إلى الصفحة',
    talkCta: 'ابدأ الحديث معنا',
  },
  en: {
    webHeadline: 'Clear landing experience',
    webCopy: 'Pages structured for trust and conversion',
    miniPhone: ['Home', 'Lists', 'Bookings'],
    mainPhoneTitle: ['App interface', 'Clearer user flow'],
    mainPhone: ['Home', 'Lists', 'Bookings', 'Profile'],
    pageCta: 'Open page',
    talkCta: 'Talk to us',
  },
};

const ServicePathPreview = ({ slug, locale }) => {
  const labels = servicePreviewLabels[locale];

  if (slug === 'web-applications') {
    return (
      <div className="service-preview-browser" aria-hidden="true">
        <div className="service-preview-browser-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="service-preview-browser-screen">
          <div className="service-preview-browser-nav">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="service-preview-browser-hero">
            <div>
              <strong>{labels.webHeadline}</strong>
              <small>{labels.webCopy}</small>
            </div>
            <span />
          </div>
          <div className="service-preview-browser-grid">
            {browserPreviewTiles.map((tile) => (
              <div key={tile}>
                <span />
                <small>{tile}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="service-preview-phone-stage" aria-hidden="true">
      <div className="service-preview-phone back left">
        <div className="service-preview-phone-screen mini">
          <div className="service-preview-phone-banner teal" />
          <div className="service-preview-phone-grid">
            {phonePreviewItems.map((item) => <span key={item} />)}
          </div>
          <div className="service-preview-phone-list">
            {labels.miniPhone.map((label) => (
              <div key={label}>
                <span />
                <small>{label}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="service-preview-phone front">
        <div className="service-preview-phone-screen">
          <div className="service-preview-phone-status">
            <small>09:41</small>
            <span className="service-preview-phone-island" />
          </div>
          <div className="service-preview-phone-title">
            <strong>{servicePages[slug][locale].shortTitle}</strong>
            <strong>{labels.mainPhoneTitle[1]}</strong>
          </div>
          <div className="service-preview-phone-banner rose" />
          <div className="service-preview-phone-grid soft">
            {phonePreviewItems.map((item) => <span key={item} />)}
          </div>
          <div className="service-preview-phone-list">
            {labels.mainPhone.map((label) => (
              <div key={label}>
                <span />
                <small>{label}</small>
              </div>
            ))}
          </div>
          <div className="service-preview-phone-nav">
            <span className="active" />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="service-preview-phone back right">
        <div className="service-preview-phone-screen mini">
          <div className="service-preview-phone-banner blue" />
          <div className="service-preview-phone-grid">
            {phonePreviewItems.map((item) => <span key={item} />)}
          </div>
          <div className="service-preview-phone-list">
            {labels.miniPhone.map((label) => (
              <div key={label}>
                <span />
                <small>{label}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const { copy, locale } = useSite();
  const labels = servicePreviewLabels[locale];

  const primaryServices = primaryServiceSlugs.map((slug) => ({
    slug,
    ...servicePages[slug][locale],
  }));

  const supportingServices = supportingServiceKeys.map((key) => ({
    key,
    ...copy.services.details[key],
  }));

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{copy.services.tag}</span>
          <h2>{copy.services.title}</h2>
          <p>{copy.services.subtitle}</p>
        </div>

        <div className="services-paths">
          {primaryServices.map((service, index) => (
            <article
              key={service.slug}
              className={`service-path-card reveal-scale ${index % 2 === 1 ? 'is-reversed' : ''}`}
            >
              <div className="service-path-copy">
                <span className="service-path-kicker">{service.eyebrow}</span>
                <h3>{service.shortTitle || service.title}</h3>
                <p>{service.description}</p>

                <div className="service-path-deliverables">
                  {service.deliverables.slice(0, 3).map((item) => (
                    <div key={item} className="service-path-bullet">
                      <span>+</span>
                      <small>{item}</small>
                    </div>
                  ))}
                </div>

                <div className="service-path-actions">
                  <Link className="button-primary service-path-link" to={`/services/${service.slug}`}>
                    {labels.pageCta}
                  </Link>
                  <Link className="button-secondary service-path-link secondary" to="/#contact">
                    {labels.talkCta}
                  </Link>
                </div>
              </div>

              <div className="service-path-visual">
                <ServicePathPreview slug={service.slug} locale={locale} />
              </div>
            </article>
          ))}
        </div>

        <div className="services-support-grid">
          {supportingServices.map((service) => (
            <article key={service.key} className="service-support-card reveal">
              <strong>{service.title}</strong>
              <p>{service.lead}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
