const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const { promisify } = require('util');

const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());

const redisClient = redis.createClient({
    host: 'redis'
});
const pubClient = redisClient.duplicate();

const getAsync = promisify(redisClient.get).bind(redisClient);

app.post('/api/generate', async (req, res) => {
    const value = await getAsync(req.body.keyword);

    if (value === null) {
        res.send({ status: 'added' });
        pubClient.publish('pdf request', req.body.keyword);
    } else if (value === 'pending') {
        res.send({ status: 'pending' });
    } else {
        res.send({ status: 'complete', name: value });
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
