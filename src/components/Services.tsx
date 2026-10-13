import React from 'react';
import { useSite } from '../context/SiteContext';
import {
  Building2,
  Target,
  ShoppingBag,
  Cpu,
  LayoutDashboard,
  Wrench,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import './Services.css';

interface ServicesProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

const renderServiceIcon = (iconName: string) => {
  const props = { size: 24, strokeWidth: 1.8 };
  switch (iconName) {
    case 'Building2':
      return <Building2 {...props} />;
    case 'Target':
      return <Target {...props} />;
    case 'ShoppingBag':
      return <ShoppingBag {...props} />;
    case 'Cpu':
      return <Cpu {...props} />;
    case 'LayoutDashboard':
      return <LayoutDashboard {...props} />;
    case 'Wrench':
      return <Wrench {...props} />;
    default:
      return <Building2 {...props} />;
  }
};

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForQuote }) => {
  const { t, services, language } = useSite();

  const labels = {
    badge: {
      pt: 'Soluções para Negócios',
      en: 'Business Solutions',
      es: 'Soluciones para Negocios'
    },
    title: {
      pt: 'Sites desenvolvidos sob medida para o seu tipo de negócio',
      en: 'Websites tailored specifically for your business model',
      es: 'Sitios desarrollados a la medida de su negocio'
    },
    subtitle: {
      pt: 'Seja para receber pedidos de açaí, organizar horários de barbearia, expor roupas ou apresentar sua empresa, criamos a ferramenta certa para você vender mais.',
      en: 'Whether taking food orders, booking barbershop appointments, showcasing boutique fashion, or corporate presence, we engineer the right solution.',
      es: 'Ya sea para pedidos de comida, turnos de barbería, catálogos de moda o presencia empresarial, creamos la herramienta ideal para sus ventas.'
    },
    popularBadge: {
      pt: 'Mais Pedido',
      en: 'Most Popular',
      es: 'Más Solicitado'
    },
    quoteBtn: {
      pt: 'Pedir Orçamento',
      en: 'Request Quote',
      es: 'Pedir Presupuesto'
    }
  };

  return (
    <section id="services" className="section section-secondary" aria-label="Nossos Serviços">
      <div className="container">
        <header className="section-header">
          <div className="section-badge">
            <span>{t(labels.badge)}</span>
          </div>
          <h2 className="section-title">{t(labels.title)}</h2>
          <p className="section-subtitle">{t(labels.subtitle)}</p>
        </header>

        <div className="services-grid">
          {services.map((service) => {
            const bulletList = service.bulletPoints?.[language] || service.bulletPoints?.pt || [];

            return (
              <article
                key={service.id}
                className={`service-card ${service.highlight ? 'highlighted' : ''}`}
              >
                {service.highlight && (
                  <div className="service-card-badge">
                    <span>{t(labels.popularBadge)}</span>
                  </div>
                )}

                <div className="service-icon-box">
                  {renderServiceIcon(service.iconName)}
                </div>

                <h3 className="service-card-title">{t(service.title)}</h3>
                <p className="service-card-desc">{t(service.shortDesc)}</p>

                {bulletList.length > 0 && (
                  <ul className="service-features-list">
                    {bulletList.map((bullet, idx) => (
                      <li key={idx} className="service-feature-item">
                        <CheckCircle2 size={16} className="service-feature-icon" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  type="button"
                  className="btn btn-secondary service-action-btn"
                  onClick={() => onSelectServiceForQuote(t(service.title))}
                >
                  <span>{t(labels.quoteBtn)}</span>
                  <ArrowRight size={15} />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
