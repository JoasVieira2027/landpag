import React from 'react';
import { useSite } from '../context/SiteContext';
import {
  Sparkles,
  Palette,
  Smartphone,
  Zap,
  ShieldCheck,
  Sliders,
  Link2,
  Code2,
  ArrowRight
} from 'lucide-react';
import './Differentials.css';

interface DifferentialsProps {
  onOpenQuoteModal: () => void;
}

const renderDiffIcon = (iconName: string) => {
  const props = { size: 22, strokeWidth: 1.8 };
  switch (iconName) {
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'Palette':
      return <Palette {...props} />;
    case 'Smartphone':
      return <Smartphone {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'ShieldCheck':
      return <ShieldCheck {...props} />;
    case 'Sliders':
      return <Sliders {...props} />;
    case 'Link2':
      return <Link2 {...props} />;
    case 'Code2':
      return <Code2 {...props} />;
    default:
      return <Sparkles {...props} />;
  }
};

export const Differentials: React.FC<DifferentialsProps> = ({ onOpenQuoteModal }) => {
  const { t, differentials } = useSite();

  const labels = {
    badge: {
      pt: 'Vantagens para seu Negócio',
      en: 'Business Advantages',
      es: 'Ventajas para su Negocio'
    },
    title: {
      pt: 'Por que criar o site do seu negócio com a gente',
      en: 'Why build your business website with us',
      es: 'Por qué crear el sitio de su negocio con nosotros'
    },
    subtitle: {
      pt: 'Unimos visual profissional e moderno com foco exclusivo em vendas, agendamentos e facilidade de contato para o cliente final.',
      en: 'We combine clean, authoritative design with a sharp focus on sales, bookings, and effortless customer contact.',
      es: 'Unimos diseño profesional con foco exclusivo en ventas, citas y facilidad de contacto para sus clientes.'
    },
    aiBannerBadge: {
      pt: 'Foco em Vendas & Conversão',
      en: 'Sales & Conversion Focus',
      es: 'Enfoque en Ventas'
    },
    aiBannerTitle: {
      pt: 'Seu cliente clica, escolhe o que precisa e fala direto com você no WhatsApp',
      en: 'Your customer clicks, selects what they need, and chats directly via WhatsApp',
      es: 'Su cliente elige lo que necesita y conversa directo con usted por WhatsApp'
    },
    aiBannerDesc: {
      pt: 'Criamos páginas pensadas para a rotina real de comércio e serviços. Botões confortáveis, cardápios ou catálogos fáceis de navegar no celular e integração direta com o seu WhatsApp. Tudo desenvolvido com ferramentas modernas para garantir entrega rápida e visual profissional.',
      en: 'Websites engineered for real-world businesses: comfortable touch buttons, mobile-friendly catalogs, and direct WhatsApp connectivity.',
      es: 'Páginas diseñadas para la dinámica real de comercios y servicios: botones cómodos, catálogos ágiles y conexión directa a WhatsApp.'
    },
    ctaBtn: {
      pt: 'Solicitar Orçamento sem Compromisso',
      en: 'Request a Free Quote',
      es: 'Solicitar Presupuesto'
    }
  };

  return (
    <section id="differentials" className="section" aria-label="Nossos Diferenciais">
      <div className="container">
        <header className="section-header">
          <div className="section-badge">
            <span>{t(labels.badge)}</span>
          </div>
          <h2 className="section-title">{t(labels.title)}</h2>
          <p className="section-subtitle">{t(labels.subtitle)}</p>
        </header>

        <div className="differentials-grid">
          {differentials.map((item) => (
            <article key={item.id} className="diff-card">
              <div className="diff-icon-box">
                {renderDiffIcon(item.iconName)}
              </div>
              <h3 className="diff-card-title">{t(item.title)}</h3>
              <p className="diff-card-desc">{t(item.desc)}</p>
            </article>
          ))}
        </div>

        {/* AI Philosophy Banner */}
        <div className="ai-engineering-banner">
          <div className="ai-banner-content">
            <div className="ai-banner-badge">
              <Code2 size={16} />
              <span>{t(labels.aiBannerBadge)}</span>
            </div>
            <h3 className="ai-banner-title">{t(labels.aiBannerTitle)}</h3>
            <p className="ai-banner-desc">{t(labels.aiBannerDesc)}</p>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onOpenQuoteModal}
            >
              <span>{t(labels.ctaBtn)}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
