import type { FastifyRequest, FastifyReply } from 'fastify';

interface JwtPayload {
  userId: string;
  businessId: string;
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const cookies = (request as any).cookies as Record<string, string> | undefined;
    const token = cookies?.token || request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }
    const server = request.server as any;
    const decoded: JwtPayload = server.jwt.verify(token);
    (request as any).userId = decoded.userId;
    (request as any).businessId = decoded.businessId;
  } catch {
    return reply.status(401).send({ error: 'Invalid token' });
  }
}
