import RedisStore from 'connect-redis';
import { Redis } from 'ioredis';
import nextAppSession, { promisifyStore } from 'next-app-session';

// Your session data type
// type MySessionData = {
//    access_token?: string;
//    counter?: number;
// }

// Setup the config for your session and cookie
export const session = nextAppSession({
    // Options
    name: 'SID',
    secret: process.env.SESSION_SECRET,
    store: promisifyStore(
        new RedisStore({
            client: new Redis({
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
                password: process.env.REDIS_PASS

            }),
            prefix: 'amo_widget:'
        })
    )
    //    ...
}); 