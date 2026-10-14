import React from 'react';
import { useSite } from '../context/SiteContext';
import './Footer.css';

export const Footer: React.FC = () => {
  const { settings, setIsAdminOpen } = useSite();

  const handleAdminTrigger = () => {
    const now = Date.now();
    const lastClicks = (window as any).__footerClicks || [];
    const recentClicks = [...lastClicks.filter((t: number) => now - t < 1200), now];
    (window as any).__footerClicks = recentClicks;
    if (recentClicks.length >= 3) {
      (window as any).__footerClicks = [];
      setIsAdminOpen(true);
    }
  };

  return (
    <footer className="footer-agency">
      <div className="container footer-agency-container">
        {/* Left: Copyright */}
        <div className="footer-agency-copy">
          <span onClick={handleAdminTrigger} style={{ cursor: 'default' }}>
            © {new Date().getFullYear()} Fluxo Web. Todos os direitos reservados.
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="footer-agency-nav" aria-label="Navegação do rodapé">
          <a href="#hero" className="footer-nav-item">Início</a>
          <a href="#services" className="footer-nav-item">Serviços</a>
          <a href="#portfolio" className="footer-nav-item">Portfólio</a>
          <a href="#plans" className="footer-nav-item">Planos</a>
          <a href="#cta" className="footer-nav-item">Contato</a>
        </nav>

        {/* Right: Social Icons */}
        <div className="footer-agency-socials">
          <a
            href={settings?.contact?.instagram || 'https://instagram.com/fluxoweb'}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            aria-label="Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          <a
            href={settings?.contact?.linkedin || 'https://linkedin.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
