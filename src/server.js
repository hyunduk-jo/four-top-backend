import { GraphQLServer } from 'graphql-yoga';
import './env';
import { authenticateJwt } from './passport';
import schema from './schema';
import { isAuthenticated } from './middleware';
import { uploadAController, uploadAMiddleware, uploadController, uploadMiddleware } from './upload';
import logger from 'morgan';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema, context: ({ request }) => ({ request, isAuthenticated }) });

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);
server.express.post("/api/avatar", uploadAMiddleware, uploadAController);

server.start({ port: PORT }, () => console.log(`Server Running On http://localhost:${PORT}`));