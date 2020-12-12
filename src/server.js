import { GraphQLServer } from 'graphql-yoga';
import './env';
import { authenticateJwt } from './passport';
import schema from './schema';
import { isAuthenticated } from './middleware';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema, context: ({ request }) => ({ request, isAuthenticated }) });

server.express.use(authenticateJwt);

server.start({ port: PORT }, () => console.log(`Server Running On http://localhost:${PORT}`));