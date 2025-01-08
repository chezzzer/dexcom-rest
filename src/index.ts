import { dexcomClient } from "./inc/DexcomClient";
import { fastify } from "./inc/Fastify";
import type { GlucoseEntry } from "../node_modules/dexcom-share-api/dist/types";

let cached_data: GlucoseEntry[] | null = null;

fastify.get("/", async (req, res) => {
    const values = cached_data;

    if (values === null) {
        res.status(500).send();
        return;
    }

    if (values.length > 0) {
        return values[0];
    }

    res.status(503).send();
});

fastify.get("/socket", { websocket: true }, (socket, req) => {
    let cached_timestamp = 0;

    const send = () => {
        if (cached_data === null || cached_data.length === 0) {
            return;
        }

        if (cached_timestamp !== cached_data[0].timestamp) {
            cached_timestamp = cached_data[0].timestamp;
            socket.send(JSON.stringify(cached_data[0]));
        }
    };

    send();
    setInterval(send, 1000);
});

const fetchGlucose = async () => {
    cached_data = await dexcomClient.getEstimatedGlucoseValues();
};

try {
    await fastify.listen({ host: "0.0.0.0", port: 3000 });

    fetchGlucose();
    setInterval(() => fetchGlucose(), 60000);
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
