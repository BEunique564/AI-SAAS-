export interface MemoryEntry {
  type: 'working' | 'episodic' | 'semantic' | 'procedural' | 'emotional';
  content: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

export class MemoryManager {
  private workingMemory: Map<string, MemoryEntry[]> = new Map();

  async getContext(agentId: string, businessId: string): Promise<string> {
    const entries = this.workingMemory.get(`${businessId}:${agentId}`) || [];
    return entries.map((e) => e.content).join('\n');
  }

  async storeInteraction(
    agentId: string,
    businessId: string,
    interaction: { taskType: string; input: unknown; output: unknown },
  ): Promise<void> {
    const key = `${businessId}:${agentId}`;
    const entries = this.workingMemory.get(key) || [];
    entries.push({
      type: 'episodic',
      content: JSON.stringify(interaction),
      timestamp: new Date(),
    });
    if (entries.length > 100) {
      entries.splice(0, entries.length - 100);
    }
    this.workingMemory.set(key, entries);
  }

  async storeMemory(
    agentId: string,
    businessId: string,
    entry: Omit<MemoryEntry, 'timestamp'>,
  ): Promise<void> {
    const key = `${businessId}:${agentId}`;
    const entries = this.workingMemory.get(key) || [];
    entries.push({ ...entry, timestamp: new Date() });
    this.workingMemory.set(key, entries);
  }

  async clearWorkingMemory(agentId: string, businessId: string): Promise<void> {
    this.workingMemory.delete(`${businessId}:${agentId}`);
  }
}
