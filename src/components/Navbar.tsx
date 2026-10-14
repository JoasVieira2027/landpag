import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Menu, X, MessageSquare, ArrowRight } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
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
          <div className="navbar-logo-symbol">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 4C5 2.89543 5.89543 2 7 2H21C22.1046 2 23 2.89543 23 4V9C23 10.1046 22.1046 11 21 11H13V15H19C20.1046 15 21 15.8954 21 17V19C21 20.1046 20.1046 21 19 21H13V24C13 25.1046 12.1046 26 11 26H7C5.89543 26 5 25.1046 5 24V4Z" fill="#1D4ED8"/>
              <path d="M13 11H21V11C22.1046 11 23 11.8954 23 13V14C23 15.1046 22.1046 16 21 16H13V11Z" fill="#3B82F6"/>
            </svg>
          </div>
          <div className="navbar-brand-text-col">
            <span className="navbar-logo-text">Fluxo Web</span>
            <span className="navbar-logo-tagline">Sites que geram resultados</span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="navbar-links" aria-label="Navegação principal">
          <a href="#hero" className="navbar-link active">Início</a>
          <a href="#services" className="navbar-link">Serviços</a>
          <a href="#portfolio" className="navbar-link">Portfólio</a>
          <a href="#plans" className="navbar-link">Planos</a>
          <a href="#cta" className="navbar-link">Contato</a>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Quote Modal Pill Button */}
          <button
            type="button"
            className="btn-nav-quote"
            onClick={onOpenQuoteModal}
            id="nav-quote-button"
          >
            <MessageSquare size={16} />
            <span>Solicitar Orçamento</span>
          </button>

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
          <a href="#services" className="mobile-nav-link" onClick={closeMenu}>
            Serviços
          </a>
          <a href="#portfolio" className="mobile-nav-link" onClick={closeMenu}>
            Portfólio
          </a>
          <a href="#plans" className="mobile-nav-link" onClick={closeMenu}>
            Planos & Preços
          </a>
          <a href="#cta" className="mobile-nav-link" onClick={closeMenu}>
            Contato
          </a>

          <div className="mobile-nav-actions">
            <button
              type="button"
              className="btn-nav-quote btn-full"
              onClick={() => {
                closeMenu();
                onOpenQuoteModal();
              }}
            >
              <MessageSquare size={16} />
              <span>Solicitar Orçamento</span>
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nav-whatsapp btn-full"
              onClick={closeMenu}
            >
              <span>Falar no WhatsApp</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
