import dotenv from 'dotenv'

dotenv.config();

const configKeys = {
    MONGO_URL : process.env.MONGO_URL as string,
    PORT : process.env.PORT || (3000 as number),
    APP_EMAIL : process.env.APP_EMAIL as string,
    APP_PASSWORD : process.env.APP_PASSWORD as string,
    ACCESS_SECRET : process.env.ACCESS_SECRET as string,
    ADMIN_EMAIL : process.env.ADMIN_EMAIL as string,
    ADMIN_PASSWORD : process.env.ADMIN_PASSWORD as string,
    CLIENT_ID : process.env.CLIENT_ID as string,
    CLIENT_URL:"http://localhost:5173",
    STRIPE_SECRET_KEY : "sk_test_51PaimnG8EaTCVCc3NGavGVvMCzXTACF41BI6zSJVd5wVQcTR1JB5E7cQn8zOD8cYfNjW4TkmuGMS61dkawv7W76r00pBRMB7u5"
}

export default configKeys