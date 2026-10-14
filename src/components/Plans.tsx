import React from 'react';
import { useSite } from '../context/SiteContext';
import { CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import './Plans.css';

interface PlansProps {
  onOpenQuoteModal?: () => void;
}

interface PlanItem {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  price: string;
  period: string;
  features: string[];
  featured: boolean;
  waMsg: string;
  ctaText: string;
}

const AGENCY_PLANS: PlanItem[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    tagline: 'Site de alta conversão',
    price: 'R$ 297',
    period: 'Valor único',
    features: [
      'Página moderna e responsiva',
      'Botão para WhatsApp',
      'Formulário de contato',
      'Painel de edição'
    ],
    featured: false,
    waMsg: 'Olá! Quero contratar o plano Landing Page de R$ 297 (valor único) para o meu negócio.',
    ctaText: 'Escolher Landing Page'
  },
  {
    id: 'site-institucional',
    name: 'Site Institucional',
    tagline: 'Para negócios em geral',
    badge: 'Mais escolhido',
    price: 'R$ 1.400',
    period: 'Valor único',
    features: [
      'Todas as funcionalidades do plano anterior',
      'Páginas adicionais',
      'Catálogo de produtos',
      'Integração com WhatsApp'
    ],
    featured: true,
    waMsg: 'Olá! Quero contratar o plano Site Institucional de R$ 1.400 (valor único) para a minha empresa.',
    ctaText: 'Escolher Site Institucional'
  },
  {
    id: 'manutencao',
    name: 'Manutenção',
    tagline: 'Para manter seu site sempre online',
    price: 'R$ 140',
    period: 'Por mês',
    features: [
      'Atualizações e segurança',
      'Suporte e ajustes',
      'Hospedagem e domínio',
      'Tudo funcionando sem preocupações'
    ],
    featured: false,
    waMsg: 'Olá! Quero saber mais sobre o plano de Manutenção de R$ 140/mês para manter meu site seguro.',
    ctaText: 'Escolher Manutenção'
  }
];

export const Plans: React.FC<PlansProps> = ({ onOpenQuoteModal }) => {
  const { settings } = useSite();
  const wa = settings?.contact?.whatsapp?.replace(/\D/g, '') || '5581973119512';

  const getWaLink = (msg: string) => `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`;

  return (
    <section id="plans" className="plans-section" aria-label="Investimento e Planos">
      <div className="container plans-container">
        {/* ── Left Column: Intro ── */}
        <div className="plans-intro">
          <span className="plans-kicker">INVESTIMENTO</span>
          <h2 className="plans-title">
            Planos que cabem<br />
            no seu momento.
          </h2>
          <p className="plans-subtitle">
            Escolha a opção ideal para o seu projeto e comece hoje mesmo a ter um site profissional.
          </p>

          <button
            type="button"
            className="btn-plans-quote"
            onClick={onOpenQuoteModal}
            id="plans-cta-quote"
          >
            <span>Solicitar Orçamento</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* ── Right Column: 3 Pricing Cards ── */}
        <div className="plans-cards-grid">
          {AGENCY_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`plan-agency-card ${plan.featured ? 'plan-featured' : ''}`}
            >
              {plan.badge && (
                <div className="plan-badge-pill">
                  <span>{plan.badge}</span>
                </div>
              )}

              <div className="plan-agency-header">
                <h3 className="plan-agency-name">{plan.name}</h3>
                <p className="plan-agency-tagline">{plan.tagline}</p>

                <div className="plan-agency-price-block">
                  <span className="plan-agency-price">{plan.price}</span>
                  <span className="plan-agency-period">{plan.period}</span>
                </div>
              </div>

              <ul className="plan-features-list">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="plan-feature-row">
                    <CheckCircle2 size={16} className="plan-feature-check" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="plan-agency-action">
                <a
                  href={getWaLink(plan.waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-plan-action ${plan.featured ? 'btn-plan-featured' : ''}`}
                >
                  <MessageSquare size={16} />
                  <span>{plan.ctaText}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
