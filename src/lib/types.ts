export type Language = 'pt' | 'en' | 'es';

export interface LocalizedString {
  pt: string;
  en: string;
  es: string;
}

export interface ProjectItem {
  id: string;
  title: LocalizedString;
  category: string; // 'institucional' | 'landing' | 'ecommerce' | 'sistemas'
  shortDesc: LocalizedString;
  image: string;
  featured: boolean;
  liveUrl?: string;
  technologies: string[];
  results?: LocalizedString;
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: LocalizedString;
  shortDesc: LocalizedString;
  bulletPoints: {
    pt: string[];
    en: string[];
    es: string[];
  };
  highlight?: boolean;
}

export interface DifferentialItem {
  id: string;
  iconName: string;
  title: LocalizedString;
  desc: LocalizedString;
}

export interface ProcessStep {
  stepNumber: number;
  title: LocalizedString;
  desc: LocalizedString;
  duration: LocalizedString;
}

export interface ContactInfo {
  whatsapp: string;
  whatsappMessage: LocalizedString;
  email: string;
  instagram: string;
  linkedin: string;
  github: string;
  location: LocalizedString;
  businessHours: LocalizedString;
}

export interface SeoConfig {
  metaTitle: LocalizedString;
  metaDescription: LocalizedString;
  ogImage: string;
  keywords: string;
}

export interface SectionVisibility {
  hero: boolean;
  services: boolean;
  differentials: boolean;
  portfolio: boolean;
  process: boolean;
  cta: boolean;
  contact: boolean;
}

export interface HeroConfig {
  badge: LocalizedString;
  title: LocalizedString;
  subtitle: LocalizedString;
  primaryCtaText: LocalizedString;
  secondaryCtaText: LocalizedString;
  trustMetrics: {
    number: string;
    label: LocalizedString;
  }[];
}

export interface SiteSettings {
  brandName: string;
  tagline: LocalizedString;
  logoUrl?: string;
  primaryColor: string;
  hero: HeroConfig;
  contact: ContactInfo;
  seo: SeoConfig;
  sectionsVisibility: SectionVisibility;
  sectionsOrder: string[];
}

export interface QuoteLead {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  budgetRange?: string;
  message: string;
  status: 'novo' | 'em_contato' | 'proposta' | 'fechado';
}
