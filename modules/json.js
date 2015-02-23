"use strict";

/**
 * Opportunity to set and get complexer values over JSON encoding
 * @example
    json: {}
 */

module.exports = function (config, libraries, services) {
    var client = services.client;

    /**
     * Convert a complexer value to JSON and set in Redis
     * @example
        var client = services.client;
        client.setJSON('key', value);
     */
    client.setJSON = function (key, value, callback) {
        value = JSON.stringify(value);
        client.set(key, value, callback);
    };

    /**
     * Get the value for the key from Redis and convert it back from JSON
     * @example
        var client = services.client;
        client.getJSON('key', function (err, value) {});
     */
    client.getJSON = function (key, callback) {
        client.get(key, function (err, value) {
            if (value) {
                value = JSON.parse(value);
            }
            callback(err, value);
        });
    };
};
