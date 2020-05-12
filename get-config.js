
module.exports = function getConfig() {
    const configPath = process.cwd() + '/src/config';
    const cbaseEnv = process.env.CBASE_ENV || process.env.NODE_ENV || 'development';
    try {
        const config = require(configPath)(cbaseEnv);
        return config;
    } catch (e) {
        if (e.code == 'MODULE_NOT_FOUND') {
            if (process.env.NEAR_DEBUG) {
                // TODO: Use debug module instead, see https://github.com/near/near-api-js/pull/250
                console.warn(`[WARNING] Didn't find config at ${configPath}, using default shell config`);
            }
            const defaultConfig = require('./config')(cbaseEnv);
            return defaultConfig;
        }
        throw e;
    }
};
