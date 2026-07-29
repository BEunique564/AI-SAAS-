import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

const createContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  tags: z.array(z.string()).default([]),
  customFields: z.record(z.unknown()).default({}),
});

export async function contactRoutes(app: FastifyInstance) {
  app.get('/', async (_request: any) => {
    return { contacts: [], total: 0 };
  });

  app.post('/', async (request: any, reply: any) => {
    const body = createContactSchema.parse(request.body);
    const contact = { id: crypto.randomUUID(), ...body, businessId: request.businessId, createdAt: new Date() };
    reply.status(201);
    return { contact };
  });

  app.get('/:id', async (request: any) => {
    const { id } = request.params as { id: string };
    return { contact: { id, name: 'Sample', businessId: request.businessId } };
  });

  app.put('/:id', async (request: any) => {
    const { id } = request.params as { id: string };
    const body = createContactSchema.partial().parse(request.body);
    return { contact: { id, ...body } };
  });

  app.delete('/:id', async (_request: any, reply: any) => {
    reply.status(204);
  });
}
