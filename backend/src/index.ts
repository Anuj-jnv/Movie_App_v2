import Fastify from 'fastify';
import connectDB from './config/db.js';
import { userRoutes } from './routes/user.routes.js';
import { movieRoutes } from './routes/movie.routes.js';
import { genreRoutes } from './routes/genre.routes.js';

const fastify = Fastify({
  logger: true,        
});

fastify.register(connectDB);
fastify.register(userRoutes);
fastify.register(movieRoutes);
fastify.register(genreRoutes);

fastify.get('/', async () => {
  return { message: 'Fastify server is running' };
});

// start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
