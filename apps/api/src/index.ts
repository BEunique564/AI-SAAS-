import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
import cookie from '@fastify/cookie';
import { authRoutes } from './routes/v1/auth.js';
import { contactRoutes } from './routes/v1/contacts.js';
import { leadRoutes } from './routes/v1/leads.js';
import { dealRoutes } from './routes/v1/deals.js';
import { invoiceRoutes } from './routes/v1/invoices.js';
import { agentRoutes } from './routes/v1/agents.js';
import { conversationRoutes } from './routes/v1/conversations.js';
import { analyticsRoutes } from './routes/v1/analytics.js';
import { webhookRoutes } from './routes/v1/webhooks.js';
import { errorHandler } from './middleware/error-handler.js';
import { authMiddleware } from './middleware/auth.js';
import { logger } from './config/logger.js';

const app = Fastify({
  logger: logger,
  bodyLimit: 10 * 1024 * 1024,
});

await app.register(cors, {
  origin: process.env.APP_URL || 'http://localhost:3000',
  credentials: true,
});

await app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

await app.register(jwt, {
  secret: process.env.AUTH_SECRET || 'dev-secret-change-in-production',
  sign: { expiresIn: '7d' },
});

await app.register(cookie);

app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));
app.get('/api/v1/health', async () => ({ status: 'ok', version: '0.1.0' }));

await app.register(authRoutes, { prefix: '/api/v1/auth' });

await app.register(async (protectedApp) => {
  protectedApp.addHook('onRequest', authMiddleware);
  await protectedApp.register(contactRoutes, { prefix: '/api/v1/contacts' });
  await protectedApp.register(leadRoutes, { prefix: '/api/v1/leads' });
  await protectedApp.register(dealRoutes, { prefix: '/api/v1/deals' });
  await protectedApp.register(invoiceRoutes, { prefix: '/api/v1/invoices' });
  await protectedApp.register(agentRoutes, { prefix: '/api/v1/agents' });
  await protectedApp.register(conversationRoutes, { prefix: '/api/v1/conversations' });
  await protectedApp.register(analyticsRoutes, { prefix: '/api/v1/analytics' });
});

await app.register(webhookRoutes, { prefix: '/api/v1/webhooks' });

app.setErrorHandler(errorHandler);

const port = parseInt(process.env.PORT || '3001', 10);
const host = process.env.HOST || '0.0.0.0';

try {
  await app.listen({ port, host });
  app.log.info(`Server running on http://${host}:${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
