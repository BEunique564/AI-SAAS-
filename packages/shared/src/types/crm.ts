export interface Contact {
  id: string;
  businessId: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  tags: string[];
  customFields: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id: string;
  businessId: string;
  contactId: string;
  source?: string;
  score: number;
  stage: LeadStage;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type LeadStage =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal'
  | 'negotiation'
  | 'closed_won'
  | 'closed_lost';

export interface Deal {
  id: string;
  businessId: string;
  leadId?: string;
  title: string;
  value: number;
  currency: string;
  stage: DealStage;
  probability: number;
  expectedCloseDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type DealStage =
  | 'prospect'
  | 'qualification'
  | 'proposal'
  | 'negotiation'
  | 'closed_won'
  | 'closed_lost';

export interface Interaction {
  id: string;
  businessId: string;
  contactId: string;
  channel: 'whatsapp' | 'email' | 'phone' | 'meeting' | 'sms' | 'other';
  direction: 'inbound' | 'outbound';
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}
