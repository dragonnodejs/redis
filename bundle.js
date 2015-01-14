"use strict";

// Bundle with services to develop applications with redis

module.exports = function (config, _, services) {
    config = {
        npm: __dirname + '/node_modules/',
        libraries: {
            nodejs: { url: 'url' },
            npm: { redis: 'redis' }
        },
        directory: __dirname + '/modules/',
        modules: {
            npm: {},
            directory: config
        }
    };
    require('dragonnodejs')(config, services);
};
