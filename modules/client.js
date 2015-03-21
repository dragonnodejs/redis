'use strict';

/**
 * Initialize client service with the Redis connection
 * @example
    // Connect with URI
    client: {
        uri: 'redis://host:port'
    }

    // Connect with port and host
    client: {
        port: 6379,
        host: '127.0.0.1'
    }

    // Connect with unix_socket
    client: {
        unix_socket: ''
    }

    // Connect with the default localhost:6379
    client: {}
 */

module.exports = function (config, libraries, services) {
    var redis = libraries.redis,
        url = libraries.url;

    // Split an URI to the informations about port, host and password

    if (config.uri) {
        var redisURL = url.parse(config.uri);
        config.port = redisURL.port;
        config.host = redisURL.hostname;
        if (redisURL.auth) {
            config.password = redisURL.auth.split(':')[1];
        }
    }

    // Instanziate the client with the different possible constructors

    var client;
    var options = config.options || {};
    if (config.port && config.host) {
        client = redis.createClient(config.port, config.host, options);
    } else if (config.unix_socket) {
        client = redis.createClient(config.unix_socket, options);
    } else {
        client = redis.createClient(options);
    }

    // Use the password for the authentication at the Redis server

    if (config.password) {
        client.auth(config.password);
    }

    services.client = client;
};
