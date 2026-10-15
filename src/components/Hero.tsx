import React, { useState } from 'react';
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

interface RealProjectTab {
  id: string;
  name: string;
  badge: string;
  url: string;
  image: string;
  liveUrl: string;
}

const REAL_PROJECT_TABS: RealProjectTab[] = [
  {
    id: 'acai',
    name: 'Açaí da Daiane',
    badge: 'Cardápio & Pedidos',
    url: 'acaidadaiane.vercel.app',
    image: '/projects/site-acai-real.png',
    liveUrl: 'https://acaidadaiane.vercel.app/',
  },
  {
    id: 'roupa',
    name: 'Fit Vibe Activewear',
    badge: 'Loja de Roupas',
    url: 'sitederoupa-6efo.vercel.app',
    image: '/projects/site-roupa-real.png',
    liveUrl: 'https://sitederoupa-6efo.vercel.app/',
  },
  {
    id: 'admin',
    name: 'Painel Admin',
    badge: 'Gestão da Loja',
    url: 'acaidadaiane.vercel.app/admin',
    image: '/projects/painel-admin-real.png',
    liveUrl: 'https://acaidadaiane.vercel.app/',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const [activeTab, setActiveTab] = useState<string>('acai');

  const currentProject =
    REAL_PROJECT_TABS.find((p) => p.id === activeTab) || REAL_PROJECT_TABS[0];

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

        {/* ── Right Column: Interactive Real Projects Showcase ── */}
        <div className="hero-visual">
          <div className="hero-showcase-card">
            {/* Project Tabs Selector */}
            <div className="hero-tabs-selector" role="tablist" aria-label="Projetos Reais">
              {REAL_PROJECT_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`hero-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="hero-tab-name">{tab.name}</span>
                  <span className="hero-tab-badge">{tab.badge}</span>
                </button>
              ))}
            </div>

            {/* Real Browser Frame */}
            <div className="hero-browser-window">
              <div className="hero-browser-header">
                <div className="browser-dots">
                  <span /><span /><span />
                </div>
                <div className="hero-browser-address-pill">
                  <span className="address-lock">🔒</span>
                  <span className="address-text">{currentProject.url}</span>
                </div>
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-browser-external-link"
                  title="Abrir site real no navegador"
                >
                  <span>Abrir no ar</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Real Project Screenshot Display */}
              <div className="hero-screenshot-viewport">
                <img
                  key={currentProject.id}
                  src={currentProject.image}
                  alt={`Screenshot real do projeto ${currentProject.name}`}
                  className="hero-real-screenshot"
                  loading="eager"
                />
              </div>

              {/* Bottom Real Case Bar */}
              <div className="hero-browser-footer">
                <div className="hero-footer-status">
                  <span className="status-live-dot" />
                  <strong>Caso Real:</strong>
                  <span>{currentProject.name}</span>
                </div>
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-footer-cta-link"
                >
                  <span>Ver site funcionando</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
