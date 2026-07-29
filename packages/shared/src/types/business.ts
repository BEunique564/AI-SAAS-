export interface Business {
  id: string;
  name: string;
  plan: 'free' | 'starter' | 'professional' | 'business' | 'enterprise';
  settings: BusinessSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessSettings {
  timezone: string;
  currency: string;
  language: string;
  businessHours: BusinessHours;
  branding: BrandingSettings;
}

export interface BusinessHours {
  monday: { open: string; close: string } | null;
  tuesday: { open: string; close: string } | null;
  wednesday: { open: string; close: string } | null;
  thursday: { open: string; close: string } | null;
  friday: { open: string; close: string } | null;
  saturday: { open: string; close: string } | null;
  sunday: { open: string; close: string } | null;
}

export interface BrandingSettings {
  logo?: string;
  primaryColor?: string;
  customDomain?: string;
}

export interface User {
  id: string;
  businessId: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'manager' | 'employee';
  avatar?: string;
  lastLoginAt?: Date;
  createdAt: Date;
}
