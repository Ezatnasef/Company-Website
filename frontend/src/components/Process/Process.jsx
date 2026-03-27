import React, { useMemo, useState } from 'react';
import { useSite } from '../../context/SiteContext';
import './Process.css';

const Process = () => {
  const { copy } = useSite();
  const [trackKey, setTrackKey] = useState('engineering');
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(() => copy.process.tracks[trackKey], [copy.process.tracks, trackKey]);

  const move = (direction) => {
    setStepIndex((current) => {
      const next = current + direction;

      if (next < 0) {
        return steps.length - 1;
      }

      if (next >= steps.length) {
        return 0;
      }

      return next;
    });
  };

  const changeTrack = (key) => {
    setTrackKey(key);
    setStepIndex(0);
  };

  const step = steps[stepIndex];

  return (
    <section className="section process-section" id="process">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{copy.process.tag}</span>
          <h2>{copy.process.title}</h2>
          <p>{copy.process.subtitle}</p>
        </div>

        <div className="process-tabs reveal">
          <div className="tab-row">
            <button className={`tab-button ${trackKey === 'engineering' ? 'active' : ''}`} onClick={() => changeTrack('engineering')} type="button">
              {copy.process.tabs.engineering}
            </button>
            <button className={`tab-button ${trackKey === 'marketing' ? 'active' : ''}`} onClick={() => changeTrack('marketing')} type="button">
              {copy.process.tabs.marketing}
            </button>
          </div>
        </div>

        <div className="process-card gradient-panel reveal-scale">
          <div className="process-icon">{step.icon}</div>
          <div className="process-main">
            <span className="process-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </div>

        <div className="process-controls reveal">
          <button className="icon-button" aria-label={copy.process.previous} onClick={() => move(-1)} type="button">
            ‹
          </button>
          <div className="process-dots" aria-hidden="true">
            {steps.map((item, index) => (
              <span key={item.number} className={index === stepIndex ? 'active' : ''} />
            ))}
          </div>
          <button className="icon-button" aria-label={copy.process.next} onClick={() => move(1)} type="button">
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Process;
