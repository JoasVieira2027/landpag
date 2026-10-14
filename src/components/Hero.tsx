import React from 'react';
import {
  ArrowRight,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  Zap,
  Sliders,
} from 'lucide-react';
import './Hero.css';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {

  return (
    <section id="hero" className="hero-section" aria-label="Início">
      <div className="container hero-container">
        {/* ── Left Column: Value Proposition & Actions ── */}
        <div className="hero-content">
          {/* Tag / Eyebrow */}
          <div className="hero-kicker">
            <span>CRIAÇÃO DE SITES PROFISSIONAIS</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-headline">
            Seu negócio online,<br />
            com <span className="hero-headline-highlight">mais resultados.</span>
          </h1>

          {/* Subtitle description */}
          <p className="hero-description">
            Desenvolvemos sites modernos, rápidos e personalizados para o seu negócio.
            Tenha mais visibilidade, atraia novos clientes e facilite suas vendas.
          </p>

          {/* CTAs */}
          <div className="hero-action-buttons">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={onOpenQuoteModal}
              id="hero-cta-quote"
            >
              <MessageSquare size={18} />
              <span>Solicitar Orçamento</span>
            </button>

            <a href="#portfolio" className="btn-hero-secondary" id="hero-cta-portfolio">
              <span>Ver Projetos</span>
              <ArrowRight size={17} className="btn-arrow" />
            </a>
          </div>

          {/* Value Props Row */}
          <div className="hero-features-row">
            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <ShieldCheck size={20} strokeWidth={2} />
              </div>
              <div className="hero-feature-text">
                <strong>Site responsivo</strong>
                <span>(em todos os dispositivos)</span>
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <Zap size={20} strokeWidth={2} />
              </div>
              <div className="hero-feature-text">
                <strong>Carregamento rápido</strong>
                <span>e seguro</span>
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <Sliders size={20} strokeWidth={2} />
              </div>
              <div className="hero-feature-text">
                <strong>Painel administrativo</strong>
                <span>(fácil de usar)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Device Showcase Graphic ── */}
        <div className="hero-visual">
          <div className="hero-mockup-wrapper">
            <img
              src="/showcase/hero-devices.jpg"
              alt="Sites profissionais em múltiplos dispositivos criados pela Fluxo Web"
              className="hero-mockup-image"
              loading="eager"
            />

            {/* Floating Live Badge */}
            <div className="hero-floating-badge">
              <span className="floating-badge-dot" />
              <span className="floating-badge-label">Projetos reais em produção</span>
              <a
                href="https://acaidadaiane.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-badge-link"
                title="Testar site real ao vivo"
              >
                <span>Ver online</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
