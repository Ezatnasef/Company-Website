import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { SiteProvider } from './context/SiteContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public layout
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollTop from './components/ScrollTop';

// Pages
import Home from './pages/Home';
import ServiceDetailPage from './pages/ServiceDetailPage';
import useReveal from './hooks/useReveal';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContacts from './pages/admin/AdminContacts';
import AdminProjects from './pages/admin/AdminProjects';
import AdminServices from './pages/admin/AdminServices';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminClients from './pages/admin/AdminClients';
import AdminStats from './pages/admin/AdminStats';

import './assets/styles/global.css';

const PublicLayout = ({ children }) => {
  useReveal();

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ScrollTop />
    </>
  );
};

function App() {
  return (
    <SiteProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/services/:slug" element={<PublicLayout><ServiceDetailPage /></PublicLayout>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="stats" element={<AdminStats />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </SiteProvider>
  );
}

export default App;
