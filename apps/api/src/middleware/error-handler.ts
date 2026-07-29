import { ZodError } from 'zod';

export function errorHandler(
  error: any,
  request: any,
  reply: any,
) {
  request.log.error(error);

  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: 'Validation Error',
      details: error.errors,
    });
  }

  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : error.message;

  return reply.status(statusCode).send({ error: message });
}
