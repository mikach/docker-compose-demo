const redis = require('redis');
const puppeteer = require('puppeteer');

const redisClient = redis.createClient({
    host: 'redis'
});
const subClient = redisClient.duplicate();

subClient.on('message', async (channel, message) => {
    console.log('got message: ', message);

    const filename = `pdf${Date.now()}`;

    redisClient.set(message, 'pending');

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.goto(`https://google.com/search?q=${message}`, {
        waitUntil: 'networkidle2'
    });
    await page.pdf({ path: `./pdfs/${filename}.pdf`, format: 'A4' });
    await browser.close();

    redisClient.set(message, Date.now());
});

subClient.subscribe('pdf request');
