import React, { useEffect, useRef } from 'react';
import { Smartphone, Zap, Search, MessageSquare } from 'lucide-react';
import './SolutionBenefits.css';

const benefits = [
  {
    id: 1,
    icon: <Smartphone size={26} strokeWidth={1.8} />,
    title: '100% Responsivo',
    desc: 'Experiência impecável em iPhone, iPad e Desktop. Seu cliente navega perfeitamente em qualquer dispositivo.',
    tag: 'Mobile First',
  },
  {
    id: 2,
    icon: <Zap size={26} strokeWidth={1.8} />,
    title: 'Alta Velocidade',
    desc: 'Hospedagem otimizada via Vercel com CDN global. Carregamento ultrarrápido que melhora a experiência e o ranqueamento.',
    tag: 'Performance',
  },
  {
    id: 3,
    icon: <Search size={26} strokeWidth={1.8} />,
    title: 'SEO Estruturado',
    desc: 'Código limpo e semântico, meta tags configuradas, pronto para ser indexado e ranqueado pelo Google desde o primeiro dia.',
    tag: 'Google Ready',
  },
  {
    id: 4,
    icon: <MessageSquare size={26} strokeWidth={1.8} />,
    title: 'Integração WhatsApp',
    desc: 'Botões estrategicamente posicionados que direcionam seu cliente direto para uma conversa no WhatsApp — sem fricção.',
    tag: 'Conversão Direta',
  },
];

export const SolutionBenefits: React.FC = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="benefits" className="benefits-section" aria-label="Benefícios e Soluções">
      <div className="container">
        <header className="section-header">
          <div className="section-badge benefits-badge">
            <span>✅ Nossa Tecnologia</span>
          </div>
          <h2 className="section-title">
            A tecnologia perfeita para o seu crescimento
          </h2>
          <p className="section-subtitle">
            Cada detalhe foi pensado para converter visitantes em clientes reais.
          </p>
        </header>

        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div
              key={benefit.id}
              className="benefit-card fade-in-card"
              ref={(el) => { cardRefs.current[idx] = el; }}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="benefit-card-top">
                <div className="benefit-icon-wrap">
                  {benefit.icon}
                </div>
                <span className="benefit-tag">{benefit.tag}</span>
              </div>
              <h3 className="benefit-card-title">{benefit.title}</h3>
              <p className="benefit-card-desc">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
