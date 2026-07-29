import { ModelRouter, type TaskComplexity } from './model-router.js';
import { MemoryManager } from '../memory/index.js';

export interface AgentTask {
  id: string;
  type: string;
  input: Record<string, unknown>;
  agentId: string;
  businessId: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'running' | 'completed' | 'failed';
}

export interface AgentResult {
  taskId: string;
  output: unknown;
  tokensUsed: number;
  model: string;
  cost: number;
  duration: number;
  error?: string;
}

export class AgentOrchestrator {
  private modelRouter: ModelRouter;
  private memory: MemoryManager;

  constructor() {
    this.modelRouter = new ModelRouter();
    this.memory = new MemoryManager();
  }

  async executeTask(task: AgentTask): Promise<AgentResult> {
    const startTime = Date.now();

    const modelConfig = this.modelRouter.selectModel(task.type, task.businessId);

    try {
      const context = await this.memory.getContext(task.agentId, task.businessId);

      const result = await this.callModel(modelConfig, task, context);

      const cost = this.modelRouter.trackCost(
        task.businessId,
        modelConfig.model,
        result.inputTokens,
        result.outputTokens,
      );

      await this.memory.storeInteraction(task.agentId, task.businessId, {
        taskType: task.type,
        input: task.input,
        output: result.output,
      });

      return {
        taskId: task.id,
        output: result.output,
        tokensUsed: result.inputTokens + result.outputTokens,
        model: modelConfig.model,
        cost,
        duration: Date.now() - startTime,
      };
    } catch (error) {
      const fallbacks = this.modelRouter.getFallbacks(modelConfig.model);
      for (const fallback of fallbacks) {
        try {
          const result = await this.callModel(fallback, task, '');
          return {
            taskId: task.id,
            output: result.output,
            tokensUsed: result.inputTokens + result.outputTokens,
            model: fallback.model,
            cost: 0,
            duration: Date.now() - startTime,
          };
        } catch {
          continue;
        }
      }

      return {
        taskId: task.id,
        output: null,
        tokensUsed: 0,
        model: modelConfig.model,
        cost: 0,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async callModel(
    config: any,
    task: AgentTask,
    context: string,
  ): Promise<{ output: string; inputTokens: number; outputTokens: number }> {
    // TODO: Implement actual LLM call via LiteLLM gateway
    // For now, return a mock response
    return {
      output: `Mock response for task ${task.type}`,
      inputTokens: 100,
      outputTokens: 50,
    };
  }
}
