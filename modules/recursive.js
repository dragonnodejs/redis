'use strict';

/**
 * Let the keys being arrays and returns the first found value
 * @example
    ['recursive']
 */

module.exports = (config, libraries, services) => {
    let client = services.client;

    /**
     * Returns the first found value for the list of keys
     * @example
        let client = services.client;
        client.get(['key', 'key'], (err, value) => {});
     */
    let get = client.get;
    client.get = (keys, callback) => {
        if (!Array.isArray(keys)) {
            keys = [keys];
        }
        let key = keys.shift();
        get(key, (err, value) => {
            if (err && keys.length) {
                get(keys, callback);
                return;
            }
            callback(err, value);
        });
    };
};
