// @ts-ignore
import {DexcomClient} from "dexcom-share-api";
import type {DexcomClient as Type} from './node_modules/dexcom-share-api/dist/index';

const client = new DexcomClient({
    username: Bun.env.CLARITY_EMAIL,
    password: Bun.env.CLARITY_PASSWORD,
    server: "eu",
}) as Type;

const test = await client.getEstimatedGlucoseValues()
console.log(test);