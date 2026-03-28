import React, { useState, useEffect } from 'react';
import API from '../../../utils/api';

export default function HeroTab({ data, reload, flash }) {
  const [form,  setForm]  = useState({});
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((k) => { if (form[k] !== null && form[k] !== undefined) fd.append(k, form[k]); });
    if (photo) fd.append('photo', photo);
    await API.put('/admin/hero/', fd);
    flash('Hero section saved!');
    reload();
  };

  return (
    <div>
      <h2 className="tab-heading">Edit Hero Section</h2>
      <form className="admin-form" onSubmit={handleSave}>
        <div className="row-2">
          <div className="field">
            <label>Full Name</label>
            <input name="name" value={form.name || ''} onChange={onChange} />
          </div>
          <div className="field">
            <label>Title</label>
            <input name="title" value={form.title || ''} onChange={onChange} />
          </div>
        </div>
        <div className="field">
          <label>Bio</label>
          <textarea name="bio" rows={4} value={form.bio || ''} onChange={onChange} />
        </div>
        <div className="row-2">
          <div className="field">
            <label>Email</label>
            <input name="email" type="email" value={form.email || ''} onChange={onChange} />
          </div>
          <div className="field">
            <label>Phone</label>
            <input name="phone" value={form.phone || ''} onChange={onChange} />
          </div>
        </div>
        <div className="row-2">
          <div className="field">
            <label>GitHub URL</label>
            <input name="github" value={form.github || ''} onChange={onChange} />
          </div>
          <div className="field">
            <label>LinkedIn URL</label>
            <input name="linkedin" value={form.linkedin || ''} onChange={onChange} />
          </div>
        </div>
        <div className="field">
          <label>Profile Photo</label>
          <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
        </div>
        <button type="submit" className="btn-primary">Save Changes</button>
      </form>
    </div>
  );
}
