export type PageType = 'home' | 'request' | 'services' | 'contact';

export interface RequestFormData {
  name: string;
  phone: string;
  content: string;
  preferredTime: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Interface representing the structured content of a generated website.
 * Matches the schema defined in geminiService.ts.
 */
export interface SiteContent {
  brandName: string;
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  about: {
    title: string;
    text: string;
  };
  pricing: {
    plan: string;
    price: string;
    features: string[];
  }[];
  contact: {
    email: string;
    address: string;
  };
}