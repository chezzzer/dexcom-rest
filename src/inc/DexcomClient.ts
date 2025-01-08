// @ts-ignore
import {DexcomClient} from "dexcom-share-api";
import type {DexcomClient as Type} from '../../node_modules/dexcom-share-api/dist/index';

export const dexcomClient = new DexcomClient({
    username: Bun.env.CLARITY_EMAIL,
    password: Bun.env.CLARITY_PASSWORD,
    server: "eu",
}) as Type;