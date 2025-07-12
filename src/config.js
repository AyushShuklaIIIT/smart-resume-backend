import 'dotenv/config';

export const config = {
    server: {
        port: process.env.PORT || 3001,
    },
    database: {
        uri: process.env.MONGO_URI,
    },
    cors: {
        clientUrl: process.env.CLIENT_URL
    }
}