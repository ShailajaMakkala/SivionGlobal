import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center outline-none">
            <Logo className="h-10 max-w-[200px]" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 border border-white/10 bg-white/5 backdrop-blur-md rounded-full px-2 py-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${location.pathname === link.path ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <Link
              to="/get-quote"
              className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white bg-blue-600 rounded-full group hover:bg-glow-blue transition-all duration-300"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-sky-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="relative">Start Project</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-white/10"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${location.pathname === link.path ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/get-quote"
                onClick={() => setIsOpen(false)}
                className="block mt-6 text-center bg-gradient-to-r from-blue-600 to-sky-500 text-white px-4 py-3 rounded-xl text-base font-bold shadow-[0_0_20px_rgba(0,216,255,0.4)]"
              >
                Start Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
