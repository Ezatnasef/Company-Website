import React, { useMemo, useState } from 'react';
import API from '../../utils/api';
import { useSite } from '../../context/SiteContext';
import './Contact.css';

const Contact = () => {
  const { copy } = useSite();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const services = useMemo(() => copy.contact.services, [copy.contact.services]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.phone || !form.email || !form.service || !form.description) {
      setMessage({ type: 'error', text: copy.contact.fillAll });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await API.post('/contacts', form);
      setMessage({ type: 'success', text: response.data.message });
      setForm({ name: '', phone: '', email: '', service: '', description: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || copy.contact.fallbackError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-layout">
        <div className="contact-copy reveal-right">
          <span className="section-tag">{copy.contact.tag}</span>
          <h2>{copy.contact.title}</h2>
          <p>{copy.contact.subtitle}</p>

          <div className="contact-info-list">
            {copy.contact.info.map((item) => (
              <article key={item.label} className="contact-info-card">
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="contact-form-wrap reveal-left">
          <div className="contact-form-card">
            <h3>{copy.contact.formTitle}</h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className="contact-field-grid">
                <label className="field-control">
                  <span>{copy.contact.fields.name}</span>
                  <input name="name" value={form.name} onChange={handleChange} placeholder={copy.contact.placeholders.name} />
                </label>

                <label className="field-control">
                  <span>{copy.contact.fields.phone}</span>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder={copy.contact.placeholders.phone} />
                </label>
              </div>

              <label className="field-control">
                <span>{copy.contact.fields.email}</span>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={copy.contact.placeholders.email} />
              </label>

              <label className="field-control">
                <span>{copy.contact.fields.service}</span>
                <select name="service" value={form.service} onChange={handleChange}>
                  <option value="">{copy.contact.placeholders.service}</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field-control">
                <span>{copy.contact.fields.description}</span>
                <textarea
                  name="description"
                  rows={5}
                  value={form.description}
                  onChange={handleChange}
                  placeholder={copy.contact.placeholders.description}
                />
              </label>

              {message && <div className={`contact-message ${message.type}`}>{message.text}</div>}

              <button className="button-primary contact-submit" disabled={loading} type="submit">
                {loading ? copy.contact.sending : copy.contact.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
