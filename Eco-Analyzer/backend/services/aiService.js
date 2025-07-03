const { spawn } = require('child_process');
const path = require('path');
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const analyzeProduct = async (productData) => {
  const cacheKey = `product_${productData.uuid}`;
  const cachedResult = await getAsync(cacheKey);
  if (cachedResult) return JSON.parse(cachedResult);

  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', [path.join(__dirname, '../../ai-service/ai_model.py')]);
    
    pythonProcess.stdin.write(JSON.stringify(productData));
    pythonProcess.stdin.end();

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.on('close', async (code) => {
      if (code !== 0) return reject(new Error('AI model failed'));
      const parsedResult = JSON.parse(result);
      await setAsync(cacheKey, JSON.stringify(parsedResult), 'EX', 3600);
      resolve(parsedResult);
    });
  });
};

module.exports = { analyzeProduct };