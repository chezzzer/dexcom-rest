import { dexcomClient } from "./inc/DexcomClient";
import { fastify } from "./inc/Fastify";

fastify.get('/', async (req, res) => {
  const values = await dexcomClient.getEstimatedGlucoseValues();

  if (values.length > 0) {
    return values[0];
  }

  res.status(503).send();
})

try {
    await fastify.listen({ host: "0.0.0.0", port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }