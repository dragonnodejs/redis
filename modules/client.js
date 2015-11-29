'use strict';

/**
 * Initialize client service with the Redis connection
 * @example
    ['client', { createClient: [process.env.REDISCLOUD_URL] }]
 */

module.exports = (config, libraries, services) => {
    services.client = libraries.redis.createClient.apply(undefined, config.createClient);
};
