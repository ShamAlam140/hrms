// config.js

const config = {
    baseURL: 'https://hrms-sfl0.onrender.com',
    getSecureUrl: (url) => {
        if (!url) return '';
        if (Array.isArray(url)) {
            const first = url[0];
            if (typeof first === 'string') {
                return first.replace(/^http:\/\//i, 'https://');
            }
            return '';
        }
        if (typeof url !== 'string') {
            url = String(url);
        }
        return url.replace(/^http:\/\//i, 'https://');
    }
};

export default config;

