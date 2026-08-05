import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Technologies from './pages/Technologies';
import Portfolio from './pages/Portfolio';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import GetQuote from './pages/GetQuote';
import Booking from './pages/Booking';
import StaticPage from './pages/StaticPage';

// Admin Components
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import ManageContacts from './pages/admin/ManageContacts';
import ManageQuotes from './pages/admin/ManageQuotes';
import ManageCareers from './pages/admin/ManageCareers';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManagePortfolio from './pages/admin/ManagePortfolio';
import ManageConsultations from './pages/admin/ManageConsultations';

const NotFound = () => (
  <div className="flex-grow flex items-center justify-center p-8 bg-slate-50 min-h-[60vh]">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
      <p className="text-2xl text-slate-600 mb-8">Page Not Found</p>
      <a href="/" className="text-blue-600 font-medium hover:underline">Return Home</a>
    </div>
  </div>
);

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/privacy-policy" element={<StaticPage title="Privacy Policy" />} />
          <Route path="/terms" element={<StaticPage title="Terms of Service" />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="blogs" element={<ManageBlogs />} />
              <Route path="portfolio" element={<ManagePortfolio />} />
              <Route path="careers" element={<ManageCareers />} />
              <Route path="quotes" element={<ManageQuotes />} />
              <Route path="contacts" element={<ManageContacts />} />
              <Route path="consultations" element={<ManageConsultations />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
