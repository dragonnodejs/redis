# DragonNode.js Redis
Bundle with services to develop applications with redis
- Initialize client service with the redis connection
- Initialize cache service to abstract the caching logic with redis

# Installation
- Add bundle to the "package.json":
```javascript
{
    "dependencies": {
        "dragonnodejs-redis": "1.*"
    }
}
```
- Run "npm install"
- Extend the configuration "app/config.js":
```javascript
module.exports = {
    modules: {
        npm: {
            'dragonnodejs-redis': {
                client: {
                    port: 6379,
                    host: '127.0.0.1',
                    options: {}
                },
                cache: {}
            }
        }
    }
};
```