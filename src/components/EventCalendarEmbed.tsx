import React, { useEffect, useRef } from 'react';

function EventCalendarEmbed() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!document.querySelector('script[src*="elfsight.com/platform.js"]')) {
      const s = document.createElement('script');
      s.src = 'https://static.elfsight.com/platform/platform.js';
      s.async = true;
      document.body.appendChild(s);
    }

    if (!containerRef.current.querySelector('.elfsight-app-4883f7dd-efd5-4cef-95b5-895cd2330ed6')) {
      const d = document.createElement('div');
      d.className = 'elfsight-app-4883f7dd-efd5-4cef-95b5-895cd2330ed6';
      d.setAttribute('data-elfsight-app-lazy', '');
      containerRef.current.appendChild(d);
    }
  }, []);

  return <div ref={containerRef} />;
}

export default EventCalendarEmbed;
