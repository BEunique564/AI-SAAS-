import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

const createDealSchema = z.object({
  leadId: z.string().optional(),
  title: z.string().min(1),
  value: z.number().positive(),
  stage: z.string().default('prospect'),
  probability: z.number().min(0).max(100).default(0),
});

export async function dealRoutes(app: FastifyInstance) {
  app.get('/', async () => ({ deals: [], total: 0 }));

  app.post('/', async (request: any, reply: any) => {
    const body = createDealSchema.parse(request.body);
    const deal = { id: crypto.randomUUID(), ...body, businessId: request.businessId };
    reply.status(201);
    return { deal };
  });

  app.put('/:id', async (request: any) => {
    const { id } = request.params as { id: string };
    const body = createDealSchema.partial().parse(request.body);
    return { deal: { id, ...body } };
  });

  app.put('/:id/stage', async (request: any) => {
    const { id } = request.params as { id: string };
    const { stage } = z.object({ stage: z.string() }).parse(request.body);
    return { deal: { id, stage } };
  });
}
