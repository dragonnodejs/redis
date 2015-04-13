# DragonNode.js Redis
Bundle with services to develop applications with Redis
- Initialize client service with the Redis connection
- Opportunity to set and get complexer values over JSON encoding
- Initialize cache service to abstract the caching logic with Redis

## Installation
- Add bundle to the "package.json":
```javascript
{
    "dependencies": {
        "dragonnodejs-redis": "^2.0.2"
    }
}
```
- Run "npm install"
- Extend the configuration in "app.js":
```javascript
var config = {
    modules: {
        npm: [
            [require('dragonnodejs-redis'), {
                client: {},
                json: {},
                cache: { 
                    disabled: process.env.CACHE_DISABLED
                }
            }]
        ]
    }
};
```
