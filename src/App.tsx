import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Hero />
      <Portfolio />
      <Pricing />
      <HowItWorks />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;