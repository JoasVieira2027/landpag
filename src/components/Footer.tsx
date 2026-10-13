import React from 'react';
import { useSite } from '../context/SiteContext';
import { MessageSquare, ArrowUpRight } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  const { settings, setIsAdminOpen } = useSite();

  const wa = settings?.contact?.whatsapp?.replace(/\D/g, '') || '5581973119512';
  const waUrl = `https://wa.me/${wa}?text=${encodeURIComponent('Olá! Vim pelo site da FluxoWeb e quero fechar um projeto de alta conversão.')}`;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-brand-title">
              <span className="navbar-logo-icon">FW</span>
              <span className="navbar-logo-text">{settings.brandName}</span>
            </div>
            <p className="footer-tagline">
              Criação de Landing Pages e Sites de Vendas de alta conversão. Foco em velocidade, estética premium e vendas no WhatsApp.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-group">
            <h4 className="footer-col-title">Navegação</h4>
            <ul className="footer-links-list">
              <li><a href="#hero" className="footer-link">Início</a></li>
              <li><a href="#plans" className="footer-link">Planos e Valores</a></li>
              <li><a href="#cta" className="footer-link">Começar Projeto</a></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="footer-links-group">
            <h4 className="footer-col-title">Contato Direto</h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-link-wa"
                >
                  <MessageSquare size={15} />
                  <span>{settings.contact.whatsapp || 'WhatsApp'}</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
              {settings.contact.email && (
                <li>
                  <a href={`mailto:${settings.contact.email}`} className="footer-link">
                    {settings.contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <span
            className="footer-copy"
            onClick={() => {
              const now = Date.now();
              const lastClicks = (window as any).__footerClicks || [];
              const recentClicks = [...lastClicks.filter((t: number) => now - t < 1200), now];
              (window as any).__footerClicks = recentClicks;
              if (recentClicks.length >= 3) {
                (window as any).__footerClicks = [];
                setIsAdminOpen(true);
              }
            }}
            title=""
          >
            © {new Date().getFullYear()} {settings.brandName}. Todos os direitos reservados.
          </span>

          <div className="footer-badge-tag">
            <span>Desenvolvido com Alta Performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
