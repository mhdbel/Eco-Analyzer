const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

client.on('error', (err) => {
  console.error('Redis Error:', err);
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = {
  get: (key) => getAsync(key).then((res) => JSON.parse(res)),
  set: (key, value, ttl = 3600) => setAsync(key, JSON.stringify(value), 'EX', ttl)
};