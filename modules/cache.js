'use strict';

/**
 * Initialize cache service to abstract the caching logic with Redis
 * @example
    ['modules/cache', {
        disabled: process.env.CACHE_DISABLED
    }]
 */

module.exports = (config, libraries, services) => {
    let client = services.client;

    /**
     * Separate load and use a value with a cache layer
     * @example
        let cache = services.cache;
        cache(
            'key',
            callback => {
                // load the value
                let value;
                callback(value);
            },
            value => {
                // use the value
            }
        );
     */
    let cache = (key, fallback, callback, options) => {
        if (config.disabled) {
            fallback(callback);
            return;
        }
        options = options || {};
        client.getJSON(key, (err, value) => {
            let hit = true;
            if (value) {
                if (callback(value, hit)) {
                    hit = false;
                }
            } else {
                hit = false;
            }
            if (!hit) {
                fallback(value => {
                    callback(value);
                    client.setJSON(key, value, err => {
                        if (err) {
                            return;
                        }
                        if (options.expire) {
                            client.expire(key, options.expire);
                        }
                    });
                });
            }
        });
    };

    services.cache = cache;
};
