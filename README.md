# DragonNode.js Redis
Bundle with services to develop applications with Redis
- Initialize client service with the Redis connection
- Opportunity to set and get values with JSON encoding
- Initialize cache service to abstract the caching logic with Redis
- Let the keys being arrays and returns the first found value

## Installation
- Run ```npm install dragonnodejs-redis --save```
- Add the bundle to the "app.js":
```javascript
let modules = [
    [require('dragonnodejs-redis'), [
        ['client', { createClient: [process.env.REDISCLOUD_URL] }],
        ['json'],
        ['cache', { disabled: process.env.CACHE_DISABLED }],
        ['recursive']
    ]]
];
```
