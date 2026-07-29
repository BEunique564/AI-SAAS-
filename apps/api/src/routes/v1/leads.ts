import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

const createLeadSchema = z.object({
  contactId: z.string(),
  source: z.string().optional(),
  score: z.number().min(0).max(100).default(0),
  stage: z.string().default('new'),
});

export async function leadRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return { leads: [], total: 0 };
  });

  app.post('/', async (request: any, reply: any) => {
    const body = createLeadSchema.parse(request.body);
    const lead = { id: crypto.randomUUID(), ...body, businessId: request.businessId };
    reply.status(201);
    return { lead };
  });

  app.put('/:id', async (request: any) => {
    const { id } = request.params as { id: string };
    const body = createLeadSchema.partial().parse(request.body);
    return { lead: { id, ...body } };
  });

  app.post('/:id/qualify', async (request: any) => {
    const { id } = request.params as { id: string };
    return { lead: { id, score: 75, stage: 'qualified' } };
  });
}
