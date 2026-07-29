import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

const agentConfigSchema = z.object({
  type: z.string(),
  name: z.string(),
  config: z.record(z.unknown()).default({}),
  prompt: z.string(),
  tools: z.array(z.string()).default([]),
  permissions: z.record(z.boolean()).default({}),
});

export async function agentRoutes(app: FastifyInstance) {
  app.get('/', async () => ({ agents: [] }));

  app.post('/', async (request: any, reply: any) => {
    const body = agentConfigSchema.parse(request.body);
    const agent = { id: crypto.randomUUID(), ...body, businessId: request.businessId, status: 'active' };
    reply.status(201);
    return { agent };
  });

  app.put('/:id/config', async (request: any) => {
    const { id } = request.params as { id: string };
    const body = agentConfigSchema.partial().parse(request.body);
    return { agent: { id, ...body } };
  });

  app.post('/:id/test', async (request: any) => {
    const { id } = request.params as { id: string };
    z.object({ message: z.string() }).parse(request.body);
    return { response: `Test response from agent ${id}`, tokens: 50 };
  });
}
