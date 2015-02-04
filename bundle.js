"use strict";
/*global module:false */
/*global __dirname:false */

// Bundle with services to develop applications with Redis

module.exports = function (config, _, services) {
    config = {
        npm: __dirname + '/node_modules/',
        libraries: {
            nodejs: { url: 'url' },
            npm: { redis: 'redis' }
        },
        directory: __dirname + '/modules/',
        modules: {
            directory: config
        }
    };
    require('dragonnodejs')(config, services);
};
