module.exports = {
    PORT: 5000,
    MONGO_URL: 'mongodb://localhost:27017/inoxoft',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
};