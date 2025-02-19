export type Language = 'fr' | 'ar' | 'en';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  details?: string;
  isSpecial?: boolean;
  translationKey: string;
}

export interface MenuSection {
  starters: MenuItem[];
  mains: MenuItem[];
  desserts: MenuItem[];
}

export interface CategoryTranslations {
  starters: string;
  mains: string;
  desserts: string;
}

export interface Translations {
  fr: {
    title: string;
    subtitle: string;
    categories: CategoryTranslations;
    viewMore: string;
    viewLess: string;
  };
  ar: {
    title: string;
    subtitle: string;
    categories: CategoryTranslations;
    viewMore: string;
    viewLess: string;
  };
  en: {
    title: string;
    subtitle: string;
    categories: CategoryTranslations;
    viewMore: string;
    viewLess: string;
  };
} 