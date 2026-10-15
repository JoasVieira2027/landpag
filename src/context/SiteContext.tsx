import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Language,
  LocalizedString,
  SiteSettings,
  ServiceItem,
  DifferentialItem,
  ProjectItem,
  ProcessStep,
  QuoteLead
} from '../lib/types';
import {
  defaultSettings,
  defaultServices,
  defaultDifferentials,
  defaultProjects,
  defaultProcessSteps
} from '../lib/defaultData';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';

interface SiteContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (val: LocalizedString | undefined) => string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  settings: SiteSettings;
  services: ServiceItem[];
  differentials: DifferentialItem[];
  projects: ProjectItem[];
  processSteps: ProcessStep[];
  leads: QuoteLead[];
  
  // Admin & Auth
  isAdminLoggedIn: boolean;
  adminLogin: (password: string, email?: string) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Actions
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<boolean>;
  updateServices: (newServices: ServiceItem[]) => Promise<boolean>;
  updateDifferentials: (newDiffs: DifferentialItem[]) => Promise<boolean>;
  updateProjects: (newProjects: ProjectItem[]) => Promise<boolean>;
  updateProcessSteps: (newSteps: ProcessStep[]) => Promise<boolean>;
  submitQuoteLead: (lead: Omit<QuoteLead, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateLeadStatus: (leadId: string, status: QuoteLead['status']) => Promise<boolean>;
  resetToDefaults: () => Promise<boolean>;
  syncWithSupabase: () => Promise<{ success: boolean; message: string }>;
  isSyncing: boolean;
}

const SiteContext = createContext<SiteContextType | null>(null);

