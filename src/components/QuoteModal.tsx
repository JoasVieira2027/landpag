import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import './QuoteModal.css';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedService
}) => {
  const { t, settings, submitQuoteLead } = useSite();

  const [serviceType, setServiceType] = useState<string>(preselectedService || 'Sites Institucionais');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budgetRange: 'R$ 3.000 a R$ 6.000',
    timeline: 'Até 15 dias',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const labels = {
    title: {
      pt: 'Solicitar Orçamento Personalizado',
      en: 'Request a Custom Proposal',
      es: 'Solicitar Presupuesto Personalizado'
    },
    subtitle: {
      pt: 'Preencha os detalhes e receba um diagnóstico e proposta comercial sem compromisso.',
      en: 'Fill in your project details to receive a technical diagnosis and quote.',
      es: 'Complete los detalles para recibir una cotización formal y asesoramiento sin compromiso.'
    },
    selectType: {
      pt: '1. Selecione a Solução Desejada:',
      en: '1. Select the Desired Solution:',
      es: '1. Seleccione la Solución Deseada:'
    },
    clientInfo: {
      pt: '2. Seus Dados de Contato:',
      en: '2. Your Contact Information:',
      es: '2. Sus Datos de Contacto:'
    },
    budget: { pt: 'Faixa de Investimento Estimada', en: 'Estimated Budget Range', es: 'Rango de Inversión' },
    timeline: { pt: 'Prazo Desejado', en: 'Expected Timeline', es: 'Plazo Estimado' },
    message: { pt: 'Detalhes ou Objetivos Adicionais', en: 'Additional Goals or Requirements', es: 'Detalles u Objetivos Adicionales' },
    submitBtn: { pt: 'Enviar Solicitação de Orçamento', en: 'Submit Quote Request', es: 'Enviar Solicitud de Presupuesto' },
    submitting: { pt: 'Processando...', en: 'Processing...', es: 'Procesando...' },
    successTitle: {
      pt: 'Solicitação enviada com sucesso!',
      en: 'Request submitted successfully!',
      es: '¡Solicitud enviada con éxito!'
    },
    successDesc: {
      pt: 'Analisaremos suas necessidades e retornaremos com uma proposta detalhada.',
      en: 'We will review your requirements and respond with a detailed proposal.',
      es: 'Revisaremos sus requerimientos y responderemos con una propuesta formal.'
    },
    whatsappAction: {
      pt: 'Enviar Resumo para o WhatsApp Agora',
      en: 'Send Summary to WhatsApp Now',
      es: 'Enviar Resumen a WhatsApp Ahora'
    }
  };

  const projectTypes = [
    'Cardápio Digital & Pedidos (Açaí, Delivery)',
    'Agendamento Online (Barbearias, Clínicas)',
    'Catálogo & Loja de Roupas',
    'Site Institucional para Empresa',
    'Landing Page de Vendas',
    'Manutenção & Atualização de Site'
  ];

  const budgetOptions = [
    'R$ 2.000 a R$ 4.000',
    'R$ 4.000 a R$ 8.000',
    'R$ 8.000 a R$ 15.000',
    'Acima de R$ 15.000'
  ];

  const timelineOptions = [
    'Urgente (em até 7 dias)',
    '15 a 20 dias',
    '30 a 45 dias',
    'Flexível'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    await submitQuoteLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      projectType: serviceType,
      budgetRange: `${formData.budgetRange} (Prazo: ${formData.timeline})`,
      message: formData.message || 'Solicitação iniciada através do modal de orçamento.'
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const whatsappCleanNumber = settings.contact.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappCleanNumber}?text=${encodeURIComponent(
    `Olá! Me chamo ${formData.name}. Gostaria de solicitar um orçamento para ${serviceType}.\nInvestimento estimado: ${formData.budgetRange}\nPrazo: ${formData.timeline}\nE-mail: ${formData.email}\nTelefone: ${formData.phone}`
  )}`;

  return (
    <div className="quote-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="quote-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="quote-modal-header">
          <div>
            <h2 className="quote-modal-title">{t(labels.title)}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              {t(labels.subtitle)}
            </p>
          </div>
          <button
            type="button"
            className="portfolio-modal-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="quote-modal-body">
          {isSubmitted ? (
            <div className="form-success-alert">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={24} />
                <strong style={{ fontSize: '1.1rem' }}>{t(labels.successTitle)}</strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>{t(labels.successDesc)}</p>

              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}
                >
                  <MessageSquare size={18} />
                  <span>{t(labels.whatsappAction)}</span>
                </a>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={onClose}
                  style={{ width: '100%' }}
                >
                  Concluir e Fechar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">{t(labels.selectType)}</label>
                <div className="quote-project-types">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`project-type-chip ${serviceType === type ? 'selected' : ''}`}
                      onClick={() => setServiceType(type)}
                    >
                      <span>{type}</span>
                      {serviceType === type && <CheckCircle2 size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">{t(labels.clientInfo)}</label>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="Seu Nome Completo *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-input"
                      required
                      placeholder="E-mail de Contato *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="tel"
                      className="form-input"
                      required
                      placeholder="WhatsApp com DDD *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Nome da Empresa (opcional)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row" style={{ marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">{t(labels.budget)}</label>
                  <select
                    className="form-select"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t(labels.timeline)}</label>
                  <select
                    className="form-select"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  >
                    {timelineOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">{t(labels.message)}</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Alguma referência de site que você gosta ou detalhe importante sobre o projeto?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
  );
};
