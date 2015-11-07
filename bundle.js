'use strict';

// Bundle with services to develop applications with Redis

module.exports = (config, _, services) => {
    config = {
        libraries: {
            redis: require('redis')
        },
        directory: __dirname + '/',
        modules: config
    };
    require('dragonnodejs')(config, services);
};
