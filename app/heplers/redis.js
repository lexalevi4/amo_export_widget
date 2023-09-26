import { Redis } from "ioredis"

async function getRedisClient() {

    return new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASS,
    })
}



export { getRedisClient }