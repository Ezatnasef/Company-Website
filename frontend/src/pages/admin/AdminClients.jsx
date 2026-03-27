// AdminClients.jsx
import React, { useEffect, useState, useCallback } from 'react';
import API from '../../utils/api';
import './AdminDashboard.css';

export const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', order: 0 });
  const [saving, setSaving] = useState(false);

  const fetch = useCallback(() => {
    setLoading(true);
    API.get('/clients').then(({ data }) => setClients(data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal === 'create') await API.post('/clients', form);
      else await API.put(`/clients/${modal.id}`, form);
      fetch(); setModal(null);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('حذف هذا العميل؟')) return;
    await API.delete(`/clients/${id}`); fetch();
  };

  return (
    <div className="dashboard">
      <div className="page-header"><h1>العملاء</h1><p>إدارة شريط لوجوهات العملاء</p></div>
      <div className="page-toolbar">
        <button className="btn-primary" onClick={() => { setForm({ name: '', order: 0 }); setModal('create'); }}>+ إضافة عميل</button>
      </div>
      <div className="dash-section">
        <div className="table-wrap">
          {loading ? <div className="spinner" /> : clients.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">🏢</div><p>لا توجد عملاء</p></div>
          ) : (
            <table className="admin-table">
              <thead><tr><th>اسم العميل</th><th>الترتيب</th><th>إجراء</th></tr></thead>
              <tbody>
                {clients.map(c => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.order}</td>
                    <td><div style={{ display: 'flex', gap: 8 }}>
                      <button className="action-btn edit" onClick={() => { setForm({ name: c.name, order: c.order }); setModal({ type: 'edit', id: c._id }); }}>تعديل</button>
                      <button className="action-btn delete" onClick={() => handleDelete(c._id)}>حذف</button>
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
            <h3>{modal === 'create' ? 'إضافة عميل' : 'تعديل العميل'}</h3>
            <div className="admin-form">
              <div className="form-group"><label>اسم العميل</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
              <div className="form-group"><label>الترتيب</label>
                <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: Number(e.target.value) }))} /></div>
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

export default AdminClients;
