import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Menu, X, MessageSquare, ArrowRight } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal: _ }) => {
  const { settings } = useSite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const wa = settings?.contact?.whatsapp?.replace(/\D/g, '') || '5581973119512';
  const waUrl = `https://wa.me/${wa}?text=${encodeURIComponent('Olá! Vim pelo site da FluxoWeb e quero fechar a criação do meu projeto.')}`;

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand */}
        <a href="#hero" className="navbar-brand">
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt={settings.brandName} style={{ height: '2rem' }} />
          ) : (
            <>
              <span className="navbar-logo-icon">FW</span>
              <span className="navbar-logo-text">{settings.brandName}</span>
            </>
          )}
        </a>

        {/* Desktop Links */}
        <nav className="navbar-links" aria-label="Navegação principal">
          <a href="#hero" className="navbar-link">Início</a>
          <a href="#plans" className="navbar-link">Planos</a>
          <a href="#cta" className="navbar-link">Contato</a>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* WhatsApp / Plan CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-violet btn-nav-cta"
            id="nav-cta-button"
          >
            <MessageSquare size={16} />
            <span>Falar no WhatsApp</span>
          </a>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <a href="#hero" className="mobile-nav-link" onClick={closeMenu}>
            Início
          </a>
          <a href="#plans" className="mobile-nav-link" onClick={closeMenu}>
            Planos & Valores
          </a>
          <a href="#cta" className="mobile-nav-link" onClick={closeMenu}>
            Contato
          </a>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-violet btn-lg"
            onClick={closeMenu}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <MessageSquare size={18} />
            <span>Falar no WhatsApp</span>
            <ArrowRight size={18} />
          </a>
        </div>
      )}
    </header>
  );
};
