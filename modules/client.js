"use strict";
/*global module:false */

/**
 * Initialize client service with the Redis connection
 * @example
    client: {
        port: 6379,
        host: '127.0.0.1',
        options: {}
    }
 */

module.exports = function (config, libraries, services) {
    var redis = libraries.redis,
        url = libraries.url;

    config.options = config.options || {};
    if (config.uri) {
        var redisURL = url.parse(config.uri);
        config.port = redisURL.port;
        config.host = redisURL.hostname;
        if (redisURL.auth) {
            config.password = redisURL.auth.split(':')[1];
        }
    }
    var client;
    if (config.unix_socket) {
        client = redis.createClient(config.unix_socket, config.options);
    } else if (config.port && config.host) {
        client = redis.createClient(config.port, config.host, config.options);
    } else {
        client = redis.createClient(config.options);
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
