import React from 'react';
import { useSite } from '../context/SiteContext';
import { MessageSquare, ArrowRight } from 'lucide-react';
import './CtaSection.css';

interface CtaSectionProps {
  onOpenQuoteModal: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenQuoteModal: _ }) => {
  const { settings } = useSite();
  const wa = settings?.contact?.whatsapp?.replace(/\D/g, '') || '5581973119512';
  const waUrl = `https://wa.me/${wa}?text=${encodeURIComponent(
    'Olá! Quero fechar meu projeto agora. Quais informações você precisa para começarmos?'
  )}`;

  return (
    <section id="cta" className="cta-section" aria-label="Chamada Final">
      <div className="container">
        <div className="cta-inner">

          {/* Aurora */}
          <div className="cta-aurora" aria-hidden="true" />

          <div className="cta-content">
            <p className="cta-eyebrow">Pronto para começar?</p>
            <h2 className="cta-title">
              Vamos montar o projeto<br />
              <span className="cta-title-grad">ideal para o seu negócio</span>
            </h2>
            <p className="cta-desc">
              Me chame no WhatsApp agora. Sem formulário, sem burocracia.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa btn-lg cta-btn"
              id="cta-wa-btn"
            >
              <MessageSquare size={20} />
              <span>Falar Agora no WhatsApp</span>
              <ArrowRight size={18} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
