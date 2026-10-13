import React, { useState, useEffect, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { CheckCircle2, ArrowRight, Zap, LayoutDashboard, ChevronDown, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import './Plans.css';

interface PlanDetailSection {
  title: string;
  items: string[];
}

interface Plan {
  id: string;
  icon: React.ReactNode;
  eyebrow: string;
  name: string;
  price: string;
  priceSub: string;
  features: string[];
  note: string;
  waMsg: string;
  cta: string;
  featured: boolean;
  detailedInfo: {
    prazo: string;
    destaque: string;
    sections: PlanDetailSection[];
  };
}

const PLANS: Plan[] = [
  {
    id: 'landing',
    icon: <Zap size={22} strokeWidth={1.8} />,
    eyebrow: 'Pagamento Único',
    name: 'Landing Page',
    price: 'Valor Único',
    priceSub: 'Sem mensalidade. Após a entrega, alterações futuras custam entre R$ 50 a R$ 100 conforme o ajuste.',
    features: [
      'Layout moderno focado em conversão',
      '100% responsivo (Mobile, iPad e Desktop)',
      'Botões de WhatsApp estratégicos',
      'Carregamento ultra rápido',
      'SEO configurado para buscas no Google',
      'Entrega rápida em até 7 dias úteis',
      'Alterações pós-entrega: R$ 50 a R$ 100 por ajuste',
    ],
    note: '⚠️ Após entrega e aprovação, qualquer alteração futura será cobrada à parte entre R$ 50 a R$ 100 dependendo da alteração.',
    waMsg: 'Olá! Quero contratar a Landing Page de Pagamento Único agora. Já estou ciente de que alterações pós-entrega custam entre R$ 50 a R$ 100 e quero iniciar o projeto!',
    cta: 'Contratar Landing Page',
    featured: false,
    detailedInfo: {
      prazo: 'Entrega em 5 a 7 dias úteis',
      destaque: 'Pagamento único sem mensalidade. Alterações futuras pós-entrega variam de R$ 50 a R$ 100 por ajuste.',
      sections: [
        {
          title: 'Regra de Alterações Pós-Entrega:',
          items: [
            'Pagamento 100% único: você não paga nenhuma mensalidade fixa',
            'Após a entrega oficial e aprovação do projeto, qualquer alteração futura será cobrada à parte entre R$ 50 a R$ 100 (dependendo da complexidade do ajuste)',
            'Pequenos ajustes (trocar telefone, atualizar preços, trocar foto): a partir de R$ 50',
            'Ajustes maiores ou novas seções: até R$ 100',
            'Se seu negócio precisa de alterações constantes todo mês, recomendamos o plano Site de Vendas (onde suporte e alterações mensais já estão inclusos)',
          ],
        },
        {
          title: 'O que está incluso:',
          items: [
            'Copywriting persuasivo focado em fechar vendas',
            'Design exclusivo e profissional (sem modelos genéricos)',
            'Botão flutuante inteligente de WhatsApp integrado',
            'Domínio personalizado configurado (.com.br ou .com)',
            'Hospedagem em nuvem de alta velocidade e segura inclusa',
            'Configuração de tags para Google e Meta Ads',
          ],
        },
        {
          title: 'Como funciona:',
          items: [
            '1. Você clica no botão e fechamos os detalhes no WhatsApp',
            '2. Você nos passa as informações do seu negócio',
            '3. Desenvolvemos o layout e você aprova antes de publicar',
            '4. Seu site é publicado e já fica pronto para vender',
          ],
        },
      ],
    },
  },
  {
    id: 'site',
    icon: <LayoutDashboard size={22} strokeWidth={1.8} />,
    eyebrow: 'Setup + Mensalidade',
    name: 'Site de Vendas',
    price: 'R$ 297',
    priceSub: 'Setup inicial + mensalidade com suporte e manutenção inclusos.',
    features: [
      'Site completo com painel administrativo',
      'Catálogo interativo de produtos ou serviços',
      'Pedidos e orçamentos direto no WhatsApp',
      'Painel intuitivo para você atualizar conteúdo',
      'Hospedagem rápida e suporte mensal contínuo',
      'Backups automáticos e atualizações inclusas',
    ],
    note: 'A mensalidade garante hospedagem, sistema, suporte e alterações.',
    waMsg: 'Olá! Quero contratar o Site de Vendas com Painel Administrativo (R$ 297 + mensalidade) agora. Já estou decidido e quero dar início hoje!',
    cta: 'Contratar Site de Vendas',
    featured: true,
    detailedInfo: {
      prazo: 'Entrega em 7 a 10 dias úteis',
      destaque: 'Tenha um painel para alterar fotos, preços e produtos a qualquer hora.',
      sections: [
        {
          title: 'O que está incluso no Setup e Mensalidade:',
          items: [
            'Criação completa do site com design premium sob medida',
            'Painel administrativo fácil de mexer pelo celular ou computador',
            'Catálogo com fotos, descrições, preços e botão de compra',
            'Hospedagem em servidor de alta performance inclusa na mensalidade',
            'Suporte prioritário via WhatsApp para tirar dúvidas a qualquer momento',
            'Pequenas alterações e manutenções periódicas inclusas',
            'Segurança reforçada com certificado SSL e backups regulares',
          ],
        },
        {
          title: 'Vantagens para o seu negócio:',
          items: [
            'Você não precisa pagar desenvolvedor toda vez que quiser mudar algo',
            'Seu cliente escolhe o que quer no site e já chega no seu WhatsApp pronto para pagar',
            'Profissionalismo total que passa confiança imediata aos clientes',
          ],
        },
      ],
    },
  },
];

export const Plans: React.FC = () => {
  const { settings } = useSite();
  const [expandedPlan, setExpandedPlan] = useState<Record<string, boolean>>({});
  const refs = useRef<(HTMLElement | null)[]>([]);

  const wa = settings?.contact?.whatsapp?.replace(/\D/g, '') || '5581973119512';

  const toggleDetails = (planId: string) => {
    setExpandedPlan(prev => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    refs.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="plans" className="plans-section" aria-label="Planos">
      <div className="container">

        {/* Section header */}
        <div className="plans-header reveal" ref={el => { refs.current[0] = el; }}>
          <div className="plans-eyebrow">
            <span className="plans-eyebrow-dot" />
            Planos e Valores
          </div>
          <h2 className="plans-title">
            Escolha o<br />
            <span className="plans-title-grad">plano certo</span> para você
          </h2>
          <p className="plans-subtitle">
            Sem burocracia ou termos difíceis. Escolha o seu plano e inicie seu projeto direto pelo WhatsApp.
          </p>
        </div>

        {/* Cards */}
        <div className="plans-grid">
          {PLANS.map((plan, i) => {
            const isExpanded = !!expandedPlan[plan.id];

            return (
              <article
                key={plan.id}
                className={`plan-card reveal ${plan.featured ? 'plan-card--feat' : ''}`}
                ref={el => { refs.current[i + 1] = el; }}
                style={{ transitionDelay: `${i * 0.14}s` }}
              >
                {plan.featured && (
                  <div className="plan-feat-badge">Mais Completo</div>
                )}

                {/* Top */}
                <div className="plan-top">
                  <div className="plan-icon">{plan.icon}</div>
                  <span className="plan-eyebrow">{plan.eyebrow}</span>
                </div>

                <h3 className="plan-name">{plan.name}</h3>

                {/* Price */}
                <div className="plan-price-block">
                  <span className="plan-price">{plan.price}</span>
                  <span className="plan-price-sub">{plan.priceSub}</span>
                </div>

                <div className="plan-sep" />

                {/* Features */}
                <ul className="plan-features">
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <CheckCircle2 size={15} className="plan-check" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <p className="plan-note">{plan.note}</p>

                {/* Expand / More Info Button */}
                <button
                  type="button"
                  className={`plan-more-info-btn ${isExpanded ? 'active' : ''}`}
                  onClick={() => toggleDetails(plan.id)}
                  aria-expanded={isExpanded}
                >
                  <Sparkles size={14} />
                  <span>{isExpanded ? 'Ocultar detalhes' : 'Mais informações e o que inclui'}</span>
                  <ChevronDown size={15} className={`chevron-icon ${isExpanded ? 'rotated' : ''}`} />
                </button>

                {/* Detailed Information Drawer */}
                {isExpanded && (
                  <div className="plan-details-box">
                    <div className="plan-details-meta">
                      <div className="plan-meta-pill">
                        <Clock size={13} />
                        <span>{plan.detailedInfo.prazo}</span>
                      </div>
                      <div className="plan-meta-pill">
                        <ShieldCheck size={13} />
                        <span>Garantia & Suporte</span>
                      </div>
                    </div>

                    <p className="plan-highlight-text">{plan.detailedInfo.destaque}</p>

                    {plan.detailedInfo.sections.map((sec, sIdx) => (
                      <div key={sIdx} className="plan-detail-group">
                        <h4 className="plan-detail-group-title">{sec.title}</h4>
                        <ul className="plan-detail-group-list">
                          {sec.items.map((item, itmIdx) => (
                            <li key={itmIdx}>
                              <span className="detail-dot" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Direct CTA */}
                <a
                  href={`https://wa.me/${wa}?text=${encodeURIComponent(plan.waMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`plan-cta ${plan.featured ? 'plan-cta--feat' : 'plan-cta--ghost'}`}
                  id={`plan-cta-${plan.id}`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight size={17} />
                </a>
              </article>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="plans-note reveal" ref={el => { refs.current[3] = el; }}>
          Dúvida rápida antes de fechar?{' '}
          <a
            href={`https://wa.me/${wa}?text=${encodeURIComponent('Olá! Tenho uma dúvida sobre os planos antes de contratar.')}`}
            target="_blank" rel="noopener noreferrer"
          >
            Tire suas dúvidas no WhatsApp →
          </a>
        </p>

      </div>
    </section>
  );
};
