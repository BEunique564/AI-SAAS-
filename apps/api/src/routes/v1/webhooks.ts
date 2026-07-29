import type { FastifyInstance } from 'fastify';

export async function webhookRoutes(app: FastifyInstance) {
  app.post('/whatsapp', async (request: any, _reply: any) => {
    const body = request.body as Record<string, unknown>;
    if (body['hub.mode'] === 'subscribe') {
      return { 'hub.challenge': body['hub.challenge'] };
    }
    return { status: 'ok' };
  });

  app.post('/razorpay', async (_request: any, _reply: any) => {
    return { status: 'ok' };
  });

  app.post('/email', async (_request: any, _reply: any) => {
    return { status: 'ok' };
  });
}
