import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import './WhatsAppFloat.css';

const WA_NUMBER_FALLBACK = '5581973119512';

export const WhatsAppFloat: React.FC = () => {
  const { settings } = useSite();
  const [visible, setVisible] = useState(false);

  const whatsapp = settings?.contact?.whatsapp
    ? settings.contact.whatsapp.replace(/\D/g, '')
    : WA_NUMBER_FALLBACK;

  const message = encodeURIComponent(
    'Olá! Vim pelo site da FluxoWeb e quero contratar um site/landing page. Como podemos começar?'
  );

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-float ${visible ? 'whatsapp-float--visible' : ''}`}
      aria-label="Falar no WhatsApp"
      id="whatsapp-float-btn"
      title="Falar no WhatsApp"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="whatsapp-float-icon"
        aria-hidden="true"
      >
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.696 4.61 1.898 6.487L4 29l7.742-1.873A11.952 11.952 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 21.9a9.853 9.853 0 01-5.023-1.37l-.358-.213-3.715.898.928-3.614-.233-.374A9.858 9.858 0 016.1 15c0-5.458 4.442-9.9 9.9-9.9 5.458 0 9.9 4.442 9.9 9.9 0 5.458-4.442 9.9-9.9 9.9zm5.44-7.416c-.298-.149-1.764-.87-2.037-.97-.273-.099-.47-.148-.668.149-.198.297-.768.97-.941 1.168-.173.198-.347.223-.645.074-.298-.149-1.258-.463-2.396-1.478-.885-.788-1.482-1.762-1.655-2.059-.173-.298-.018-.459.13-.607.134-.134.298-.348.447-.521.149-.174.198-.298.298-.497.099-.199.05-.373-.025-.521-.074-.149-.668-1.61-.916-2.205-.241-.579-.486-.5-.668-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.073.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      </svg>
      <span className="whatsapp-float-label">Falar no WhatsApp</span>
    </a>
  );
};
