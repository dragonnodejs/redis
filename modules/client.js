'use strict';

/**
 * Initialize client service with the Redis connection
 * @example
    // Connect with URI
    ['modules/client', {
        uri: process.env.REDISCLOUD_URL
    }]

    // Connect with port and host
    ['modules/client', {
        port: 6379,
        host: '127.0.0.1'
    }]

    // Connect with unix_socket
    ['modules/client', {
        unix_socket: ''
    }]

    // Connect with the default localhost:6379
    ['modules/client', {}]
 */

module.exports = (config, libraries, services) => {
    let redis = libraries.redis;

    // Instanziate the client with the different possible constructors

    let client;
    let options = config.options || {};
    if (config.uri) {
        client = redis.createClient(config.uri, options);
    } else if (config.port && config.host) {
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
