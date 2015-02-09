# DragonNode.js Redis
Bundle with services to develop applications with Redis
- Initialize client service with the Redis connection
- Initialize cache service to abstract the caching logic with Redis

# Installation
- Add bundle to the "package.json":
```javascript
{
    "dependencies": {
        "dragonnodejs-redis": "^1.8.2"
    }
}
```
- Run "npm install"
- Extend the configuration in "app.js":
```javascript
var config = {
    modules: {
        npm: {
            [require('dragonnodejs-redis'), {
                client: {
                    port: 6379,
                    host: '127.0.0.1',
                    options: {}
                },
                cache: { disabled: false }
            }]
        }
    }
};
```
