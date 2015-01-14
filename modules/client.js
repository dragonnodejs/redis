"use strict";

/**
 * Initialize client service with the redis connection
 * @example
    client: {
        port: 6379,
        host: '127.0.0.1',
        options: {}
    }
 */

module.exports = function (config, libraries, services) {
    var redis = libraries.redis;

    var client = redis.createClient(config.port, config.host, config.options);
    client.setJSON = function (key, value, callback) {
        value = JSON.stringify(value);
        client.set(key, value, callback);
    };
    client.getJSON = function (key, callback) {
        client.get(key, function (err, value) {
            if (value) {
                value = JSON.parse(value);
            }
            callback(err, value);
        });
    };

    services.client = client;
};
