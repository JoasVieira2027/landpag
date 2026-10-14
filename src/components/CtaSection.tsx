import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import './CtaSection.css';

interface CtaSectionProps {
  onOpenQuoteModal: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="cta" className="cta-agency-section" aria-label="Chamada para Ação">
      <div className="container cta-agency-container">
        {/* ── Brand Block ── */}
        <div className="cta-agency-brand">
          <div className="cta-brand-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 4C5 2.89543 5.89543 2 7 2H21C22.1046 2 23 2.89543 23 4V9C23 10.1046 22.1046 11 21 11H13V15H19C20.1046 15 21 15.8954 21 17V19C21 20.1046 20.1046 21 19 21H13V24C13 25.1046 12.1046 26 11 26H7C5.89543 26 5 25.1046 5 24V4Z" fill="#3B82F6"/>
              <path d="M13 11H21V11C22.1046 11 23 11.8954 23 13V14C23 15.1046 22.1046 16 21 16H13V11Z" fill="#60A5FA"/>
            </svg>
            <div className="cta-brand-names">
              <span className="cta-brand-title">Fluxo Web</span>
              <span className="cta-brand-tagline">Sites que geram resultados</span>
            </div>
          </div>
        </div>

        {/* ── Center Message ── */}
        <div className="cta-agency-message">
          <h2 className="cta-agency-heading">
            Pronto para levar o seu negócio<br />
            para o próximo nível?
          </h2>
          <p className="cta-agency-subtext">
            Fale agora mesmo e solicite um orçamento sem compromisso.
          </p>
        </div>

        {/* ── Right Actions ── */}
        <div className="cta-agency-actions">
          <button
            type="button"
            className="btn-cta-quote-white"
            onClick={onOpenQuoteModal}
            id="cta-quote-btn"
          >
            <MessageSquare size={17} />
            <span>Solicitar Orçamento</span>
          </button>

          <a href="#portfolio" className="btn-cta-portfolio-link">
            <span>Ver projetos</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
