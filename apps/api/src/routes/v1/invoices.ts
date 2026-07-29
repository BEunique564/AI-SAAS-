import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

const createInvoiceSchema = z.object({
  contactId: z.string(),
  items: z.array(z.object({
    description: z.string(),
    quantity: z.number().positive(),
    unitPrice: z.number().positive(),
  })),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
});

export async function invoiceRoutes(app: FastifyInstance) {
  app.get('/', async () => ({ invoices: [], total: 0 }));

  app.post('/', async (request: any, reply: any) => {
    const body = createInvoiceSchema.parse(request.body);
    const total = body.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const invoice = {
      id: crypto.randomUUID(),
      number: `INV-${Date.now()}`,
      ...body,
      total,
      status: 'pending',
      businessId: request.businessId,
    };
    reply.status(201);
    return { invoice };
  });

  app.get('/:id', async (request: any) => {
    const { id } = request.params as { id: string };
    return { invoice: { id, status: 'pending', businessId: request.businessId } };
  });

  app.post('/:id/send', async (request: any) => {
    const { id } = request.params as { id: string };
    return { success: true, invoiceId: id };
  });
}
