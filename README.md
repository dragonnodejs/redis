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
        "dragonnodejs-redis": "^3.0.0"
    }
}
```
- Run "npm install"
- Extend the configuration in "app.js":
```javascript
let config = {
    modules: {
        [require('dragonnodejs-redis'), [
            ['modules/client', {
                uri: process.env.REDISCLOUD_URL
            }],
            ['modules/json', {}],
            ['modules/cache', {
                disabled: process.env.CACHE_DISABLED
            }]
        ]]
    }
};
```
