// config.js

const config = {
    baseURL: 'https://hrms-sfl0.onrender.com',
    getSecureUrl: (url) => {
        if (!url) return '';
        return url.replace(/^http:\/\//i, 'https://');
    }
};

export default config;

