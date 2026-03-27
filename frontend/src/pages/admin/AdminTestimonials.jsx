import React, { useEffect, useState, useCallback } from 'react';
import API from '../../utils/api';
import './AdminDashboard.css';

const EMPTY = { name: '', role: '', avatar: '', youtubeId: '', text: '', order: 0 };

const AdminTestimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const fetch = useCallback(() => {
    setLoading(true);
    API.get('/testimonials').then(({ data }) => setItems(data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const openCreate = () => { setForm(EMPTY); setModal('create'); };
  const openEdit = (t) => {
    setForm({ name: t.name, role: t.role, avatar: t.avatar, youtubeId: t.youtubeId || '', text: t.text || '', order: t.order });
    setModal({ type: 'edit', id: t._id });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal === 'create') await API.post('/testimonials', form);
      else await API.put(`/testimonials/${modal.id}`, form);
      fetch(); setModal(null);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('حذف هذا الرأي؟')) return;
    await API.delete(`/testimonials/${id}`); fetch();
  };

  const f = (field, val) => setForm(p => ({ ...p, [field]: val }));

  return (
    <div className="dashboard">
      <div className="page-header"><h1>آراء العملاء</h1><p>إدارة آراء وشهادات العملاء</p></div>
      <div className="page-toolbar">
        <button className="btn-primary" onClick={openCreate}>+ إضافة رأي</button>
      </div>

      <div className="dash-section">
        <div className="table-wrap">
          {loading ? <div className="spinner" /> : items.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">💬</div><p>لا توجد آراء بعد</p></div>
          ) : (
            <table className="admin-table">
              <thead><tr><th>الاسم</th><th>المنصب</th><th>يوتيوب</th><th>الترتيب</th><th>إجراء</th></tr></thead>
              <tbody>
                {items.map(t => (
                  <tr key={t._id}>
                    <td><span style={{ marginLeft: 8, fontSize: '1.2rem' }}>{t.avatar}</span>{t.name}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t.role}</td>
                    <td>{t.youtubeId ? <span style={{ color: 'var(--accent)' }}>✓</span> : '—'}</td>
                    <td>{t.order}</td>
                    <td><div style={{ display: 'flex', gap: 8 }}>
                      <button className="action-btn edit" onClick={() => openEdit(t)}>تعديل</button>
                      <button className="action-btn delete" onClick={() => handleDelete(t._id)}>حذف</button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModal(null)}>✕</button>
            <h3>{modal === 'create' ? 'إضافة رأي' : 'تعديل الرأي'}</h3>
            <div className="admin-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}>
                <div className="form-group"><label>الاسم</label>
                  <input value={form.name} onChange={e => f('name', e.target.value)} /></div>
                <div className="form-group"><label>الأفاتار</label>
                  <input value={form.avatar} onChange={e => f('avatar', e.target.value)} style={{ width: 70 }} placeholder="أ" /></div>
              </div>
              <div className="form-group"><label>المنصب / الشركة</label>
                <input value={form.role} onChange={e => f('role', e.target.value)} /></div>
              <div className="form-group"><label>معرّف فيديو يوتيوب (اختياري)</label>
                <input value={form.youtubeId} onChange={e => f('youtubeId', e.target.value)} placeholder="مثال: dQw4w9WgXcQ" dir="ltr" /></div>
              <div className="form-group"><label>نص الرأي (اختياري)</label>
                <textarea rows={3} value={form.text} onChange={e => f('text', e.target.value)} /></div>
              <div className="form-group"><label>الترتيب</label>
                <input type="number" value={form.order} onChange={e => f('order', Number(e.target.value))} /></div>
            </div>
            <div className="modal-actions">
              <button className="action-btn edit" style={{ padding: '10px 24px' }} onClick={handleSave} disabled={saving}>
                {saving ? 'حفظ...' : 'حفظ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
