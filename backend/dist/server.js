import fastify from 'fastify';
import { routes } from './routes';
import cors from '@fastify/cors';

const app = fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  await app.register(cors);
  await app.register(routes);

  try {
    await app.listen({ 
      port: parseInt(process.env.PORT || '8080'), 
      host: '0.0.0.0' 
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();