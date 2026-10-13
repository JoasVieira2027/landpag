import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import {
  X,
  Lock,
  LogOut,
  Save,
  CheckCircle2,
  Settings,
  Sparkles,
  Layers,
  Briefcase,
  Sliders,
  FolderKanban,
  GitBranch,
  PhoneCall,
  Search,
  Database,
  Users,
  Plus,
  Trash2,
  Edit2,
  RefreshCw
} from 'lucide-react';
import { isSupabaseConfigured, saveSupabaseCredentials } from '../../lib/supabase';
import type { ProjectItem, ServiceItem, DifferentialItem } from '../../lib/types';
import './AdminModal.css';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    settings,
    updateSettings,
    services,
    updateServices,
    differentials,
    updateDifferentials,
    projects,
    updateProjects,
    processSteps,
    updateProcessSteps,
    leads,
    updateLeadStatus,
    resetToDefaults,
    syncWithSupabase,
    isSyncing
  } = useSite();

  const [activeTab, setActiveTab] = useState<string>('geral');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Editable local state copies for tabs
  const [localSettings, setLocalSettings] = useState(settings);
  const [supabaseUrl, setSupabaseUrl] = useState(() => localStorage.getItem('webjoas_supabase_url') || '');
  const [supabaseKey, setSupabaseKey] = useState(() => localStorage.getItem('webjoas_supabase_key') || '');
  const [supabaseStatusMsg, setSupabaseStatusMsg] = useState('');

  if (!isAdminOpen) return null;

  const showSuccessNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = await adminLogin(passwordInput);
    if (!res.success) {
      setLoginError(res.error || 'Senha incorreta.');
    } else {
      setPasswordInput('');
    }
  };

  const handleSaveSettings = async () => {
    await updateSettings(localSettings);
    showSuccessNotification('Configurações salvas e aplicadas com sucesso!');
  };

  const handleSaveSupabaseConfig = async () => {
    saveSupabaseCredentials(supabaseUrl, supabaseKey);
    const result = await syncWithSupabase();
    setSupabaseStatusMsg(result.message);
  };

  // Render Login Screen if not authenticated
  if (!isAdminLoggedIn) {
    return (
      <div className="admin-overlay" onClick={() => setIsAdminOpen(false)}>
        <div className="admin-window" style={{ maxWidth: '480px', height: 'auto' }} onClick={(e) => e.stopPropagation()}>
          <div className="admin-topbar">
            <div className="admin-topbar-title">
              <Lock size={20} />
              <span>Acesso Administrativo</span>
            </div>
            <button
              type="button"
              className="portfolio-modal-close"
              onClick={() => setIsAdminOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ padding: '2rem' }}>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Painel protegido para gerenciamento de conteúdo, projetos, leads e configurações gerais do site.
            </p>

            {loginError && (
              <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#991B1B',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                marginBottom: '1.25rem'
              }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="admin-form-group">
                <label className="admin-label">Senha de Administrador</label>
                <input
                  type="password"
                  className="form-input"
                  required
                  placeholder="Digite a senha (padrão: admin123)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoFocus
                />
                <p className="admin-help-text">Senha mestra inicial: <strong>admin123</strong></p>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <Lock size={16} />
                <span>Entrar no Painel</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-overlay" onClick={() => setIsAdminOpen(false)}>
      <div className="admin-window" onClick={(e) => e.stopPropagation()}>
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="admin-topbar-title">
            <Settings size={20} />
            <span>Painel Administrativo - FluxoWeb</span>
            <span className="admin-status-tag">
              {isSupabaseConfigured() ? 'Supabase Conectado' : 'Modo Local / Cache'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={adminLogout}
              title="Encerrar sessão administrativa"
            >
              <LogOut size={15} />
              <span>Sair</span>
            </button>

            <button
              type="button"
              className="portfolio-modal-close"
              onClick={() => setIsAdminOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Main Body */}
        <div className="admin-main-layout">
          {/* Navigation Sidebar */}
          <aside className="admin-sidebar">
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'geral' ? 'active' : ''}`}
              onClick={() => setActiveTab('geral')}
            >
              <Settings size={17} />
              <span>Geral & Marca</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
              onClick={() => setActiveTab('hero')}
            >
              <Sparkles size={17} />
              <span>Hero Principal</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'secoes' ? 'active' : ''}`}
              onClick={() => setActiveTab('secoes')}
            >
              <Layers size={17} />
              <span>Seções & Ordem</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'servicos' ? 'active' : ''}`}
              onClick={() => setActiveTab('servicos')}
            >
              <Briefcase size={17} />
              <span>Serviços ({services.length})</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'diferenciais' ? 'active' : ''}`}
              onClick={() => setActiveTab('diferenciais')}
            >
              <Sliders size={17} />
              <span>Diferenciais ({differentials.length})</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'projetos' ? 'active' : ''}`}
              onClick={() => setActiveTab('projetos')}
            >
              <FolderKanban size={17} />
              <span>Portfólio ({projects.length})</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'processo' ? 'active' : ''}`}
              onClick={() => setActiveTab('processo')}
            >
              <GitBranch size={17} />
              <span>Processo ({processSteps.length} etapas)</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'contato' ? 'active' : ''}`}
              onClick={() => setActiveTab('contato')}
            >
              <PhoneCall size={17} />
              <span>Contato & Redes</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'seo' ? 'active' : ''}`}
              onClick={() => setActiveTab('seo')}
            >
              <Search size={17} />
              <span>SEO & Meta Tags</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'leads' ? 'active' : ''}`}
              onClick={() => setActiveTab('leads')}
            >
              <Users size={17} />
              <span>Leads Recebidos</span>
              {leads.length > 0 && <span className="admin-badge-count">{leads.length}</span>}
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'supabase' ? 'active' : ''}`}
              onClick={() => setActiveTab('supabase')}
            >
              <Database size={17} />
              <span>Supabase & Banco</span>
            </button>
          </aside>

          {/* Content Area */}
          <main className="admin-content-area">
            {saveSuccessMsg && (
              <div style={{
                padding: '0.85rem 1.25rem',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#065F46',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                fontSize: '0.9rem'
              }}>
                <CheckCircle2 size={18} />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            {/* TAB: GERAL & MARCA */}
            {activeTab === 'geral' && (
              <div>
                <div className="admin-section-heading">
                  <div>
                    <h3>Configurações Gerais e Identidade</h3>
                    <p className="admin-help-text">Altere nome da marca, slogan multilíngue e logotipo</p>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleSaveSettings}>
                    <Save size={16} />
                    <span>Salvar Alterações</span>
                  </button>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Nome da Marca / Agência</label>
                  <input
                    type="text"
                    className="form-input"
                    value={localSettings.brandName}
                    onChange={(e) => setLocalSettings({ ...localSettings, brandName: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">URL da Imagem da Logo (Opcional - deixe vazio para monograma padrão)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="https://exemplo.com/sua-logo.svg ou caminho local"
                    value={localSettings.logoUrl || ''}
                    onChange={(e) => setLocalSettings({ ...localSettings, logoUrl: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Slogan Institucional (Multilíngue)</label>
                  <div className="admin-i18n-grid">
                    <div>
                      <span className="admin-label" style={{ fontSize: '0.75rem' }}>Português (PT)</span>
                      <input
                        type="text"
                        className="form-input"
                        value={localSettings.tagline.pt}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          tagline: { ...localSettings.tagline, pt: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <span className="admin-label" style={{ fontSize: '0.75rem' }}>Inglês (EN)</span>
                      <input
                        type="text"
                        className="form-input"
                        value={localSettings.tagline.en}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          tagline: { ...localSettings.tagline, en: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <span className="admin-label" style={{ fontSize: '0.75rem' }}>Espanhol (ES)</span>
                      <input
                        type="text"
                        className="form-input"
                        value={localSettings.tagline.es}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          tagline: { ...localSettings.tagline, es: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: HERO */}
            {activeTab === 'hero' && (
              <div>
                <div className="admin-section-heading">
                  <div>
                    <h3>Personalização da Seção Hero</h3>
                    <p className="admin-help-text">Edite textos de impacto, subtítulos e chamadas para ação em cada idioma</p>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleSaveSettings}>
                    <Save size={16} />
                    <span>Salvar Alterações</span>
                  </button>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Título Principal (Headline de Alto Impacto)</label>
                  <div className="admin-i18n-grid">
                    <div>
                      <span className="admin-label" style={{ fontSize: '0.75rem' }}>Português</span>
                      <textarea
                        className="form-textarea"
                        rows={3}
                        value={localSettings.hero.title.pt}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          hero: {
                            ...localSettings.hero,
                            title: { ...localSettings.hero.title, pt: e.target.value }
                          }
                        })}
                      />
                    </div>
                    <div>
                      <span className="admin-label" style={{ fontSize: '0.75rem' }}>Inglês</span>
                      <textarea
                        className="form-textarea"
                        rows={3}
                        value={localSettings.hero.title.en}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          hero: {
                            ...localSettings.hero,
                            title: { ...localSettings.hero.title, en: e.target.value }
                          }
                        })}
                      />
                    </div>
                    <div>
                      <span className="admin-label" style={{ fontSize: '0.75rem' }}>Espanhol</span>
                      <textarea
                        className="form-textarea"
                        rows={3}
                        value={localSettings.hero.title.es}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          hero: {
                            ...localSettings.hero,
                            title: { ...localSettings.hero.title, es: e.target.value }
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Subtítulo / Explicação da Hero</label>
                  <div className="admin-i18n-grid">
                    <div>
                      <span className="admin-label" style={{ fontSize: '0.75rem' }}>Português</span>
                      <textarea
                        className="form-textarea"
                        rows={4}
                        value={localSettings.hero.subtitle.pt}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          hero: {
                            ...localSettings.hero,
                            subtitle: { ...localSettings.hero.subtitle, pt: e.target.value }
                          }
                        })}
                      />
                    </div>
                    <div>
                      <span className="admin-label" style={{ fontSize: '0.75rem' }}>Inglês</span>
                      <textarea
                        className="form-textarea"
                        rows={4}
                        value={localSettings.hero.subtitle.en}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          hero: {
                            ...localSettings.hero,
                            subtitle: { ...localSettings.hero.subtitle, en: e.target.value }
                          }
                        })}
                      />
                    </div>
                    <div>
                      <span className="admin-label" style={{ fontSize: '0.75rem' }}>Espanhol</span>
                      <textarea
                        className="form-textarea"
                        rows={4}
                        value={localSettings.hero.subtitle.es}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          hero: {
                            ...localSettings.hero,
                            subtitle: { ...localSettings.hero.subtitle, es: e.target.value }
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Texto do Botão Principal (CTA 1)</label>
                  <div className="admin-i18n-grid">
                    <div>
                      <input
                        type="text"
                        className="form-input"
                        value={localSettings.hero.primaryCtaText.pt}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          hero: {
                            ...localSettings.hero,
                            primaryCtaText: { ...localSettings.hero.primaryCtaText, pt: e.target.value }
                          }
                        })}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="form-input"
                        value={localSettings.hero.primaryCtaText.en}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          hero: {
                            ...localSettings.hero,
                            primaryCtaText: { ...localSettings.hero.primaryCtaText, en: e.target.value }
                          }
                        })}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="form-input"
                        value={localSettings.hero.primaryCtaText.es}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          hero: {
                            ...localSettings.hero,
                            primaryCtaText: { ...localSettings.hero.primaryCtaText, es: e.target.value }
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SEÇÕES & ORDEM */}
            {activeTab === 'secoes' && (
              <div>
                <div className="admin-section-heading">
                  <div>
                    <h3>Visibilidade e Ativação das Seções</h3>
                    <p className="admin-help-text">Ative ou oculte seções do site público com um clique</p>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleSaveSettings}>
                    <Save size={16} />
                    <span>Salvar Alterações</span>
                  </button>
                </div>

                <div className="admin-items-list">
                  {Object.entries(localSettings.sectionsVisibility).map(([key, isVisible]) => (
                    <div key={key} className="admin-item-row">
                      <div>
                        <strong style={{ textTransform: 'capitalize', color: 'var(--text-primary)' }}>
                          Seção: {key}
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {isVisible ? 'Ativa e visível no site público' : 'Oculta para os visitantes'}
                        </p>
                      </div>
                      <button
                        type="button"
                        className={`btn btn-sm ${isVisible ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => {
                          const updated = {
                            ...localSettings.sectionsVisibility,
                            [key]: !isVisible
                          };
                          setLocalSettings({ ...localSettings, sectionsVisibility: updated });
                        }}
                      >
                        {isVisible ? 'Ativada (Visível)' : 'Desativada (Oculta)'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SERVIÇOS */}
            {activeTab === 'servicos' && (
              <div>
                <div className="admin-section-heading">
                  <div>
                    <h3>Catálogo de Serviços</h3>
                    <p className="admin-help-text">Gerencie os serviços oferecidos e adicione novos itens</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      const newService: ServiceItem = {
                        id: 'novo-servico-' + Date.now(),
                        iconName: 'Building2',
                        title: { pt: 'Novo Serviço Web', en: 'New Web Service', es: 'Nuevo Servicio Web' },
                        shortDesc: {
                          pt: 'Descrição profissional do serviço prestado.',
                          en: 'Professional service description.',
                          es: 'Descripción profesional del servicio.'
                        },
                        bulletPoints: {
                          pt: ['Entregável 1', 'Entregável 2'],
                          en: ['Deliverable 1', 'Deliverable 2'],
                          es: ['Entregable 1', 'Entregable 2']
                        }
                      };
                      updateServices([...services, newService]);
                      showSuccessNotification('Novo serviço adicionado!');
                    }}
                  >
                    <Plus size={16} />
                    <span>Adicionar Serviço</span>
                  </button>
                </div>

                <div className="admin-items-list">
                  {services.map((service) => (
                    <div key={service.id} className="admin-item-row">
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>{service.title.pt}</strong>
                          {service.highlight && (
                            <span className="admin-status-tag">Destaque</span>
                          )}
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {service.shortDesc.pt}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            const updated = services.map(s =>
                              s.id === service.id ? { ...s, highlight: !s.highlight } : s
                            );
                            updateServices(updated);
                            showSuccessNotification('Status de destaque atualizado!');
                          }}
                        >
                          {service.highlight ? 'Tirar Destaque' : 'Destacar'}
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            if (confirm(`Deseja remover o serviço "${service.title.pt}"?`)) {
                              const updated = services.filter(s => s.id !== service.id);
                              updateServices(updated);
                              showSuccessNotification('Serviço removido com sucesso!');
                            }
                          }}
                          style={{ color: '#DC2626' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: DIFERENCIAIS */}
            {activeTab === 'diferenciais' && (
              <div>
                <div className="admin-section-heading">
                  <div>
                    <h3>Diferenciais Competitivos</h3>
                    <p className="admin-help-text">Gerencie os pontos fortes e diferenciais apresentados</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      const newDiff: DifferentialItem = {
                        id: 'diff-' + Date.now(),
                        iconName: 'Sparkles',
                        title: { pt: 'Novo Diferencial Técnico', en: 'New Technical Advantage', es: 'Nuevo Diferencial Técnico' },
                        desc: {
                          pt: 'Explicação clara sobre a vantagem para o cliente.',
                          en: 'Clear explanation of client value proposition.',
                          es: 'Explicación clara de la propuesta de valor.'
                        }
                      };
                      updateDifferentials([...differentials, newDiff]);
                      showSuccessNotification('Novo diferencial adicionado!');
                    }}
                  >
                    <Plus size={16} />
                    <span>Adicionar Diferencial</span>
                  </button>
                </div>

                <div className="admin-items-list">
                  {differentials.map((item) => (
                    <div key={item.id} className="admin-item-row">
                      <div style={{ flexGrow: 1 }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{item.title.pt}</strong>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {item.desc.pt}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            const newTitle = prompt('Novo título do diferencial:', item.title.pt);
                            if (newTitle) {
                              const updated = differentials.map(d =>
                                d.id === item.id ? { ...d, title: { ...d.title, pt: newTitle } } : d
                              );
                              updateDifferentials(updated);
                              showSuccessNotification('Diferencial atualizado!');
                            }
                          }}
                        >
                          <Edit2 size={14} />
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            if (confirm(`Remover diferencial "${item.title.pt}"?`)) {
                              const updated = differentials.filter(d => d.id !== item.id);
                              updateDifferentials(updated);
                              showSuccessNotification('Diferencial removido!');
                            }
                          }}
                          style={{ color: '#DC2626' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PORTFÓLIO */}
            {activeTab === 'projetos' && (
              <div>
                <div className="admin-section-heading">
                  <div>
                    <h3>Gerenciamento de Projetos / Portfólio</h3>
                    <p className="admin-help-text">Adicione, edite e organize projetos entregues</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      const newProj: ProjectItem = {
                        id: 'projeto-' + Date.now(),
                        title: { pt: 'Novo Projeto Corporativo', en: 'New Corporate Project', es: 'Nuevo Proyecto Corporativo' },
                        category: 'institucional',
                        shortDesc: {
                          pt: 'Descrição detalhada do projeto entregue com sucesso.',
                          en: 'Detailed project description of successful deployment.',
                          es: 'Descripción detallada del proyecto entregado con éxito.'
                        },
                        image: '/projects/fintech-corp.jpg',
                        featured: true,
                        technologies: ['React', 'TypeScript', 'Alta Performance']
                      };
                      updateProjects([...projects, newProj]);
                      showSuccessNotification('Novo projeto adicionado ao portfólio!');
                    }}
                  >
                    <Plus size={16} />
                    <span>Adicionar Projeto</span>
                  </button>
                </div>

                <div className="admin-items-list">
                  {projects.map((proj) => (
                    <div key={proj.id} className="admin-item-row" style={{ alignItems: 'flex-start' }}>
                      <img
                        src={proj.image}
                        alt=""
                        style={{ width: '90px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                      />
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>{proj.title.pt}</strong>
                          <span className="admin-status-tag" style={{ textTransform: 'capitalize' }}>
                            {proj.category}
                          </span>
                        </div>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {proj.shortDesc.pt}
                        </p>
                        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                          {proj.technologies?.map((tech, i) => (
                            <span key={i} className="tech-tag" style={{ fontSize: '0.7rem' }}>{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            const newTitle = prompt('Novo título do projeto:', proj.title.pt);
                            if (newTitle) {
                              const updated = projects.map(p =>
                                p.id === proj.id ? { ...p, title: { ...p.title, pt: newTitle } } : p
                              );
                              updateProjects(updated);
                              showSuccessNotification('Título do projeto atualizado!');
                            }
                          }}
                        >
                          <Edit2 size={14} />
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            if (confirm(`Remover o projeto "${proj.title.pt}"?`)) {
                              const updated = projects.filter(p => p.id !== proj.id);
                              updateProjects(updated);
                              showSuccessNotification('Projeto excluído do portfólio!');
                            }
                          }}
                          style={{ color: '#DC2626' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PROCESSO */}
            {activeTab === 'processo' && (
              <div>
                <div className="admin-section-heading">
                  <div>
                    <h3>Etapas do Processo de Desenvolvimento</h3>
                    <p className="admin-help-text">Atualize os prazos estimados e detalhes das etapas</p>
                  </div>
                </div>

                <div className="admin-items-list">
                  {processSteps.map((step) => (
                    <div key={step.stepNumber} className="admin-item-row">
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span className="admin-status-tag">Etapa {step.stepNumber}</span>
                          <strong style={{ color: 'var(--text-primary)' }}>{step.title.pt}</strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({step.duration.pt})</span>
                        </div>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {step.desc.pt}
                        </p>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            const newDuration = prompt(`Novo prazo estimado para etapa "${step.title.pt}":`, step.duration.pt);
                            if (newDuration) {
                              const updated = processSteps.map(s =>
                                s.stepNumber === step.stepNumber ? { ...s, duration: { ...s.duration, pt: newDuration } } : s
                              );
                              updateProcessSteps(updated);
                              showSuccessNotification('Prazo da etapa atualizado!');
                            }
                          }}
                        >
                          <Edit2 size={14} />
                          <span>Editar Prazo</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CONTATO & REDES */}
            {activeTab === 'contato' && (
              <div>
                <div className="admin-section-heading">
                  <div>
                    <h3>Canais de Contato e Redes Sociais</h3>
                    <p className="admin-help-text">Configure WhatsApp, e-mail e perfis nas redes sociais</p>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleSaveSettings}>
                    <Save size={16} />
                    <span>Salvar Alterações</span>
                  </button>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">WhatsApp Oficial (com DDD e código do país)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={localSettings.contact.whatsapp}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      contact: { ...localSettings.contact, whatsapp: e.target.value }
                    })}
                  />
                  <p className="admin-help-text">Exemplo: +55 11 99999-9999</p>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">E-mail Corporativo</label>
                  <input
                    type="email"
                    className="form-input"
                    value={localSettings.contact.email}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      contact: { ...localSettings.contact, email: e.target.value }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Instagram (URL Completa)</label>
                  <input
                    type="url"
                    className="form-input"
                    value={localSettings.contact.instagram}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      contact: { ...localSettings.contact, instagram: e.target.value }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">LinkedIn (URL Completa)</label>
                  <input
                    type="url"
                    className="form-input"
                    value={localSettings.contact.linkedin}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      contact: { ...localSettings.contact, linkedin: e.target.value }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">GitHub (URL Completa)</label>
                  <input
                    type="url"
                    className="form-input"
                    value={localSettings.contact.github}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      contact: { ...localSettings.contact, github: e.target.value }
                    })}
                  />
                </div>
              </div>
            )}

            {/* TAB: SEO */}
            {activeTab === 'seo' && (
              <div>
                <div className="admin-section-heading">
                  <div>
                    <h3>Configurações de SEO & Meta Tags</h3>
                    <p className="admin-help-text">Otimize a indexação no Google, Open Graph e redes sociais</p>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleSaveSettings}>
                    <Save size={16} />
                    <span>Salvar Alterações</span>
                  </button>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Title Principal da Página (PT)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={localSettings.seo.metaTitle.pt}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      seo: {
                        ...localSettings.seo,
                        metaTitle: { ...localSettings.seo.metaTitle, pt: e.target.value }
                      }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Meta Description (PT)</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={localSettings.seo.metaDescription.pt}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      seo: {
                        ...localSettings.seo,
                        metaDescription: { ...localSettings.seo.metaDescription, pt: e.target.value }
                      }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Palavras-chave (Keywords)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={localSettings.seo.keywords}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      seo: { ...localSettings.seo, keywords: e.target.value }
                    })}
                  />
                </div>
              </div>
            )}

            {/* TAB: LEADS */}
            {activeTab === 'leads' && (
              <div>
                <div className="admin-section-heading">
                  <div>
                    <h3>Leads e Solicitações de Orçamento ({leads.length})</h3>
                    <p className="admin-help-text">Contatos recebidos diretamente pelo site ou modal</p>
                  </div>
                </div>

                {leads.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                    <p>Nenhuma solicitação de orçamento registrada ainda.</p>
                  </div>
                ) : (
                  <div className="admin-items-list">
                    {leads.map((lead) => (
                      <div key={lead.id} className="admin-item-row" style={{ alignItems: 'flex-start' }}>
                        <div style={{ flexGrow: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                            <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{lead.name}</strong>
                            <span className="admin-status-tag" style={{
                              backgroundColor: lead.status === 'fechado' ? '#ECFDF5' : '#EFF6FF',
                              color: lead.status === 'fechado' ? '#065F46' : '#1D4ED8'
                            }}>
                              Status: {lead.status}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            <span>E-mail: <strong>{lead.email}</strong></span> | <span>Tel/WhatsApp: <strong>{lead.phone}</strong></span>
                            {lead.company && <span> | Empresa: <strong>{lead.company}</strong></span>}
                          </div>

                          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            Tipo: <strong>{lead.projectType}</strong> {lead.budgetRange && `| Orçamento: ${lead.budgetRange}`}
                          </div>

                          <p style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--bg-primary)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-subtle)',
                            margin: 0,
                            fontSize: '0.85rem'
                          }}>
                            {lead.message}
                          </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <select
                            className="form-select"
                            style={{ padding: '0.35rem', fontSize: '0.8rem' }}
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                          >
                            <option value="novo">Novo</option>
                            <option value="em_contato">Em Contato</option>
                            <option value="proposta">Proposta Enviada</option>
                            <option value="fechado">Fechado</option>
                          </select>

                          <a
                            href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${lead.name}, recebemos sua solicitação de orçamento para ${lead.projectType}!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-sm"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                          >
                            <PhoneCall size={13} />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: SUPABASE & BANCO */}
            {activeTab === 'supabase' && (
              <div>
                <div className="admin-section-heading">
                  <div>
                    <h3>Integração com Supabase & Backup</h3>
                    <p className="admin-help-text">Conexão direta com banco de dados em nuvem</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={isSyncing}
                    onClick={handleSaveSupabaseConfig}
                  >
                    <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
                    <span>{isSyncing ? 'Sincronizando...' : 'Testar & Sincronizar'}</span>
                  </button>
                </div>

                {supabaseStatusMsg && (
                  <div style={{
                    padding: '0.85rem 1.25rem',
                    backgroundColor: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    color: '#1E3A8A',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem'
                  }}>
                    {supabaseStatusMsg}
                  </div>
                )}

                <div className="admin-form-group">
                  <label className="admin-label">Project URL do Supabase</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="https://xyzcompany.supabase.co"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Anon / Public Key do Supabase</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                  />
                  <p className="admin-help-text">
                    Suas credenciais são mantidas com segurança e nunca expostas publicamente.
                  </p>
                </div>

                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  marginTop: '2rem'
                }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    Script SQL para o Supabase
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    O arquivo SQL com todas as tabelas e políticas de segurança RLS foi gerado em <code>supabase/schema.sql</code>.
                    Basta colá-lo no SQL Editor do seu projeto Supabase.
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        if (confirm('Tem certeza de que deseja restaurar todos os textos e projetos para os padrões originais?')) {
                          resetToDefaults();
                          setLocalSettings(settings);
                          showSuccessNotification('Conteúdos restaurados para os padrões com sucesso!');
                        }
                      }}
                      style={{ color: '#DC2626' }}
                    >
                      Restaurar Padrões Originais
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
