import React from 'react';

const Logo = ({ className = "h-14" }) => (
  <img
    src="/Sivion.png"
    alt="SiviOn Global Technologies"
    className={`${className} w-auto object-contain transform hover:scale-105 transition-transform duration-300`}
    style={{ background: 'transparent' }}
  />
);

export default Logo;
