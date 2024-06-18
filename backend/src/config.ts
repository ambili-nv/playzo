import dotenv from 'dotenv'

dotenv.config();

const configKeys = {
    MONGO_URL : process.env.MONGO_URL as string,
    PORT : process.env.PORT || (3000 as number),
    APP_EMAIL : process.env.APP_EMAIL as string,
    APP_PASSWORD : process.env.APP_PASSWORD as string,
    ACCESS_SECRET : process.env.ACCESS_SECRET as string,
    ADMIN_EMAIL : process.env.ADMIN_EMAIL as string,
    ADMIN_PASSWORD : process.env.ADMIN_PASSWORD as string
}

export default configKeys