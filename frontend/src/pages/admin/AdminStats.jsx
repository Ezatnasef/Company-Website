import React, { useEffect, useState } from 'react';
import API from '../../utils/api';
import './AdminDashboard.css';

const AdminStats = () => {
  const [form, setForm] = useState({ workHours: 0, coffeeCups: 0, projects: 0, yearsExperience: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    API.get('/stats')
      .then(({ data }) => { if (data.data) setForm({ workHours: data.data.workHours, coffeeCups: data.data.coffeeCups, projects: data.data.projects, yearsExperience: data.data.yearsExperience }); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMsg(null);
    try {
      await API.put('/stats', form);
      setMsg({ type: 'success', text: 'تم حفظ الإحصائيات بنجاح!' });
    } catch {
      setMsg({ type: 'error', text: 'حدث خطأ أثناء الحفظ' });
    }
    setSaving(false);
  };

  const f = (field, val) => setForm(p => ({ ...p, [field]: Number(val) }));

  const fields = [
    { key: 'projects', label: 'عدد المشاريع المنفّذة', icon: '📁' },
    { key: 'workHours', label: 'ساعات العمل', icon: '⏱️' },
    { key: 'coffeeCups', label: 'أكواب القهوة', icon: '☕' },
    { key: 'yearsExperience', label: 'سنوات الخبرة', icon: '🏆' },
  ];

  return (
    <div className="dashboard">
      <div className="page-header"><h1>الإحصائيات</h1><p>تحديث إحصائيات الموقع الرئيسية</p></div>

      {loading ? <div className="spinner" /> : (
        <div className="dash-section" style={{ maxWidth: 600 }}>
          <div style={{ padding: '28px 24px' }}>
            <div className="admin-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {fields.map(field => (
                  <div className="form-group" key={field.key}>
                    <label>{field.icon} {field.label}</label>
                    <input
                      type="number"
                      value={form[field.key]}
                      onChange={e => f(field.key, e.target.value)}
                      min={0}
                    />
                  </div>
                ))}
              </div>

              {msg && (
                <div className={`form-msg ${msg.type}`} style={{
                  padding: '10px 14px', borderRadius: 10, fontSize: '0.9rem',
                  fontWeight: 600, textAlign: 'center', marginBottom: 16,
                  background: msg.type === 'success' ? 'rgba(0,229,195,0.1)' : 'rgba(255,80,80,0.1)',
                  border: `1px solid ${msg.type === 'success' ? 'rgba(0,229,195,0.3)' : 'rgba(255,80,80,0.3)'}`,
                  color: msg.type === 'success' ? 'var(--accent)' : '#ff8080',
                }}>
                  {msg.text}
                </div>
              )}

              <button className="btn-primary" style={{ width: '100%' }} onClick={handleSave} disabled={saving}>
                {saving ? 'جارٍ الحفظ...' : 'حفظ الإحصائيات'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStats;
