import { z } from 'zod';

export const TaskComplexity = z.enum(['simple', 'medium', 'complex', 'code', 'creative']);
export type TaskComplexity = z.infer<typeof TaskComplexity>;

export interface ModelConfig {
  model: string;
  provider: 'openai' | 'anthropic' | 'google' | 'local';
  maxTokens: number;
  temperature: number;
  costPerMillionInput: number;
  costPerMillionOutput: number;
}

const MODEL_CONFIGS: Record<string, ModelConfig> = {
  'gpt-4o-mini': {
    model: 'gpt-4o-mini',
    provider: 'openai',
    maxTokens: 4096,
    temperature: 0.1,
    costPerMillionInput: 0.15,
    costPerMillionOutput: 0.60,
  },
  'gpt-4o': {
    model: 'gpt-4o',
    provider: 'openai',
    maxTokens: 4096,
    temperature: 0.5,
    costPerMillionInput: 2.50,
    costPerMillionOutput: 10.00,
  },
  'claude-3-5-sonnet': {
    model: 'claude-3-5-sonnet-20241022',
    provider: 'anthropic',
    maxTokens: 4096,
    temperature: 0.5,
    costPerMillionInput: 3.00,
    costPerMillionOutput: 15.00,
  },
  'claude-3-5-haiku': {
    model: 'claude-3-5-haiku-20241022',
    provider: 'anthropic',
    maxTokens: 4096,
    temperature: 0.3,
    costPerMillionInput: 0.25,
    costPerMillionOutput: 1.25,
  },
};

const ROUTING_RULES: Record<string, string> = {
  'lead_classification': 'gpt-4o-mini',
  'email_drafting': 'claude-3-5-sonnet',
  'proposal_generation': 'claude-3-5-sonnet',
  'invoice_processing': 'gpt-4o-mini',
  'customer_support': 'gpt-4o',
  'report_generation': 'gpt-4o',
  'contract_review': 'claude-3-5-sonnet',
  'meeting_summary': 'gpt-4o-mini',
  'translation': 'gpt-4o',
  'code_generation': 'claude-3-5-sonnet',
  'creative_content': 'claude-3-5-sonnet',
};

const FALLBACK_CHAIN: Record<string, string[]> = {
  'gpt-4o-mini': ['claude-3-5-haiku', 'gpt-4o'],
  'gpt-4o': ['claude-3-5-sonnet', 'gpt-4o-mini'],
  'claude-3-5-sonnet': ['gpt-4o', 'claude-3-5-haiku'],
  'claude-3-5-haiku': ['gpt-4o-mini', 'claude-3-5-sonnet'],
};

export class ModelRouter {
  private dailyBudgetPerTenant: Map<string, number> = new Map();
  private dailySpend: Map<string, number> = new Map();

  selectModel(taskType: string, tenantId?: string): ModelConfig {
    const preferredModel = ROUTING_RULES[taskType] || 'gpt-4o-mini';

    if (tenantId) {
      const budget = this.dailyBudgetPerTenant.get(tenantId) || Infinity;
      const spent = this.dailySpend.get(tenantId) || 0;
      if (spent > budget) {
        return MODEL_CONFIGS['gpt-4o-mini'];
      }
    }

    return MODEL_CONFIGS[preferredModel] || MODEL_CONFIGS['gpt-4o-mini'];
  }

  getFallbacks(model: string): ModelConfig[] {
    const fallbacks = FALLBACK_CHAIN[model] || ['gpt-4o-mini'];
    return fallbacks.map((m) => MODEL_CONFIGS[m]).filter(Boolean);
  }

  trackCost(tenantId: string, model: string, inputTokens: number, outputTokens: number): number {
    const config = MODEL_CONFIGS[model];
    if (!config) return 0;
    const cost =
      (inputTokens / 1_000_000) * config.costPerMillionInput +
      (outputTokens / 1_000_000) * config.costPerMillionOutput;
    const current = this.dailySpend.get(tenantId) || 0;
    this.dailySpend.set(tenantId, current + cost);
    return cost;
  }

  setBudget(tenantId: string, dailyBudget: number): void {
    this.dailyBudgetPerTenant.set(tenantId, dailyBudget);
  }

  getDailySpend(tenantId: string): number {
    return this.dailySpend.get(tenantId) || 0;
  }
}
