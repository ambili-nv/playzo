import dotenv from 'dotenv'

dotenv.config();

const configKeys = {
    MONGO_URL : process.env.MONGO_URL as string,
    PORT : process.env.PORT || (3000 as number),
    APP_EMAIL : process.env.APP_EMAIL as string,
    APP_PASSWORD : process.env.APP_PASSWORD as string
}

export default configKeys