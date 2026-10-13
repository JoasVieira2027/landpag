import React, { useEffect, useRef } from 'react';
import { Smartphone, LayoutDashboard, MessageCircleOff } from 'lucide-react';
import './Problems.css';

const problems = [
  {
    id: 1,
    icon: <Smartphone size={28} strokeWidth={1.8} />,
    title: 'Sites que travam no celular',
    desc: 'Mais de 70% dos acessos são pelo smartphone. Um site lento ou quebrado no mobile faz o cliente sair em segundos — e nunca mais volta.',
  },
  {
    id: 2,
    icon: <LayoutDashboard size={28} strokeWidth={1.8} />,
    title: 'Páginas confusas, sem foco em conversão',
    desc: 'O visitante entra, não entende a oferta e vai embora. Sem hierarquia visual clara e sem CTA forte, o site vira apenas uma vitrine vazia.',
  },
  {
    id: 3,
    icon: <MessageCircleOff size={28} strokeWidth={1.8} />,
    title: 'Falta de canal direto de atendimento',
    desc: 'Formulários complicados e e-mails ignorados afastam o cliente. Sem conexão direta ao WhatsApp, você perde leads quentes na hora H.',
  },
];

export const Problems: React.FC = () => {
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
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="problems" className="problems-section" aria-label="Problemas comuns">
      <div className="container">
        <header className="section-header">
          <div className="section-badge problems-badge">
            <span>⚠️ A Realidade do Mercado</span>
          </div>
          <h2 className="section-title problems-title">
            Por que a maioria dos sites não traz resultados?
          </h2>
          <p className="section-subtitle">
            Erros técnicos e estratégicos silenciosos que custam clientes todo dia.
          </p>
        </header>

        <div className="problems-grid">
          {problems.map((problem, idx) => (
            <div
              key={problem.id}
              className="problem-card fade-in-card"
              ref={(el) => { cardRefs.current[idx] = el; }}
              style={{ transitionDelay: `${idx * 0.12}s` }}
            >
              <div className="problem-icon-wrap">
                {problem.icon}
              </div>
              <h3 className="problem-card-title">{problem.title}</h3>
              <p className="problem-card-desc">{problem.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
