import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="relative bg-[#0B0F19] text-slate-300 pt-24 pb-8 border-t border-white/10 overflow-hidden">

      {/* Background flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          <div className="lg:pr-8">
            <Link to="/" className="inline-block mb-6 outline-none">
              <Logo className="h-12 max-w-[220px]" />
            </Link>
            <p className="text-sm leading-relaxed mb-8 font-light text-slate-400">
              Architecting the future through precision engineering, cutting-edge technology, and data-driven digital strategies. Elevate your corporate presence today.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, url: "https://www.facebook.com/share/1KwngJLX9b/?mibextid=wwXIfr" },
                { Icon: Twitter, url: "https://x.com/sivionglobal?s=21" },
                { Icon: Linkedin, url: "https://www.linkedin.com/company/sivionglobaltechnologies/" },
                { Icon: Instagram, url: "https://www.instagram.com/sivionglobaltechnologies?igsh=MWEzaHJnbndjdmo3dQ%3D%3D&utm_source=qr" }
              ].map(({ Icon, url }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,216,255,0.3)]">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4">
              {['About', 'Services', 'Portfolio', 'Careers', 'Blog'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-slate-400 hover:text-sky-400 transition-colors inline-block text-sm font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 tracking-wide">Expertise</h4>
            <ul className="space-y-4">
              <li><Link to="/services/web-development" className="text-slate-400 hover:text-sky-400 transition-colors text-sm font-medium">Web Development</Link></li>
              <li><Link to="/services/java-fullstack" className="text-slate-400 hover:text-sky-400 transition-colors text-sm font-medium">Enterprise Java</Link></li>
              <li><Link to="/services/digital-marketing" className="text-slate-400 hover:text-sky-400 transition-colors text-sm font-medium">Digital Marketing</Link></li>
              <li><Link to="/services/seo" className="text-slate-400 hover:text-sky-400 transition-colors text-sm font-medium">SEO & Analytics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 tracking-wide">Headquarters</h4>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm text-slate-400 font-light leading-relaxed">3d Floor, Advant Towers, Plot No 4<br /> Rd No 7, Kakatiya Hills, Madhapur<br /> Hyderabad, Telangana-500081</span>
              </li>
              <li className="flex items-center group">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 shrink-0 group-hover:border-sky-400/50 transition-colors">
                  <Phone className="w-4 h-4 text-sky-400" />
                </div>
                <span className="text-sm font-medium text-slate-300">+91 9581136661<br /> +91 9581136662</span>
              </li>
              <li className="flex items-center group">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 shrink-0 group-hover:border-blue-400/50 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-slate-300">Hr@sivionglobaltechnologies.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-semibold tracking-wider text-slate-500 uppercase">
          <p>&copy; {new Date().getFullYear()} SiviOn Global Technologies. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors hover:glow">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors hover:glow">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
