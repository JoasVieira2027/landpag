import React from 'react';
import { useSite } from '../context/SiteContext';
import './Process.css';

export const Process: React.FC = () => {
  const { t, processSteps } = useSite();

  const labels = {
    badge: {
      pt: 'Fluxo Transparente',
      en: 'Transparent Workflow',
      es: 'Flujo Transparente'
    },
    title: {
      pt: 'Do conceito à publicação em 6 etapas claras',
      en: 'From concept to production in 6 structured steps',
      es: 'Del concepto a la publicación en 6 pasos estructurados'
    },
    subtitle: {
      pt: 'Um processo ágil e previsível, sem surpresas no cronograma e com validação contínua em cada marco do projeto.',
      en: 'An agile, predictable roadmap with zero timeline surprises and continuous validation at every milestone.',
      es: 'Un proceso ágil y predecible, sin sorpresas en el cronograma y con validación constante en cada hito.'
    }
  };

  return (
    <section id="process" className="section" aria-label="Nosso Processo de Trabalho">
      <div className="container">
        <header className="section-header">
          <div className="section-badge">
            <span>{t(labels.badge)}</span>
          </div>
          <h2 className="section-title">{t(labels.title)}</h2>
          <p className="section-subtitle">{t(labels.subtitle)}</p>
        </header>

        <div className="process-timeline">
          {processSteps.map((step) => (
            <article key={step.stepNumber} className="process-step-card">
              <div className="process-step-header">
                <span className="process-step-number">0{step.stepNumber}</span>
                {step.duration && (
                  <span className="process-step-duration">{t(step.duration)}</span>
                )}
              </div>
              <h3 className="process-step-title">{t(step.title)}</h3>
              <p className="process-step-desc">{t(step.desc)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
