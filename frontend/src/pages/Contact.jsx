import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import apiClient from '../api/apiClient';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await apiClient.post('/contact', formData);
      setStatus({ type: 'success', message: 'Message sent successfully. We will get back to you shortly!' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.error || 'Failed to send message.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - SiviOn Global Technologies</title>
        <meta name="description" content="Get in touch with SiviOn Global Technologies for your web and digital marketing needs." />
      </Helmet>

      <div className="bg-slate-900 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-slate-300">Let's discuss how we can help your business grow</p>
      </div>

      <section id="contact-info" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-50 p-3 rounded-xl mr-4">
                  <MapPin className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Office Address</h4>
                  <p className="text-slate-400 mt-1">Road No.7, Kakatiya Hills, Madhapur<br />Hyderabad, Telangana - 500081</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-50 p-3 rounded-xl mr-4">
                  <Phone className="text-teal-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Phone Number</h4>
                  <p className="text-slate-400 mt-1">+91 9581136661, +91 9581136662</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-50 p-3 rounded-xl mr-4">
                  <Mail className="text-indigo-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Email Address</h4>
                  <p className="text-slate-400 mt-1">Hr@sivionglobaltechnologies.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-50 p-3 rounded-xl mr-4">
                  <Clock className="text-amber-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Working Hours</h4>
                  <p className="text-slate-400 mt-1">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-10 h-64 rounded-xl overflow-hidden border border-slate-300">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1903.17974408291!2d78.3968744!3d17.4424998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x23e41b79ea8ac1c1%3A0x8a26da85874bf594!2ssivion%20global%20technologies!5e0!3m2!1sen!2sin!4v1774852045097!5m2!1sen!2sin" width="100%" height="100%" style={{border: '0'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>

            {status.message && (
              <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                <input required type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                <input required type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
                <textarea required rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors shadow-md disabled:opacity-70">
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* WhatsApp Floating Button Component would be implemented globally, but noting requirement here */}
    </>
  );
};

export default Contact;
