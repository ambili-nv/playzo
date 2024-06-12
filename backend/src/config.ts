import dotenv from 'dotenv'

dotenv.config();

const configKeys = {
    MONGO_URL : process.env.MONGO_URL as string,
    PORT : process.env.PORT || (3000 as number)
}

export default configKeys