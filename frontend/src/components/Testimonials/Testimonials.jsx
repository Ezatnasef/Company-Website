import React, { useEffect, useMemo, useState } from 'react';
import API from '../../utils/api';
import { localizeTestimonial } from '../../content/siteContent';
import { useSite } from '../../context/SiteContext';
import './Testimonials.css';

const fallbackItems = [
  { _id: '1', name: 'أ. محمد عراقي', role: '', avatar: 'م', youtubeId: 'ZDj2D-kAAUo' },
  { _id: '2', name: 'أ. سلطان الفيفي', role: '', avatar: 'س', youtubeId: 'cVvu9w6W3Tk' },
  { _id: '3', name: 'أ. أحمد مفرح', role: '', avatar: 'أ', youtubeId: 'R-rPhhjtdWM' },
];

const Testimonials = () => {
  const { copy, locale } = useSite();
  const [items, setItems] = useState([]);
  const [videoId, setVideoId] = useState('');
  const [cardMode, setCardMode] = useState({});

  useEffect(() => {
    API.get('/testimonials')
      .then(({ data }) => setItems(data.data))
      .catch(() => setItems(fallbackItems));
  }, []);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === 'Escape') {
        setVideoId('');
      }
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  const list = useMemo(() => (items.length ? items : fallbackItems).slice(0, 3).map((item) => ({
    ...item,
    localized: localizeTestimonial(item, locale),
  })), [items, locale]);

  const setMode = (id, mode) => {
    setCardMode((current) => ({
      ...current,
      [id]: mode,
    }));
  };

  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{copy.testimonials.tag}</span>
          <div className="testimonials-gem" aria-hidden="true">
            ◈
          </div>
          <h2>
            <span>{copy.testimonials.title[0]}</span>
            <span>{copy.testimonials.title[1]}</span>
          </h2>
          <p>{copy.testimonials.subtitle}</p>
        </div>

        <div className="testimonials-grid">
          {list.map((item) => {
            const mode = cardMode[item._id] || 'quote';

            return (
              <article key={item._id} className="testimonial-card reveal-scale">
                <div className="testimonial-head">
                  <div className="testimonial-avatar">{item.avatar || item.localized.name.slice(0, 1)}</div>
                  <div>
                    <h3>{item.localized.name}</h3>
                    <p>{item.localized.role}</p>
                  </div>
                </div>

                <div className="testimonial-actions">
                  <button className={`testimonial-action ${mode === 'audio' ? 'active' : ''}`} onClick={() => setMode(item._id, 'audio')} type="button">
                    <span>🎙</span>
                    {copy.testimonials.audio}
                  </button>
                  <button className="testimonial-action active" onClick={() => setVideoId(item.youtubeId)} type="button">
                    <span>▶</span>
                    {copy.testimonials.watch}
                  </button>
                  <button className={`testimonial-action ${mode === 'quote' ? 'active' : ''}`} onClick={() => setMode(item._id, 'quote')} type="button">
                    <span>💬</span>
                    {copy.testimonials.quote}
                  </button>
                </div>

                <div className="testimonial-media">
                  <button className="testimonial-video" onClick={() => setVideoId(item.youtubeId)} type="button">
                    <img src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`} alt={item.localized.name} />
                    <span>▶</span>
                  </button>
                </div>

                <div className="testimonial-note visible">
                  {mode === 'audio' ? copy.testimonials.audioNote : copy.testimonials.transcript}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {videoId && (
        <div className="testimonial-modal" onClick={() => setVideoId('')}>
          <div className="testimonial-modal-inner" onClick={(event) => event.stopPropagation()}>
            <button className="testimonial-modal-close" onClick={() => setVideoId('')} type="button">
              ×
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="testimonial-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
