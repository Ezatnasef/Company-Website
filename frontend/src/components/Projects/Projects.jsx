import React, { useEffect, useMemo, useState } from 'react';
import API from '../../utils/api';
import { localizeProject } from '../../content/siteContent';
import { useSite } from '../../context/SiteContext';
import './Projects.css';

const fallbackProjects = [
  { _id: '1', title: 'غزال لإدارة المواقف', description: '', category: 'app', order: 1 },
  { _id: '2', title: 'منصور للذبائح', description: '', category: 'app', order: 2 },
  { _id: '3', title: 'آل ساري للسيارات', description: '', category: 'app', order: 3 },
  { _id: '4', title: 'نادي أبها الرياضي', description: '', category: 'web', order: 4 },
  { _id: '5', title: 'اسبتالية', description: '', category: 'web', order: 5 },
  { _id: '6', title: 'رابل الزراعية', description: '', category: 'web', order: 6 },
];

const getRelativeIndex = (index, activeIndex, length) => {
  const half = Math.floor(length / 2);
  const distance = index - activeIndex;

  if (distance > half) {
    return distance - length;
  }

  if (distance < -half) {
    return distance + length;
  }

  return distance;
};

const Projects = () => {
  const { copy, locale } = useSite();
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('app');
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/projects')
      .then(({ data }) => setProjects(data.data))
      .catch(() => setProjects(fallbackProjects))
      .finally(() => setLoading(false));
  }, []);

  const localizedProjects = useMemo(() => (projects.length ? projects : fallbackProjects)
    .slice()
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((project) => ({
      ...project,
      localized: localizeProject(project, locale),
    })), [locale, projects]);

  const filtered = useMemo(
    () => localizedProjects.filter((project) => project.category === activeCategory),
    [activeCategory, localizedProjects]
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  const activeProject = filtered[activeIndex] || filtered[0];

  const move = (direction) => {
    if (!filtered.length) {
      return;
    }

    setActiveIndex((current) => (current + direction + filtered.length) % filtered.length);
  };

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{copy.projects.tag}</span>
          <h2>{copy.projects.title}</h2>
          <p>{copy.projects.subtitle}</p>
        </div>

        <div className="projects-tabs-wrap reveal">
          <div className="tab-row">
            <button
              className={`tab-button ${activeCategory === 'app' ? 'active' : ''}`}
              onClick={() => setActiveCategory('app')}
              type="button"
            >
              {copy.projects.tabs.app}
            </button>
            <button
              className={`tab-button ${activeCategory === 'web' ? 'active' : ''}`}
              onClick={() => setActiveCategory('web')}
              type="button"
            >
              {copy.projects.tabs.web}
            </button>
          </div>
        </div>

        {loading && !localizedProjects.length ? (
          <div className="spinner" />
        ) : (
          <>
            {activeProject && (
              <div className="projects-spotlight reveal">
                <span className="projects-spotlight-label">{copy.projects.detailsHeading}</span>
                <h3>{activeProject.localized.title}</h3>
                <p>{activeProject.localized.description}</p>
                <small>{activeProject.localized.caption}</small>
              </div>
            )}

            <div className="projects-stage-wrap reveal-scale">
              <button className="icon-button projects-arrow" aria-label={copy.projects.previous} onClick={() => move(-1)} type="button">
                {locale === 'ar' ? '‹' : '‹'}
              </button>

              <div className={`projects-stage ${activeCategory === 'app' ? 'app-mode' : 'web-mode'}`}>
                {filtered.map((project, index) => {
                  const relative = getRelativeIndex(index, activeIndex, filtered.length);
                  const stateClass = relative === 0
                    ? 'is-center'
                    : relative === -1
                      ? 'is-right'
                      : relative === 1
                        ? 'is-left'
                        : relative < 0
                          ? 'is-far-right'
                          : 'is-far-left';

                  return (
                    <article
                      key={project._id || project.title}
                      className={`project-scene project-accent-${project.localized.accent} ${stateClass}`}
                    >
                      {activeCategory === 'app' ? (
                        <div className="phone-shell">
                          <div className="phone-reflection" />
                          <header className="phone-header">
                            <small>09:41</small>
                            <span className="phone-island" />
                            <small>{locale === 'ar' ? 'LTE' : '5G'}</small>
                          </header>

                          <div className="phone-body">
                            <div className="phone-title">
                              <strong>{project.localized.title}</strong>
                            </div>

                            <div className="phone-card phone-card-strong" />

                            <div className="phone-card phone-card-grid">
                              <span />
                              <span />
                              <span />
                              <span />
                            </div>

                            <div className="phone-card phone-card-list">
                              {copy.projects.appScreens.map((screen, screenIndex) => (
                                <div key={screen}>
                                  <span />
                                  <strong>{screen}</strong>
                                  <small>{String(screenIndex + 1).padStart(2, '0')}</small>
                                </div>
                              ))}
                            </div>

                            <div className="phone-nav">
                              <span className="active" />
                              <span />
                              <span />
                              <span />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="browser-shell">
                          <div className="browser-bar">
                            <span />
                            <span />
                            <span />
                          </div>

                          <div className="browser-body">
                            <div className="browser-top-strip">
                              <span />
                              <span />
                              <span />
                              <span />
                            </div>

                            <div className="browser-hero">
                              <div className="browser-hero-copy">
                                <strong>{project.localized.title}</strong>
                                <small>{project.localized.caption}</small>
                              </div>
                              <div className="browser-hero-media">
                                <span />
                                <span />
                              </div>
                            </div>

                            <div className="browser-grid">
                              {copy.projects.webScreens.map((screen) => (
                                <div key={screen}>
                                  <span />
                                  <small>{screen}</small>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              <button className="icon-button projects-arrow" aria-label={copy.projects.next} onClick={() => move(1)} type="button">
                {locale === 'ar' ? '›' : '›'}
              </button>
            </div>

            <div className="projects-indicators reveal" aria-hidden="true">
              {filtered.map((project, index) => (
                <button
                  key={project._id || project.title}
                  className={`projects-indicator ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
