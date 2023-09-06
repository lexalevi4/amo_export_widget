import { Redis } from 'ioredis';
import { cookies, headers } from 'next/headers'
import sha256 from 'sha256';
var crypto = require('crypto');
// import { createClient } from 'redis'


async function getRedisClient() {

    // let client = createClient({
    //     password: process.env.REDIS_PASS,
    //     socket: {
    //         host: process.env.REDIS_HOST,
    //         port: process.env.REDIS_PORT,
    //         // reconnectStrategy: retries => Math.min(retries * 50, 1000)
    //     }
    // }
    // )
    // await client.connect();
    // return client;

    return new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASS,
        // lazyConnect: true,
        // connectTimeout: 60,


        // destroy
        // laz
        // lazyConnect: true,

    })
}

export function getSessionId() {
    const cookieStore = cookies();
    // console.log(headerStore.forEach((v, k) => { console.log({ [k]: v }) }))
    return cookieStore.get('session_id')?.value;
}

function setSessionId(sessionId) {
    const cookieStore = cookies();
    // cookieStore.set("session_id", sessionId, { SameSite: 'none', });
    cookieStore.set({
        name: 'session_id',
        value: sessionId,
        sameSite: 'none',
        secure: true,
        httpOnly: true

    });
}

export function getSessionIdAndCreateIfMissing() {
    const sessionId = getSessionId();
    if (!sessionId || sessionId === 'undefined') {
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
    let client = await getRedisClient();

    try {
        await client.expire(process.env.REDIS_SESSION_PREFIX + sessionId, 86400)
    } catch (e) {

    }
    const result = await client.hget(process.env.REDIS_SESSION_PREFIX + sessionId, key)
    await client.quit();
    // await client.disconnect();

    return result;

    // return kv.hget(process.env.REDIS_SESSION_PREFIX + sessionId, key);
}

export async function getAll() {
    const sessionId = getSessionId();
    // console.log('from getAll ' + sessionId)
    // const cookieStore = cookies();
    // console.log('session_id:' + sessionId)
    // console.log(cookieStore.getAll());
    // console.log('session_id:' + sessionId)


    // console.log('_______________________')
    // console.log(cookieStore.get('session_id').value)
    // console.log('_______________________')


    if (!sessionId) {
        return null;
    }
    let client = await getRedisClient();
    try {
        await client.expire(process.env.REDIS_SESSION_PREFIX + sessionId, 86400)
    } catch (e) {

    }
    const result = await client.hgetall(process.env.REDIS_SESSION_PREFIX + sessionId)
    await client.quit();
    // await client.disconnect();
    return result;
    // return kv.hgetall(process.env.REDIS_SESSION_PREFIX + sessionId);
}

export async function set(key, value) {
    const sessionId = getSessionIdAndCreateIfMissing();
    let client = await getRedisClient();
    await client.hset(process.env.REDIS_SESSION_PREFIX + sessionId, { [key]: value });
    await client.expire(process.env.REDIS_SESSION_PREFIX + sessionId, 86400);
    await client.quit();
    // await client.disconnect();
    return true;
    // return kv.hset(process.env.REDIS_SESSION_PREFIX + sessionId, { [key]: value });
}

export async function destroy() {
    const sessionId = getSessionIdAndCreateIfMissing();
    let client = await getRedisClient();
    await client.del(process.env.REDIS_SESSION_PREFIX + sessionId);
    await client.quit();
    // delete client;
    // await client.disconnect();
}

export async function setAll(object) {
    // console.log('1');
    const sessionId = getSessionIdAndCreateIfMissing();
    // console.log('2');
    let client = await getRedisClient();
    // console.log('3');
    // console.log(process.env.REDIS_SESSION_PREFIX + sessionId);

    let result = await client.hset(process.env.REDIS_SESSION_PREFIX + sessionId, object);
    // console.log(result);
    // console.log(object);
    // console.log('asdfasdf');
    await client.expire(process.env.REDIS_SESSION_PREFIX + sessionId, 86400);
    await client.quit();
    // await client.disconnect();
    // await client.disconnect();
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
        sign: sha256(data.account_id + '' + data.user_id + '' + sessionId + process.env.SESSION_SECRET + salt + '' + timestamp),
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