import React, { useEffect, useMemo, useState } from 'react';
import API from '../../utils/api';
import { localizeClient } from '../../content/siteContent';
import { useSite } from '../../context/SiteContext';
import './Clients.css';

const fallbackClients = [
  'كود كار للسيارات',
  'الكثيري للسيارات',
  'المطيري للسيارات',
  'صالح للسيارات',
  'هامات العقارية',
  'مجمع الأسرة الخليجي الطبي',
  'منصة بلاتين',
  'كشفية',
];

const Clients = () => {
  const { copy, locale } = useSite();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    API.get('/clients')
      .then(({ data }) => setClients(data.data.map((item) => item.name)))
      .catch(() => setClients(fallbackClients));
  }, []);

  const list = useMemo(
    () => (clients.length ? clients : fallbackClients).map((name) => localizeClient(name, locale)),
    [clients, locale]
  );

  const marqueeItems = useMemo(() => [...list, ...list], [list]);

  return (
    <section className="clients-section" id="about">
      <div className="container">
        <div className="clients-shell reveal">
          <p>{copy.hero.trustedBy}</p>
          <div className="clients-marquee">
            <div className="clients-track">
              {marqueeItems.map((name, index) => (
                <span key={`${name}-${index}`} className="client-logo">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
