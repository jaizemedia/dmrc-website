// components/SplashScreen.tsx
'use client';


import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 2000); // 2 seconds
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <img
        src="images/Church Logo (1).png" // Update this to your actual logo path
        alt="Disciple Makers Revival Church Logo"
        className="h-24 w-24 animate-spin-slow"
      />
    </div>
  );
};

export default SplashScreen;
