# DragonNode.js Redis
Bundle with services to develop applications with Redis
- Initialize client service with the Redis connection
- Initialize cache service to abstract the caching logic with Redis

# Installation
- Add bundle to the "package.json":
```javascript
{
    "dependencies": {
        "dragonnodejs-redis": "~1.8.1"
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
                cache: { disabled: false }
            }
        }
    }
};
```
