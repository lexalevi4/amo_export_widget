import { Redis } from 'ioredis';
import { cookies, headers } from 'next/headers'
import sha256 from 'sha256';
var crypto = require('crypto');


function getRedisClient() {

    return new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASS

    })
}

export function getSessionId() {
    const cookieStore = cookies();
    const headerStore = headers();
    // console.log(headerStore.forEach((v, k) => { console.log({ [k]: v }) }))
    return cookieStore.get("session-id")?.value;
}

function setSessionId(sessionId) {
    const cookieStore = cookies();
    cookieStore.set("session-id", sessionId);
}

export function getSessionIdAndCreateIfMissing() {
    const sessionId = getSessionId();
    if (!sessionId) {
        const newSessionId =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        setSessionId(newSessionId);

        return newSessionId;
    }


    return sessionId;
}

export async function get(key) {
    const sessionId = getSessionId();
    if (!sessionId) {
        return null;
    }
    const client = getRedisClient();
    try {
        await client.expire(process.env.REDIS_SESSION_PREFIX + sessionId, 86400)
    } catch (e) {

    }
    const result = await client.hget(process.env.REDIS_SESSION_PREFIX + sessionId, key)
    client.disconnect();
    return result;

    // return kv.hget(process.env.REDIS_SESSION_PREFIX + sessionId, key);
}

export async function getAll() {
    const sessionId = getSessionId();
    if (!sessionId) {
        return null;
    }
    const client = getRedisClient();
    try {
        await client.expire(process.env.REDIS_SESSION_PREFIX + sessionId, 86400)
    } catch (e) {

    }
    const result = await client.hgetall(process.env.REDIS_SESSION_PREFIX + sessionId)
    client.disconnect();
    return result;
    // return kv.hgetall(process.env.REDIS_SESSION_PREFIX + sessionId);
}

export async function set(key, value) {
    const sessionId = getSessionIdAndCreateIfMissing();
    const client = getRedisClient();
    await client.hset(process.env.REDIS_SESSION_PREFIX + sessionId, { [key]: value });
    await client.expire(process.env.REDIS_SESSION_PREFIX + sessionId, 86400);
    client.disconnect();
    return true;
    // return kv.hset(process.env.REDIS_SESSION_PREFIX + sessionId, { [key]: value });
}

export async function destroy() {
    const sessionId = getSessionIdAndCreateIfMissing();
    const client = getRedisClient();
    client.del(process.env.REDIS_SESSION_PREFIX + sessionId);
    client.disconnect();
}

export async function setAll(object) {
    const sessionId = getSessionIdAndCreateIfMissing();
    const client = getRedisClient();
    await client.hset(process.env.REDIS_SESSION_PREFIX + sessionId, object);
    await client.expire(process.env.REDIS_SESSION_PREFIX + sessionId, 86400)
    client.disconnect();
    return true;
    // return kv.hset(process.env.REDIS_SESSION_PREFIX + sessionId, { [key]: value });
}

export const getSign = async (salt = '') => {
    const timestamp = Math.ceil(Date.now() / 1000)
    const sessionId = getSessionId();
    if (!sessionId) {
        return null;
    }
    const data = await getAll();

    return {
        // sign: crypto.createHash('sha-256').update(data.account_id + '' + data.user_id + '' + sessionId + process.env.SESSION_SECRET + salt + '' + timestamp).digest('hex'),
        sign:sha256(data.account_id + '' + data.user_id + '' + sessionId + process.env.SESSION_SECRET + salt + '' + timestamp),
        timestamp: timestamp
    }

}

export const session = {

    set: set,
    get: get,
    setAll: setAll,
    getAll: getAll,
    getSign: getSign,
    destroy: destroy
};