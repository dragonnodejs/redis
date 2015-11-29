'use strict';

// Load the libraries and run the modules for the bundle

module.exports = (config, _, services) => {
    let directory = __dirname + '/modules/';
    let libraries = {
        redis: require('redis')
    };
    require('dragonnodejs')(directory, config, libraries, services);
};
