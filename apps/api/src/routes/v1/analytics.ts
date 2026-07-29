import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function analyticsRoutes(app: FastifyInstance) {
  app.get('/dashboard', async () => ({
    revenue: { current: 420000, previous: 375000, change: 12 },
    leads: { current: 47, previous: 38, change: 23.7 },
    tickets: { current: 12, previous: 13, change: -7.7 },
    tasks: { current: 8, due: 2 },
  }));

  app.get('/reports', async () => ({ reports: [] }));

  app.post('/query', async (request: any) => {
    const { query } = z.object({ query: z.string() }).parse(request.body);
    return { answer: `Analytics result for: ${query}`, data: [] };
  });
}
