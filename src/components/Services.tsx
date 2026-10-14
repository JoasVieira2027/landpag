import React from 'react';
import {
  Monitor,
  Store,
  ListOrdered,
  CalendarCheck,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import './Services.css';

interface ServicesProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

interface ServiceCardItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const STATIC_SERVICES: ServiceCardItem[] = [
  {
    id: 'landing-pages',
    icon: <Monitor size={24} strokeWidth={1.8} />,
    title: 'Landing Pages',
    desc: 'Páginas estratégicas para divulgar seu serviço ou produto.'
  },
  {
    id: 'sites-negocios',
    icon: <Store size={24} strokeWidth={1.8} />,
    title: 'Sites para Negócios',
    desc: 'Site completo para sua empresa, com todas as informações.'
  },
  {
    id: 'cardapios-digitais',
    icon: <ListOrdered size={24} strokeWidth={1.8} />,
    title: 'Cardápios Digitais',
    desc: 'Mostre seu cardápio e receba pedidos direto pelo WhatsApp.'
  },
  {
    id: 'agendamento-online',
    icon: <CalendarCheck size={24} strokeWidth={1.8} />,
    title: 'Agendamento Online',
    desc: 'Permita que seus clientes agendem serviços de forma simples.'
  },
  {
    id: 'catalogos-pedidos',
    icon: <MessageSquare size={24} strokeWidth={1.8} />,
    title: 'Catálogos e Pedidos',
    desc: 'Catálogo de produtos com pedidos direto pelo WhatsApp.'
  }
];

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForQuote }) => {
  return (
    <section id="services" className="services-section" aria-label="Nossos Serviços">
      <div className="container services-container">
        {/* ── Left Column: Section Header & CTA ── */}
        <div className="services-intro">
          <span className="services-kicker">SERVIÇOS</span>
          <h2 className="services-title">
            Soluções completas<br />
            para o seu negócio.
          </h2>
          <p className="services-subtitle">
            Criamos sites e ferramentas que facilitam o seu dia a dia e ajudam você a vender mais.
          </p>

          <button
            type="button"
            className="btn-services-quote"
            onClick={() => onSelectServiceForQuote('Geral')}
            id="services-cta-quote"
          >
            <span>Solicitar Orçamento</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* ── Right Column: 5 Service Cards Grid ── */}
        <div className="services-cards-grid">
          {STATIC_SERVICES.map((item) => (
            <div
              key={item.id}
              className="service-agency-card"
              onClick={() => onSelectServiceForQuote(item.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSelectServiceForQuote(item.title);
              }}
            >
              <div className="service-agency-icon-box">
                {item.icon}
              </div>

              <div className="service-agency-body">
                <h3 className="service-agency-title">{item.title}</h3>
                <p className="service-agency-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
