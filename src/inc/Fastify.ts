import Fastify from "fastify";
import cors from "@fastify/cors";

export const fastify = Fastify({
    logger: true,
});
await fastify.register(cors, {
    origin: ["chezzer.dev", "localhost:3000"],
});
