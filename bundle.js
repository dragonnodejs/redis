"use strict";
/*global module:false */
/*global __dirname:false */

// Bundle with services to develop applications with Redis

module.exports = function (config, _, services) {
    config = {
        libraries: {
            url: require('url'),
            redis: require('redis')
        },
        directory: __dirname + '/modules/',
        modules: {
            directory: config
        }
    };
    require('dragonnodejs')(config, services);
};