const STORAGE_KEYS = {
  SETTINGS: 'webjoas_site_settings',
  SERVICES: 'webjoas_site_services',
  DIFFERENTIALS: 'webjoas_site_differentials',
  PROJECTS: 'webjoas_site_projects',
  PROCESS: 'webjoas_site_process',
  LEADS: 'webjoas_site_leads',
  THEME: 'webjoas_theme',
  LANG: 'webjoas_lang',
  ADMIN_AUTH: 'webjoas_admin_auth'
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved === 'en' || saved === 'es' || saved === 'pt') ? saved : 'pt';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return saved === 'dark' ? 'dark' : 'light';
  });

  const CURRENT_VERSION = 'v11_fluxoweb_real_images';

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const version = localStorage.getItem('webjoas_data_version');
    if (version !== CURRENT_VERSION) {
      localStorage.setItem('webjoas_data_version', CURRENT_VERSION);
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(defaultServices));
      localStorage.setItem(STORAGE_KEYS.DIFFERENTIALS, JSON.stringify(defaultDifferentials));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(defaultProjects));
      localStorage.setItem(STORAGE_KEYS.PROCESS, JSON.stringify(defaultProcessSteps));
      return defaultSettings;
    }
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const version = localStorage.getItem('webjoas_data_version');
    if (version !== CURRENT_VERSION) return defaultServices;
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : defaultServices;
  });

  const [differentials, setDifferentials] = useState<DifferentialItem[]>(() => {
    const version = localStorage.getItem('webjoas_data_version');
    if (version !== CURRENT_VERSION) return defaultDifferentials;
    const saved = localStorage.getItem(STORAGE_KEYS.DIFFERENTIALS);
    return saved ? JSON.parse(saved) : defaultDifferentials;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const version = localStorage.getItem('webjoas_data_version');
    if (version !== CURRENT_VERSION) return defaultProjects;
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!saved) return defaultProjects;
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length >= 3 ? parsed : defaultProjects;
    } catch {
      return defaultProjects;
    }
  });

  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(() => {
    const version = localStorage.getItem('webjoas_data_version');
    if (version !== CURRENT_VERSION) return defaultProcessSteps;
    const saved = localStorage.getItem(STORAGE_KEYS.PROCESS);
    return saved ? JSON.parse(saved) : defaultProcessSteps;
  });

  const [leads, setLeads] = useState<QuoteLead[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Hidden Admin Triggers (URL #admin or Ctrl+Shift+A / Alt+A)
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash.toLowerCase() === '#admin') {
        setIsAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') ||
        (e.altKey && e.key.toLowerCase() === 'a')
      ) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Clean URL hash when Admin closes
  useEffect(() => {
    if (!isAdminOpen && window.location.hash.toLowerCase() === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [isAdminOpen]);

  // Apply Theme class on root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Apply language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
  };

  // Safe translation extractor
  const t = (val: LocalizedString | undefined): string => {
    if (!val) return '';
    return val[language] || val.pt || val.en || '';
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync from Supabase on start (Economical: only single query, cached)
  useEffect(() => {
    const loadFromSupabase = async () => {
      if (!isSupabaseConfigured()) return;
      const client = getSupabaseClient();
      if (!client) return;

      try {
        const { data, error } = await client
          .from('site_config')
          .select('*')
          .eq('id', 'main')
          .single();

        if (data && !error) {
          if (data.settings) {
            setSettings(data.settings);
            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
          }
          if (data.services && Array.isArray(data.services) && data.services.length > 0) {
            setServices(data.services);
            localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(data.services));
          }
          if (data.differentials && Array.isArray(data.differentials) && data.differentials.length > 0) {
            setDifferentials(data.differentials);
            localStorage.setItem(STORAGE_KEYS.DIFFERENTIALS, JSON.stringify(data.differentials));
          }
          if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
            setProjects(data.projects);
            localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data.projects));
          }
          if (data.process_steps && Array.isArray(data.process_steps) && data.process_steps.length > 0) {
            setProcessSteps(data.process_steps);
            localStorage.setItem(STORAGE_KEYS.PROCESS, JSON.stringify(data.process_steps));
          }
        }
      } catch (e) {
        console.warn('Usando dados em cache local (Supabase não respondeu):', e);
      }
    };

    loadFromSupabase();
  }, []);

  // Update SEO in document head dynamically
  useEffect(() => {
    if (settings.seo) {
      const title = t(settings.seo.metaTitle) || settings.brandName;
      const desc = t(settings.seo.metaDescription);
      document.title = title;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && desc) {
        metaDesc.setAttribute('content', desc);
      }
    }
  }, [settings, language]);

  // Admin Login
  const adminLogin = async (password: string, email?: string): Promise<{ success: boolean; error?: string }> => {
    // 1. Check Supabase Auth if credentials provided and email specified
    const client = getSupabaseClient();
    if (client && email && isSupabaseConfigured()) {
      try {
        const { error } = await client.auth.signInWithPassword({
          email,
          password
        });
        if (!error) {
          setIsAdminLoggedIn(true);
          localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
          return { success: true };
        }
      } catch (err: any) {
        console.warn('Falha no login Supabase, verificando chave mestra local:', err);
      }
    }

    // 2. Master Admin Key fallback (Default: "admin123" or custom stored)
    const masterPass = localStorage.getItem('webjoas_admin_master_pass') || 'admin123';
    if (password === masterPass) {
      setIsAdminLoggedIn(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return { success: true };
    }

    return {
      success: false,
      error: 'Senha incorreta. A senha padrão inicial de demonstração é admin123'
    };
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    const client = getSupabaseClient();
    if (client) {
      client.auth.signOut().catch(() => {});
    }
  };

  // Helper to persist to Supabase when possible
  const saveToSupabase = async (
    newSettings = settings,
    newServices = services,
    newDiffs = differentials,
    newProjects = projects,
    newSteps = processSteps
  ) => {
    const client = getSupabaseClient();
    if (!client || !isSupabaseConfigured()) return;

    try {
      await client
        .from('site_config')
        .upsert({
          id: 'main',
          settings: newSettings,
          services: newServices,
          differentials: newDiffs,
          projects: newProjects,
          process_steps: newSteps,
          updated_at: new Date().toISOString()
        });
    } catch (err) {
      console.warn('Erro ao salvar no Supabase:', err);
    }
  };

  const updateSettings = async (newSettingsPartial: Partial<SiteSettings>): Promise<boolean> => {
    const updated = { ...settings, ...newSettingsPartial };
    setSettings(updated);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    await saveToSupabase(updated);
    return true;
  };

  const updateServices = async (newServices: ServiceItem[]): Promise<boolean> => {
    setServices(newServices);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(newServices));
    await saveToSupabase(settings, newServices);
    return true;
  };

  const updateDifferentials = async (newDiffs: DifferentialItem[]): Promise<boolean> => {
    setDifferentials(newDiffs);
    localStorage.setItem(STORAGE_KEYS.DIFFERENTIALS, JSON.stringify(newDiffs));
    await saveToSupabase(settings, services, newDiffs);
    return true;
  };

  const updateProjects = async (newProjects: ProjectItem[]): Promise<boolean> => {
    setProjects(newProjects);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(newProjects));
    await saveToSupabase(settings, services, differentials, newProjects);
    return true;
  };

  const updateProcessSteps = async (newSteps: ProcessStep[]): Promise<boolean> => {
    setProcessSteps(newSteps);
    localStorage.setItem(STORAGE_KEYS.PROCESS, JSON.stringify(newSteps));
    await saveToSupabase(settings, services, differentials, projects, newSteps);
    return true;
  };

  const submitQuoteLead = async (leadData: Omit<QuoteLead, 'id' | 'createdAt' | 'status'>): Promise<boolean> => {
    const newLead: QuoteLead = {
      ...leadData,
      id: 'lead_' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'novo'
    };

    const updatedLeads = [newLead, ...leads];
    setLeads(updatedLeads);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updatedLeads));

    // Try Supabase insert
    const client = getSupabaseClient();
    if (client && isSupabaseConfigured()) {
      try {
        await client.from('leads').insert({
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          company: leadData.company || null,
          project_type: leadData.projectType,
          budget_range: leadData.budgetRange || null,
          message: leadData.message,
          status: 'novo'
        });
      } catch (err) {
        console.warn('Erro ao inserir lead no Supabase (salvo localmente):', err);
      }
    }

    return true;
  };

  const updateLeadStatus = async (leadId: string, status: QuoteLead['status']): Promise<boolean> => {
    const updated = leads.map(l => (l.id === leadId ? { ...l, status } : l));
    setLeads(updated);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updated));

    const client = getSupabaseClient();
    if (client && isSupabaseConfigured()) {
      try {
        await client.from('leads').update({ status }).eq('id', leadId);
      } catch (err) {
        console.warn('Erro ao atualizar status do lead no Supabase:', err);
      }
    }

    return true;
  };

  const resetToDefaults = async (): Promise<boolean> => {
    setSettings(defaultSettings);
    setServices(defaultServices);
    setDifferentials(defaultDifferentials);
    setProjects(defaultProjects);
    setProcessSteps(defaultProcessSteps);

    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(defaultServices));
    localStorage.setItem(STORAGE_KEYS.DIFFERENTIALS, JSON.stringify(defaultDifferentials));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(defaultProjects));
    localStorage.setItem(STORAGE_KEYS.PROCESS, JSON.stringify(defaultProcessSteps));

    await saveToSupabase(defaultSettings, defaultServices, defaultDifferentials, defaultProjects, defaultProcessSteps);
    return true;
  };

  const syncWithSupabase = async (): Promise<{ success: boolean; message: string }> => {
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        message: 'Configure a URL e a Anon Key do Supabase na aba "Supabase & Banco" primeiro.'
      };
    }

    setIsSyncing(true);
    const client = getSupabaseClient();
    if (!client) {
      setIsSyncing(false);
      return { success: false, message: 'Não foi possível conectar ao Supabase.' };
    }

    try {
      const { error } = await client
        .from('site_config')
        .upsert({
          id: 'main',
          settings,
          services,
          differentials,
          projects,
          process_steps: processSteps,
          updated_at: new Date().toISOString()
        });

      setIsSyncing(false);
      if (error) {
        return { success: false, message: 'Erro ao sincronizar: ' + error.message };
      }
      return { success: true, message: 'Configurações e projetos salvos no Supabase com sucesso!' };
    } catch (err: any) {
      setIsSyncing(false);
      return { success: false, message: err?.message || 'Erro inesperado na sincronização.' };
    }
  };

  return (
    <SiteContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        settings,
        services,
        differentials,
        projects,
        processSteps,
        leads,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        isAdminOpen,
        setIsAdminOpen,
        updateSettings,
        updateServices,
        updateDifferentials,
        updateProjects,
        updateProcessSteps,
        submitQuoteLead,
        updateLeadStatus,
        resetToDefaults,
        syncWithSupabase,
        isSyncing
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite deve ser usado dentro de um SiteProvider');
  }
  return context;
};
