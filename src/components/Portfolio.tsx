import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import type { ProjectItem } from '../lib/types';
import { ExternalLink, X, ArrowRight, Monitor, Globe } from 'lucide-react';
import './Portfolio.css';

interface PortfolioProps {
  onOpenQuoteModal: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenQuoteModal }) => {
  const { t, projects } = useSite();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const getTagBadge = (proj: ProjectItem) => {
    if (proj.id === 'acai-daiane') return 'Açaiteria';
    if (proj.id === 'barbearia') return 'Barbearia';
    if (proj.id === 'fit-vibe-activewear') return 'Loja de Roupas';
    if (proj.category === 'pedidos') return 'Cardápios & Pedidos';
    if (proj.category === 'agendamentos') return 'Agendamentos';
    if (proj.category === 'lojas') return 'Loja & Catálogo';
    return 'Site Profissional';
  };

  const handleOpenModal = (project: ProjectItem) => {
    setSelectedProject(project);
    setIframeLoaded(false);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIframeLoaded(false);
  };

  return (
    <section id="portfolio" className="portfolio-section" aria-label="Portfólio de Projetos">
      <div className="container">
        {/* ── Portfolio Header ── */}
        <div className="portfolio-header">
          <div className="portfolio-header-text">
            <span className="portfolio-kicker">PORTFÓLIO</span>
            <h2 className="portfolio-title">
              Sites que criam experiências e{' '}
              <span className="portfolio-title-blue">vendas.</span>
            </h2>
            <p className="portfolio-subtitle">
              Confira alguns dos sites que já desenvolvemos para negócios como açaiterias,
              barbearias e lojas de roupas. Cada projeto é feito sob medida para a sua necessidade.
            </p>
          </div>

          <div className="portfolio-header-action">
            <a href="#plans" className="btn-portfolio-all">
              <span>Ver todos os projetos</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* ── 3 Project Cards Grid (Reference Style) ── */}
        <div className="portfolio-cards-grid">
          {projects.map((project) => (
            <article
              key={project.id}
              className="portfolio-agency-card"
              onClick={() => handleOpenModal(project)}
            >
              {/* Device Image Box */}
              <div className="portfolio-agency-media">
                <img
                  src={project.image}
                  alt={t(project.title)}
                  className="portfolio-agency-img"
                  loading="lazy"
                />
                <div className="portfolio-card-hover-overlay">
                  <span className="hover-view-btn">
                    <Monitor size={16} />
                    <span>Visualizar Projeto</span>
                  </span>
                </div>
              </div>

              {/* Card Meta & Details */}
              <div className="portfolio-agency-info">
                <div className="portfolio-agency-titles">
                  <h3 className="portfolio-agency-name">{t(project.title)}</h3>
                  <p className="portfolio-agency-desc">{t(project.shortDesc)}</p>
                </div>

                <div className="portfolio-agency-footer">
                  <span className="portfolio-tag-pill">{getTagBadge(project)}</span>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-live-link"
                      onClick={(e) => e.stopPropagation()}
                      title="Abrir site ao vivo"
                    >
                      <span>Abrir no ar</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── Modal for Live Preview & Details ── */}
      {selectedProject && (
        <div
          className="portfolio-modal-overlay"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Detalhes do projeto ${t(selectedProject.title)}`}
        >
          <div className="portfolio-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="portfolio-modal-header">
              <div className="portfolio-modal-header-info">
                <span className="portfolio-tag-pill" style={{ marginRight: '0.65rem' }}>
                  {getTagBadge(selectedProject)}
                </span>
                <strong className="portfolio-modal-title">
                  {t(selectedProject.title)}
                </strong>
              </div>
              <div className="portfolio-modal-header-actions">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-open-live-btn"
                  >
                    <ExternalLink size={14} />
                    <span>Abrir site ao vivo</span>
                  </a>
                )}
                <button
                  type="button"
                  className="portfolio-modal-close"
                  onClick={handleCloseModal}
                  aria-label="Fechar modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="portfolio-modal-body">
              {selectedProject.liveUrl ? (
                <div className="modal-live-preview-wrapper">
                  <div className="modal-browser-chrome">
                    <div className="modal-browser-bar">
                      <div className="browser-dots">
                        <span /><span /><span />
                      </div>
                      <div className="modal-browser-address">
                        <Globe size={13} />
                        <span>{selectedProject.liveUrl}</span>
                      </div>
                    </div>
                    <div className="modal-iframe-wrapper">
                      {!iframeLoaded && (
                        <div className="modal-iframe-loading">
                          <div className="iframe-spinner" />
                          <span>Carregando visualização ao vivo...</span>
                        </div>
                      )}
                      <iframe
                        src={selectedProject.liveUrl}
                        title={t(selectedProject.title)}
                        className={`modal-site-iframe ${iframeLoaded ? 'iframe-visible' : ''}`}
                        onLoad={() => setIframeLoaded(true)}
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={selectedProject.image}
                  alt={t(selectedProject.title)}
                  className="modal-project-img"
                />
              )}

              <p className="modal-project-desc">{t(selectedProject.shortDesc)}</p>

              {selectedProject.results && (
                <div className="modal-results-box">
                  <strong className="modal-results-label">Resultado comprovado:</strong>
                  <span className="modal-results-text">{t(selectedProject.results)}</span>
                </div>
              )}

              <div className="modal-cta-row">
                <button
                  type="button"
                  className="btn-hero-primary"
                  onClick={() => {
                    handleCloseModal();
                    onOpenQuoteModal();
                  }}
                >
                  <span>Quero um projeto como este</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  className="btn-hero-secondary"
                  onClick={handleCloseModal}
                >
                  <span>Fechar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
