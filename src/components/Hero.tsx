import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import {
  ArrowRight,
  MessageSquare,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';
import './Hero.css';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

type DeviceMode = 'desktop' | 'ipad' | 'mobile';

interface DeviceInfo {
  id: DeviceMode;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  imageSrc: string;
  aspectClass: string;
  badge: string;
  features: string[];
}

const DEVICES: DeviceInfo[] = [
  {
    id: 'desktop',
    label: 'Desktop (Computador)',
    sublabel: 'Visão Ampla & Painel Lateral',
    icon: <Monitor size={17} />,
    imageSrc: '/showcase/desktop.png',
    aspectClass: 'frame--desktop',
    badge: '1ª Imagem: Desktop',
    features: [
      'Navegação ampla com carrinho lateral em tempo real',
      'Grid de produtos com busca rápida e categorias',
      'Layout executivo de altíssimo impacto visual',
    ],
  },
  {
    id: 'ipad',
    label: 'iPad (Tablet)',
    sublabel: 'Layout Adaptável por Toque',
    icon: <Tablet size={17} />,
    imageSrc: '/showcase/ipad.png',
    aspectClass: 'frame--ipad',
    badge: '2ª Imagem: iPad / Tablet',
    features: [
      'Perfeitamente ajustado para telas médias e iPads',
      'Interação suave por toque com produtos em duas colunas',
      'Banner dinâmico e menu responsivo fluido',
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile (Smartphone)',
    sublabel: 'Experiência Estilo App',
    icon: <Smartphone size={17} />,
    imageSrc: '/showcase/mobile.png',
    aspectClass: 'frame--mobile',
    badge: '3ª Imagem: Mobile (Celular)',
    features: [
      'Menu inferior fixo estilo aplicativo nativo (PWA)',
      'Otimizado para navegação rápida apenas com o polegar',
      'Envio de pedidos instantâneo direto no WhatsApp',
    ],
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal: _ }) => {
  const { settings } = useSite();
  const [activeDevice, setActiveDevice] = useState<DeviceMode>('desktop');
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');

  const wa = settings?.contact?.whatsapp?.replace(/\D/g, '') || '5581973119512';
  const waUrl = `https://wa.me/${wa}?text=${encodeURIComponent(
    'Olá! Quero criar meu site/landing page de alta conversão. Já quero fechar e iniciar o projeto!'
  )}`;

  const currentDevice = DEVICES.find((d) => d.id === activeDevice) || DEVICES[0];

  return (
    <section id="hero" className="hero" aria-label="Início">

      {/* Aurora glow background */}
      <div className="hero-aurora" aria-hidden="true">
        <div className="hero-aurora-orb hero-aurora-orb--1" />
        <div className="hero-aurora-orb hero-aurora-orb--2" />
        <div className="hero-aurora-orb hero-aurora-orb--3" />
      </div>

      {/* Grid texture overlay */}
      <div className="hero-grid" aria-hidden="true" />

      <div className="container">
        <div className="hero-inner">

          {/* Badge */}
          <div className="hero-badge reveal">
            <span className="hero-badge-dot" />
            <span>Sites & Landing Pages de Alta Performance</span>
          </div>

          {/* Title */}
          <h1 className="hero-title reveal">
            Seu negócio<br />
            <span className="hero-title-grad">vendendo todo dia</span><br />
            na internet.
          </h1>

          {/* Subtitle - Universal Responsiveness */}
          <p className="hero-sub reveal">
            Sites e Landing Pages que convertem — 100% responsivos para{' '}
            <strong>Mobile, iPad, Tablet e Desktop</strong>.
            <br className="hero-sub-br" />
            Desenvolvidos para carregar instantaneamente em qualquer tela e fechar vendas no WhatsApp.
          </p>

          {/* CTAs */}
          <div className="hero-ctas reveal">
            <a href="#plans" className="btn btn-violet btn-lg" id="hero-cta-plans">
              <span>Ver Planos & Valores</span>
              <ArrowRight size={18} />
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-lg"
              id="hero-cta-wa"
            >
              <MessageSquare size={18} />
              <span>Falar no WhatsApp</span>
            </a>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              PROVA REAL MULTI-DISPOSITIVO: Açaí da Daiane
              Organização impecável: Desktop → iPad → Mobile
              ═══════════════════════════════════════════════════════════ */}
          <div className="hero-proof-section reveal">

            {/* Header com Tag de Prova Real */}
            <div className="proof-header-block">
              <div className="hero-proof-tag">
                <span className="proof-pulse-dot" />
                <span>CASO REAL NO AR • CLIENTE FATURANDO ONLINE</span>
              </div>
              <h2 className="proof-main-title">
                Veja o mesmo site adaptado perfeitamente para{' '}
                <span className="hero-title-grad">cada tamanho de tela</span>
              </h2>
              <p className="proof-main-desc">
                Projeto real em produção: <strong>Açaí da Daiane</strong> (Olinda / Recife - PE).
                Sem distorções, com carregamento instantâneo em qualquer aparelho.
              </p>
            </div>

            {/* Seletor de Dispositivos e Modo de Visualização */}
            <div className="device-control-bar">
              <div className="device-tabs" role="tablist" aria-label="Seletor de tela">
                {DEVICES.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    role="tab"
                    aria-selected={viewMode === 'single' && activeDevice === d.id}
                    className={`device-tab-btn ${
                      viewMode === 'single' && activeDevice === d.id ? 'active' : ''
                    }`}
                    onClick={() => {
                      setViewMode('single');
                      setActiveDevice(d.id);
                    }}
                  >
                    <span className="tab-icon">{d.icon}</span>
                    <span className="tab-label">{d.label}</span>
                  </button>
                ))}
              </div>

              {/* Botão Ver Todos Lado a Lado */}
              <button
                type="button"
                className={`all-devices-toggle ${viewMode === 'all' ? 'active' : ''}`}
                onClick={() => setViewMode(viewMode === 'all' ? 'single' : 'all')}
                title="Comparar todos os 3 dispositivos lado a lado"
              >
                <Layers size={15} />
                <span>{viewMode === 'all' ? 'Modo Individual' : 'Ver Todos Juntos'}</span>
              </button>
            </div>

            {/* ── MODO 1: VISUALIZAÇÃO INDIVIDUAL FOCADA ── */}
            {viewMode === 'single' && (
              <div className="single-device-showcase">

                {/* Moldura do Dispositivo com Neon Border Beam */}
                <div className={`showcase-frame ${currentDevice.aspectClass}`}>
                  <div className="hero-border-beam" />

                  {/* Barra Superior do Navegador */}
                  <div className="frame-top-bar">
                    <div className="mac-dots">
                      <span /><span /><span />
                    </div>
                    <div className="browser-url-pill">
                      <span className="url-lock">🔒</span>
                      <span className="url-text">acaidadaiane.vercel.app</span>
                      <span className="url-badge">ONLINE</span>
                    </div>
                    <a
                      href="https://acaidadaiane.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="browser-visit-btn"
                      title="Testar site real no seu navegador"
                    >
                      <span>Abrir no Ar</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  {/* Conteúdo da Imagem Real */}
                  <div className="frame-image-wrapper">
                    <img
                      src={currentDevice.imageSrc}
                      alt={`Visualização ${currentDevice.label} do Açaí da Daiane`}
                      className="showcase-real-image"
                      loading="eager"
                    />
                  </div>

                  {/* Barra de Status Inferior */}
                  <div className="frame-bottom-bar">
                    <span className="frame-pill-indicator">
                      <Sparkles size={13} />
                      {currentDevice.badge}
                    </span>
                    <span className="frame-device-hint">
                      100% responsivo • Toque ou role para navegar
                    </span>
                  </div>
                </div>

                {/* Cartão de Destaques da Tela Atual */}
                <div className="device-features-panel">
                  <div className="device-features-header">
                    <div className="device-badge-active">
                      {currentDevice.icon}
                      <strong>{currentDevice.label}</strong>
                    </div>
                    <span className="device-sublabel-tag">{currentDevice.sublabel}</span>
                  </div>

                  <ul className="device-features-list">
                    {currentDevice.features.map((feat, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} className="feature-check" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="device-features-footer">
                    <a
                      href="https://acaidadaiane.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-live-link"
                    >
                      <span>Testar este site real funcionando agora</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

              </div>
            )}

            {/* ── MODO 2: VISÃO COMPARATIVA (TODOS OS 3 LADO A LADO) ── */}
            {viewMode === 'all' && (
              <div className="all-devices-grid">
                {DEVICES.map((d, index) => (
                  <div key={d.id} className="grid-device-card">
                    <div className="grid-device-header">
                      <span className="grid-device-num">0{index + 1}</span>
                      <div className="grid-device-title-wrap">
                        <strong className="grid-device-name">{d.label}</strong>
                        <span className="grid-device-sub">{d.sublabel}</span>
                      </div>
                    </div>

                    <div className={`grid-image-frame ${d.aspectClass}`}>
                      <img
                        src={d.imageSrc}
                        alt={`Captura real ${d.label}`}
                        className="grid-real-image"
                      />
                    </div>

                    <ul className="grid-device-bullets">
                      {d.features.map((item, fIdx) => (
                        <li key={fIdx}>
                          <CheckCircle2 size={14} className="feature-check" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Rodapé da Prova Real com Link Oficial */}
            <div className="proof-bottom-summary">
              <p>
                Gostaria de ter um site ou cardápio digital como o do <strong>Açaí da Daiane</strong> para o seu negócio?
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-violet btn-sm"
              >
                <span>Quero um Site Assim para Meu Negócio</span>
                <ArrowRight size={16} />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
