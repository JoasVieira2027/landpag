import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import './ContactSection.css';

export const ContactSection: React.FC = () => {
  const { t, settings, submitQuoteLead } = useSite();
  const { contact } = settings;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'institucional',
    budgetRange: 'R$ 3.000 a R$ 6.000',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const labels = {
    badge: { pt: 'Fale Conosco', en: 'Get In Touch', es: 'Hablemos' },
    title: {
      pt: 'Inicie seu projeto com quem entende do assunto',
      en: 'Start your project with seasoned engineering experts',
      es: 'Inicie su proyecto con especialistas de alto nivel'
    },
    subtitle: {
      pt: 'Envie uma mensagem detalhando sua demanda ou entre em contato diretamente pelo nosso canal oficial de WhatsApp.',
      en: 'Send us a detailed message about your project requirements or reach out directly through our WhatsApp channel.',
      es: 'Envíe un mensaje con los requerimientos de su proyecto o comuníquese directamente a través de nuestro WhatsApp oficial.'
    },
    whatsappLabel: { pt: 'WhatsApp Direto', en: 'Direct WhatsApp', es: 'WhatsApp Directo' },
    emailLabel: { pt: 'E-mail Corporativo', en: 'Corporate Email', es: 'Correo Corporativo' },
    locationLabel: { pt: 'Localização', en: 'Location', es: 'Ubicación' },
    hoursLabel: { pt: 'Horário de Atendimento', en: 'Business Hours', es: 'Horario de Atención' },
    formName: { pt: 'Seu Nome Completo', en: 'Full Name', es: 'Nombre Completo' },
    formEmail: { pt: 'Seu E-mail Corporativo', en: 'Corporate Email', es: 'Correo Electrónico' },
    formPhone: { pt: 'WhatsApp / Telefone', en: 'WhatsApp / Phone', es: 'WhatsApp / Teléfono' },
    formCompany: { pt: 'Empresa (Opcional)', en: 'Company (Optional)', es: 'Empresa (Opcional)' },
    formType: { pt: 'Tipo de Projeto', en: 'Project Type', es: 'Tipo de Proyecto' },
    formMessage: { pt: 'Conte-nos sobre os objetivos do seu site', en: 'Tell us about your project goals', es: 'Cuéntenos sobre las metas de su proyecto' },
    submitBtn: { pt: 'Enviar Mensagem', en: 'Send Message', es: 'Enviar Mensaje' },
    submitting: { pt: 'Enviando...', en: 'Sending...', es: 'Enviando...' },
    successTitle: {
      pt: 'Mensagem recebida com sucesso!',
      en: 'Message received successfully!',
      es: '¡Mensaje recibido con éxito!'
    },
    successDesc: {
      pt: 'Retornaremos em até 24 horas úteis com uma avaliação técnica inicial.',
      en: 'We will get back to you within 24 business hours with an initial technical assessment.',
      es: 'Nos pondremos en contacto en menos de 24 horas hábiles con una evaluación técnica inicial.'
    },
    sendWhatsappAlso: {
      pt: 'Adiantar conversa no WhatsApp',
      en: 'Fast-track via WhatsApp',
      es: 'Avanzar por WhatsApp'
    }
  };

  const projectTypeOptions = [
    { value: 'pedidos', label: { pt: 'Cardápio Digital & Pedidos (Açaí, Lanchonete, Delivery)', en: 'Digital Menu & Orders', es: 'Menú Digital y Pedidos' } },
    { value: 'agendamentos', label: { pt: 'Agendamento Online (Barbearia, Salão, Clínica)', en: 'Online Appointments', es: 'Turnos y Citas Online' } },
    { value: 'lojas', label: { pt: 'Catálogo & Loja de Roupas / Produtos', en: 'Fashion & Product Catalog', es: 'Catálogo de Ropa / Productos' } },
    { value: 'institucional', label: { pt: 'Site Institucional para Empresa ou Escritório', en: 'Corporate Website', es: 'Sitio Institucional' } },
    { value: 'landing', label: { pt: 'Landing Page para Anúncios', en: 'Landing Page', es: 'Landing Page' } },
    { value: 'manutencao', label: { pt: 'Atualização & Manutenção de Site Existente', en: 'Maintenance', es: 'Mantenimiento' } }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    await submitQuoteLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      projectType: formData.projectType,
      budgetRange: formData.budgetRange,
      message: formData.message
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const whatsappCleanNumber = contact.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappCleanNumber}?text=${encodeURIComponent(
    `Olá! Me chamo ${formData.name || 'Cliente'} e acabei de enviar uma mensagem através do site sobre um projeto de ${formData.projectType}.`
  )}`;

  return (
    <section id="contact" className="section section-secondary" aria-label="Informações de Contato">
      <div className="container">
        <header className="section-header">
          <div className="section-badge">
            <span>{t(labels.badge)}</span>
          </div>
          <h2 className="section-title">{t(labels.title)}</h2>
          <p className="section-subtitle">{t(labels.subtitle)}</p>
        </header>

        <div className="contact-grid">
          {/* Info Card */}
          <div className="contact-info-card">
            {contact.whatsapp && (
              <div className="contact-info-item">
                <div className="contact-item-icon-box">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="contact-item-label">{t(labels.whatsappLabel)}</div>
                  <div className="contact-item-value">
                    <a
                      href={`https://wa.me/${whatsappCleanNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {contact.email && (
              <div className="contact-info-item">
                <div className="contact-item-icon-box">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="contact-item-label">{t(labels.emailLabel)}</div>
                  <div className="contact-item-value">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                </div>
              </div>
            )}

            {contact.location && (
              <div className="contact-info-item">
                <div className="contact-item-icon-box">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="contact-item-label">{t(labels.locationLabel)}</div>
                  <div className="contact-item-value">{t(contact.location)}</div>
                </div>
              </div>
            )}

            {contact.businessHours && (
              <div className="contact-info-item">
                <div className="contact-item-icon-box">
                  <Clock size={22} />
                </div>
                <div>
                  <div className="contact-item-label">{t(labels.hoursLabel)}</div>
                  <div className="contact-item-value">{t(contact.businessHours)}</div>
                </div>
              </div>
            )}

            {/* Social Links */}
            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div className="contact-item-label" style={{ marginBottom: '0.75rem' }}>Canais Oficiais</div>
              <div className="social-links-bar">
                {contact.instagram && (
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-btn"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                )}
                {contact.linkedin && (
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-btn"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                )}
                {contact.github && (
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-btn"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                      <path d="M9 18c-4.51 2-5-2-7-2"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="contact-form-card">
            {isSubmitted ? (
              <div className="form-success-alert">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={22} />
                  <strong>{t(labels.successTitle)}</strong>
                </div>
                <p style={{ margin: 0, fontSize: '0.925rem' }}>{t(labels.successDesc)}</p>
                <div style={{ marginTop: '0.75rem' }}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <MessageSquare size={16} />
                    <span>{t(labels.sendWhatsappAlso)}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t(labels.formName)} *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Carlos Albuquerque"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t(labels.formEmail)} *</label>
                    <input
                      type="email"
                      className="form-input"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="carlos@empresa.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t(labels.formPhone)} *</label>
                    <input
                      type="tel"
                      className="form-input"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(11) 98765-4321"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t(labels.formCompany)}</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t(labels.formType)}</label>
                  <select
                    className="form-select"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  >
                    {projectTypeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {t(opt.label)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t(labels.formMessage)} *</label>
                  <textarea
                    className="form-textarea"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Descreva brevemente o que sua empresa precisa (número aproximado de páginas, referências visuais ou funcionalidades necessárias)..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                  style={{ width: '100%' }}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? t(labels.submitting) : t(labels.submitBtn)}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
