import Fastify from "fastify";
import cors from "@fastify/cors";
import ws from "@fastify/websocket";

export const fastify = Fastify({
    logger: true,
});
await fastify.register(cors);
await fastify.register(ws)