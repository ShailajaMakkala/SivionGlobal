import React from 'react';

const Logo = ({ className = "h-14" }) => (
  <div className={`flex items-center ${className}`}>
    <img
      src="/logo.png"
      alt="SiviOn Global Technologies"
      className="h-full w-auto object-contain transform hover:scale-105 transition-transform duration-300 rounded-md"
    />
  </div>
);

export default Logo;
