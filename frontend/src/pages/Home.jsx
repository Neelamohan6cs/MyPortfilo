import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Gallery from '../components/Gallery/Gallery';

import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import Internships from '../components/Internships/Internships';
import Education from '../components/Education/Education';
import Certifications from '../components/Certifications/Certifications';
import Workshops from '../components/Workshops/Workshops';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

import Loading from './Loading';
import Tools from '../components/tools/Tools';

export default function Home() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/portfolio/')
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [data]);

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Hero           data={data?.hero} />
      <Gallery />
      
      <Skills         data={data?.skills          || []} />
      <Tools/>
      <Projects       data={data?.projects         || []} />
      <Internships    data={data?.internships       || []} />
      <Education      data={data?.education         || []} />
      <Certifications data={data?.certifications    || []} />
      <Workshops      data={data?.workshops         || []} />
      <Contact        hero={data?.hero} />
      <Footer         hero={data?.hero} />
    </>
  );
}
