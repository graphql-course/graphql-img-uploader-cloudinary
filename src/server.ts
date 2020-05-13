// Añadir los imports
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import schema from './schema/schema';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import environments from './config/environments';
import expressPlayGround from 'graphql-playground-middleware-express';
const cloudinary = require('cloudinary');
import Upload from './config/upload';
async function init() {
    // Inicializar variables de entorno
    if (process.env.NODE_ENV !== 'production') {
        const envs = environments;
        console.log(envs);
    }

    // Inicializamos la aplicación express

    const app = express();

    await cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    // Añadimos configuración de Cors y compression
    app.use('*', cors());

    app.use(compression());

    const context: any = async() => {
        return { cloudinary };
    };

    // Inicializamos el servidor de Apollo
    const server = new ApolloServer({
        schema: schema,
        introspection: true, // Necesario
        context,
        uploads: Upload
    });

    server.applyMiddleware({ app });

    app.use('/', expressPlayGround({
        endpoint: '/graphql'
    }));

    const PORT = process.env.PORT || 5000;
    const httpServer = createServer(app);

    httpServer.listen({ port: PORT }, (): void => console.log(`http://localhost:${PORT}/graphql`));
}

init();
