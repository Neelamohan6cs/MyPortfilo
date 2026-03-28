import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import HeroTab        from './tabs/HeroTab';
import SkillsTab      from './tabs/SkillsTab';
import ProjectsTab    from './tabs/ProjectsTab';
import InternshipsTab from './tabs/InternshipsTab';
import CertsTab       from './tabs/CertsTab';
import WorkshopsTab   from './tabs/WorkshopsTab';
import MessagesTab    from './tabs/MessagesTab';
import GalleryTab     from './tabs/GalleryTab';
import './AdminDashboard.css';

const TABS = ['Hero','Skills','Projects','Internships','Certifications','Workshops','Gallery','Messages'];

export default function AdminDashboard() {
  const { isAdmin, logout } = useAuth();
  const navigate            = useNavigate();
  const [tab,   setTab]     = useState('Hero');
  const [data,  setData]    = useState({});
  const [flash, setFlash]   = useState('');

  useEffect(() => { if (!isAdmin) navigate('/admin'); }, [isAdmin, navigate]);
  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    const [port, msgs, gallery] = await Promise.all([
      API.get('/portfolio/'),
      API.get('/admin/messages/'),
      API.get('/admin/gallery/'),
    ]);
    setData({ ...port.data, messages: msgs.data, gallery: gallery.data });
  };

  const showFlash = (msg) => { setFlash(msg); setTimeout(() => setFlash(''), 2800); };
  const handleLogout = () => { logout(); navigate('/'); };
  const unread = (data.messages || []).filter((m) => !m.is_read).length;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-brand">NR Admin</div>
        <nav className="sidebar-nav">
          {TABS.map((t) => (
            <button key={t} className={`sidebar-item ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t}
              {t === 'Messages' && unread > 0 && <span className="unread-dot">{unread}</span>}
            </button>
          ))}
        </nav>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="dash-content">
        {flash && <div className="flash">{flash}</div>}
        {tab === 'Hero'           && <HeroTab        data={data.hero}           reload={loadAll} flash={showFlash} />}
        {tab === 'Skills'         && <SkillsTab       data={data.skills}         reload={loadAll} flash={showFlash} />}
        {tab === 'Projects'       && <ProjectsTab     data={data.projects}       reload={loadAll} flash={showFlash} />}
        {tab === 'Internships'    && <InternshipsTab  data={data.internships}    reload={loadAll} flash={showFlash} />}
        {tab === 'Certifications' && <CertsTab        data={data.certifications} reload={loadAll} flash={showFlash} />}
        {tab === 'Workshops'      && <WorkshopsTab    data={data.workshops}      reload={loadAll} flash={showFlash} />}
        {tab === 'Gallery'        && <GalleryTab      data={data.gallery}        reload={loadAll} flash={showFlash} />}
        {tab === 'Messages'       && <MessagesTab     data={data.messages} />}
      </main>
    </div>
  );
}
