import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  businessName: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request: any, reply: any) => {
    const body = registerSchema.parse(request.body);
    const token = app.jwt.sign({ userId: 'new', businessId: 'new' }, { expiresIn: '7d' });
    reply.setCookie('token', token, { httpOnly: true, path: '/', maxAge: 7 * 24 * 60 * 60 });
    return { token, user: { email: body.email, name: body.name } };
  });

  app.post('/login', async (request: any, reply: any) => {
    const body = loginSchema.parse(request.body);
    const token = app.jwt.sign({ userId: 'user-1', businessId: 'biz-1' }, { expiresIn: '7d' });
    reply.setCookie('token', token, { httpOnly: true, path: '/', maxAge: 7 * 24 * 60 * 60 });
    return { token, user: { email: body.email, name: 'User' } };
  });

  app.post('/logout', async (_request: any, reply: any) => {
    reply.clearCookie('token', { path: '/' });
    return { success: true };
  });

  app.get('/me', async (request: any, _reply: any) => {
    return { user: { id: request.userId, email: 'user@example.com', name: 'User', businessId: request.businessId } };
  });
}
