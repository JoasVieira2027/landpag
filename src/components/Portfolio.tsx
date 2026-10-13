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
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const labels = {
    badge: {
      pt: 'Projetos Realizados',
      en: 'Delivered Projects',
      es: 'Proyectos Realizados'
    },
    title: {
      pt: 'Portfólio de projetos desenvolvidos',
      en: 'Portfolio of delivered projects',
      es: 'Portafolio de proyectos realizados'
    },
    subtitle: {
      pt: 'Cada site é desenvolvido sob medida para o negócio do cliente — com identidade visual, funcionalidades e velocidade pensadas para gerar resultados reais.',
      en: 'Every site is built specifically for the client\'s business — with custom design, features and speed aimed at real results.',
      es: 'Cada sitio es desarrollado a medida para el negocio del cliente — con diseño, funcionalidades y velocidad para generar resultados reales.'
    },
    filterAll: { pt: 'Todos os Projetos', en: 'All Projects', es: 'Todos los Proyectos' },
    filterPedidos: { pt: 'Cardápios & Pedidos', en: 'Menus & Orders', es: 'Menús y Pedidos' },
    filterAgendamentos: { pt: 'Agendamentos', en: 'Appointments', es: 'Turnos y Citas' },
    filterLojas: { pt: 'Lojas & Catálogos', en: 'Stores & Catalogs', es: 'Tiendas y Catálogos' },
    filterInstitucional: { pt: 'Institucional', en: 'Corporate', es: 'Institucional' },
    viewBtn: { pt: 'Ver Projeto', en: 'View Project', es: 'Ver Proyecto' },
    viewLive: { pt: 'Abrir site ao vivo', en: 'Open live site', es: 'Abrir sitio en vivo' },
    close: { pt: 'Fechar', en: 'Close', es: 'Cerrar' },
    resultsLabel: { pt: 'Resultado:', en: 'Result:', es: 'Resultado:' },
    requestSimilar: {
      pt: 'Quero um projeto como este',
      en: 'Request a similar project',
      es: 'Quiero un proyecto como este'
    },
    previewLabel: { pt: 'Visualização do site', en: 'Site preview', es: 'Vista previa del sitio' },
    loadingPreview: { pt: 'Carregando visualização...', en: 'Loading preview...', es: 'Cargando vista previa...' },
    technologies: { pt: 'Tecnologias & Recursos', en: 'Technologies & Features', es: 'Tecnologías y Funciones' }
  };

  const categories = [
    { key: 'all', label: labels.filterAll },
    { key: 'pedidos', label: labels.filterPedidos },
    { key: 'agendamentos', label: labels.filterAgendamentos },
    { key: 'lojas', label: labels.filterLojas },
    { key: 'institucional', label: labels.filterInstitucional }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'pedidos': return t(labels.filterPedidos);
      case 'agendamentos': return t(labels.filterAgendamentos);
      case 'lojas': return t(labels.filterLojas);
      case 'institucional': return t(labels.filterInstitucional);
      default: return cat;
    }
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
    <section id="portfolio" className="section section-secondary" aria-label="Portfólio de Projetos">
      <div className="container">
        <header className="section-header">
          <div className="section-badge">
            <span>{t(labels.badge)}</span>
          </div>
          <h2 className="section-title">{t(labels.title)}</h2>
          <p className="section-subtitle">{t(labels.subtitle)}</p>
        </header>

        {/* Filter Bar — only show if there are multiple categories in use */}
        {projects.length > 1 && (
          <div className="portfolio-filter-bar" role="tablist" aria-label="Filtro de categorias">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`portfolio-filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {t(cat.label)}
              </button>
            ))}
          </div>
        )}

        {/* Project Grid */}
        <div className={`portfolio-grid ${filteredProjects.length === 1 ? 'portfolio-grid--single' : ''}`}>
          {filteredProjects.map((project) => (
            <article key={project.id} className={`project-card ${project.featured ? 'project-card--featured' : ''}`}>
              {/* Thumbnail */}
              <div className="project-thumbnail-wrapper">
                {project.liveUrl ? (
                  <div className="project-browser-mockup">
                    <div className="browser-bar">
                      <div className="browser-dots">
                        <span /><span /><span />
                      </div>
                      <div className="browser-address">
                        <Globe size={11} />
                        <span>{project.liveUrl.replace('https://', '').replace('http://', '').split('/')[0]}</span>
                      </div>
                    </div>
                    <div className="browser-screen">
                      <img
                        src={project.image}
                        alt={t(project.title)}
                        className="project-thumbnail-img"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        className="browser-preview-overlay"
                        onClick={() => handleOpenModal(project)}
                        aria-label={`Abrir visualização de ${t(project.title)}`}
                      >
                        <Monitor size={20} />
                        <span>{t(labels.viewBtn)}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={project.image}
                      alt={t(project.title)}
                      className="project-thumbnail-img"
                      loading="lazy"
                    />
                    <span className="project-category-tag">
                      {getCategoryLabel(project.category)}
                    </span>
                  </>
                )}
              </div>

              <div className="project-content">
                <div className="project-meta">
                  <span className="project-category-pill">{getCategoryLabel(project.category)}</span>
                  {project.featured && (
                    <span className="project-featured-pill">Projeto em destaque</span>
                  )}
                </div>

                <h3 className="project-title">{t(project.title)}</h3>
                <p className="project-desc">{t(project.shortDesc)}</p>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="project-tech-tags">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}

                <div className="project-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleOpenModal(project)}
                  >
                    <Monitor size={14} />
                    <span>{t(labels.viewBtn)}</span>
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      title={t(labels.viewLive)}
                    >
                      <ExternalLink size={14} />
                      <span>{t(labels.viewLive)}</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Detail Modal with Live Preview */}
      {selectedProject && (
        <div
          className="portfolio-modal-overlay"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Detalhes do projeto ${t(selectedProject.title)}`}
        >
          <div className="portfolio-modal-box" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="portfolio-modal-header">
              <div className="portfolio-modal-header-info">
                <span className="project-category-pill" style={{ marginRight: '0.5rem' }}>
                  {getCategoryLabel(selectedProject.category)}
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
                    className="btn btn-outline btn-sm"
                    title={t(labels.viewLive)}
                  >
                    <ExternalLink size={14} />
                    <span className="modal-btn-label">{t(labels.viewLive)}</span>
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
              {/* Live iframe preview OR static image */}
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
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-browser-open-btn"
                        title="Abrir em nova aba"
                      >
                        <ExternalLink size={13} />
                      </a>
                    </div>
                    <div className="modal-iframe-wrapper">
                      {!iframeLoaded && (
                        <div className="modal-iframe-loading">
                          <div className="iframe-spinner" />
                          <span>{t(labels.loadingPreview)}</span>
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

              {/* Description */}
              <p className="modal-project-desc">{t(selectedProject.shortDesc)}</p>

              {/* Results */}
              {selectedProject.results && (
                <div className="modal-results-box">
                  <strong className="modal-results-label">{t(labels.resultsLabel)}</strong>
                  <span className="modal-results-text">{t(selectedProject.results)}</span>
                </div>
              )}

              {/* Technologies */}
              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div className="modal-tech-section">
                  <span className="modal-tech-label">{t(labels.technologies)}</span>
                  <div className="project-tech-tags" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="modal-cta-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    handleCloseModal();
                    onOpenQuoteModal();
                  }}
                >
                  <span>{t(labels.requestSimilar)}</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCloseModal}
                >
                  <span>{t(labels.close)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
