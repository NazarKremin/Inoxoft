module.exports = {
    PORT: 5000,
    MONGO_URL: 'mongodb://localhost:27017/inoxoft',
    FORGET_PASS_FRONT_URL: 'http://localhost:5000',
    ADMIN_PASSWORD_SET: 'http://localhost:5000',

    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
    JWT_FORGOT_PASS_TOKEN: process.env.JWT_FORGOT_PASS_TOKEN || 'ACTION TOKEN',

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'inox0ftest@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'otestetstets',

    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY
};