export interface Agent {
  id: string;
  businessId: string;
  type: AgentType;
  name: string;
  config: AgentConfig;
  prompt: string;
  tools: string[];
  permissions: Record<string, boolean>;
  status: 'active' | 'inactive' | 'error';
  createdAt: Date;
  updatedAt: Date;
}

export type AgentType =
  | 'ceo_dashboard'
  | 'receptionist'
  | 'sales_executive'
  | 'crm_manager'
  | 'whatsapp_agent'
  | 'email_manager'
  | 'recruiter'
  | 'hr_manager'
  | 'accountant'
  | 'marketing_manager'
  | 'customer_support'
  | 'proposal_generator'
  | 'contract_reviewer'
  | 'operations_manager'
  | 'report_generator'
  | 'compliance_officer'
  | 'knowledge_assistant'
  | 'project_manager'
  | 'meeting_assistant'
  | 'call_summary'
  | 'lead_qualification'
  | 'analytics_agent'
  | 'inventory_manager'
  | 'procurement_assistant'
  | 'finance_copilot';

export interface AgentConfig {
  temperature?: number;
  maxTokens?: number;
  model?: string;
  personality?: {
    tone: 'professional' | 'friendly' | 'formal' | 'casual';
    formality: 'low' | 'medium' | 'high';
    language: string;
  };
  guardrails?: {
    maxDiscountPercent?: number;
    maxDealValue?: number;
    escalationContact?: string;
  };
}

export interface Conversation {
  id: string;
  businessId: string;
  agentId: string;
  contactId?: string;
  channel: 'whatsapp' | 'email' | 'web' | 'voice' | 'api';
  status: 'active' | 'closed' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  metadata?: {
    tokensUsed?: number;
    model?: string;
    cost?: number;
    toolCalls?: ToolCall[];
  };
  createdAt: Date;
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
  result?: unknown;
}

export interface AgentMemory {
  id: string;
  agentId: string;
  type: 'working' | 'episodic' | 'semantic' | 'procedural' | 'emotional';
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
