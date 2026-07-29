import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function conversationRoutes(app: FastifyInstance) {
  app.get('/', async () => ({ conversations: [] }));

  app.post('/', async (request: any, reply: any) => {
    const { contactId, channel } = z.object({
      contactId: z.string(),
      channel: z.string(),
    }).parse(request.body);
    const conversation = { id: crypto.randomUUID(), contactId, channel, businessId: request.businessId };
    reply.status(201);
    return { conversation };
  });

  app.get('/:id/messages', async () => ({ messages: [] }));

  app.post('/:id/messages', async (request: any) => {
    const { id } = request.params as { id: string };
    const { content } = z.object({ content: z.string() }).parse(request.body);
    const message = { id: crypto.randomUUID(), conversationId: id, role: 'user', content };
    return { message };
  });
}
