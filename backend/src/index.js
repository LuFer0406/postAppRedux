// Importación de paquetes
import Fastify from "fastify";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";

// Importación de la base de datos 
import { connectDb } from "./database.js";
import { postRoutes } from "./routes/post.routes.js";

// Conexión a la base de datos
connectDb();

// Crear el servidor de Fastify
const fastify = Fastify({
  logger: true,
});

// Regístrar y modificar los paquetes
fastify.register(cors, { origin: "*" });
fastify.register(formBody);

// Regístrar las rutas
fastify.register(postRoutes, {prefix: "/post"})

// Función para inicializar el servidor
const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: "0.0.0.0" });
    console.log("El servidor está escuchando por el puerto 4000");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

// Inicializar el servidor
start();