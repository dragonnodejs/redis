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

    config.options = config.options || {};
    if (config.unix_socket) {
        var client = redis.createClient(config.unix_socket, config.options);
    } else if (config.port && config.host) {
        var client = redis.createClient(config.port, config.host, config.options);
    } else {
        var client = redis.createClient(config.options);
    }
    if (config.password) {
        client.auth(config.password);
    }
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
