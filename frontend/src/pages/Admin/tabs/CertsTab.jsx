import React, { useState } from 'react';
import API from '../../../utils/api';

const EMPTY = { name: '', issuer: '', year: '' };

export default function CertsTab({ data, reload, flash }) {
  const [form,    setForm]    = useState(EMPTY);
  const [image,   setImage]   = useState(null);
  const [editing, setEditing] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const cancel   = () => { setEditing(null); setForm(EMPTY); setImage(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((k) => fd.append(k, form[k]));
    if (image) fd.append('image', image);
    if (editing) {
      await API.put(`/admin/certs/${editing}/`, fd);
      flash('Updated!');
    } else {
      await API.post('/admin/certs/', fd);
      flash('Added!');
    }
    cancel();
    reload();
  };

  const handleDelete = async (id) => {
    await API.delete(`/admin/certs/${id}/`);
    flash('Deleted');
    reload();
  };

  return (
    <div>
      <h2 className="tab-heading">{editing ? 'Edit Certification' : 'Add Certification'}</h2>
      <form className="admin-form" onSubmit={handleSave}>
        <div className="field"><label>Certificate Name</label><input name="name" value={form.name} required onChange={onChange} /></div>
        <div className="row-2">
          <div className="field"><label>Issuer</label><input name="issuer" value={form.issuer} onChange={onChange} /></div>
          <div className="field"><label>Year</label><input name="year" value={form.year} placeholder="2024" onChange={onChange} /></div>
        </div>
        <div className="field"><label>Certificate Image</label><input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} /></div>
        <div className="btn-row">
          <button type="submit" className="btn-primary">{editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" className="btn-outline" onClick={cancel}>Cancel</button>}
        </div>
      </form>
      <div className="items-list">
        {(data || []).map((cert) => (
          <div key={cert.id} className="list-row">
            <span className="list-name">{cert.name}</span>
            <span className="list-meta">{cert.issuer}</span>
            <div className="list-actions">
              <button className="btn-edit" onClick={() => { setEditing(cert.id); setForm({ name: cert.name, issuer: cert.issuer, year: cert.year }); }}>Edit</button>
              <button className="btn-del"  onClick={() => handleDelete(cert.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
