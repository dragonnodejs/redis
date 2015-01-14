"use strict";

/**
 * Initialize cache service to abstract the caching logic with redis
 * @example
    cache: {}
 */

module.exports = function (config, libraries, services) {
    var client = services.client;

    var cache = function (key, fallback, callback) {
        client.getJSON(key, function (err, value) {
            var hit = true;
            if (value) {
                if (callback(value, hit)) {
                    hit = false;
                };
            } else {
                hit = false;
            }
            if (!hit) {
                fallback(function (value) {
                    callback(value);
                    client.setJSON(key, value);
                });
            }
        });
    };

    services.cache = cache;
};
