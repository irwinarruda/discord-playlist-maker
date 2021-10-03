const authConfig = {
    privateKey: process.env.APP_SECRET || 'default',
    expiresIn: '1d',
};

export { authConfig };
