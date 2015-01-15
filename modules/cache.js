"use strict";

/**
 * Initialize cache service to abstract the caching logic with redis
 * @example
    cache: { disabled: false }
 */

module.exports = function (config, libraries, services) {
    var client = services.client;

    var cache = function (key, fallback, callback, options) {
        options = options || {};
        client.getJSON(key, function (err, value) {
            var hit = true;
            if (value && !config.disabled) {
                if (callback(value, hit)) {
                    hit = false;
                };
            } else {
                hit = false;
            }
            if (!hit) {
                fallback(function (value) {
                    callback(value);
                    client.setJSON(key, value, function (err) {
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
