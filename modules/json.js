'use strict';

/**
 * Opportunity to set and get complexer values over JSON encoding
 * @example
    ['modules/json', {}]
 */

module.exports = (config, libraries, services) => {
    let client = services.client;

    /**
     * Convert a complexer value to JSON and set in Redis
     * @example
        let client = services.client;
        client.setJSON('key', value);
     */
    client.setJSON = (key, value, callback) => {
        value = JSON.stringify(value);
        client.set(key, value, callback);
    };

    /**
     * Get the value for the key from Redis and convert it back from JSON
     * @example
        let client = services.client;
        client.getJSON('key', (err, value) => {});
     */
    client.getJSON = (key, callback) => {
        client.get(key, (err, value) => {
            if (value) {
                value = JSON.parse(value);
            }
            callback(err, value);
        });
    };
};
