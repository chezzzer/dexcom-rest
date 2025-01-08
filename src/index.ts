import { dexcomClient } from "./inc/DexcomClient";
import { fastify } from "./inc/Fastify";

fastify.get('/', async (req, res) => {
  return await dexcomClient.getEstimatedGlucoseValues();
})

try {
    await fastify.listen({ host: "0.0.0.0", port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }