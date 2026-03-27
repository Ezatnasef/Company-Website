import React from 'react';
import Hero from '../components/Hero/Hero';
import Clients from '../components/Clients/Clients';
import Services from '../components/Services/Services';
import About from '../components/About/About';
import Projects from '../components/Projects/Projects';
import Testimonials from '../components/Testimonials/Testimonials';
import Features from '../components/Features/Features';
import Process from '../components/Process/Process';
import Contact from '../components/Contact/Contact';

const Home = () => {
  return (
    <main>
      <Hero />
      <Clients />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <Features />
      <Process />
      <Contact />
    </main>
  );
};

export default Home;
