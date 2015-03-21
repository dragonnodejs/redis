'use strict';

/**
 * Initialize cache service to abstract the caching logic with Redis
 * @example
    cache: {
        disabled: false
    }
 */

module.exports = function (config, libraries, services) {
    var client = services.client;

    /**
     * Separate load and use a value with a cache layer
     * @example
        var cache = services.cache;
        cache(
            'key',
            function (callback) {
                // load the value
                var value;
                callback(value);
            },
            function (value) {
                // use the value
            }
        );
     */
    var cache = function (key, fallback, callback, options) {
        if (config.disabled) {
            fallback(callback);
            return;
        }
        options = options || {};
        client.getJSON(key, function (err, value) {
            var hit = true;
            if (value) {
                if (callback(value, hit)) {
                    hit = false;
                }
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
