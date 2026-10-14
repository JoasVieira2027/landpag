import React from 'react';
import { useSite } from '../context/SiteContext';
import './Footer.css';

export const Footer: React.FC = () => {
  const { setIsAdminOpen } = useSite();

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
      </div>
    </footer>
  );
};
