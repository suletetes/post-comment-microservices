const express = require('express');
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(bodyParser.json())
app.use(cors())


const posts = {};

app.get('/post', (req, res) => {
    res.send(posts);

});

app.post('/post', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const {title} = req.body

    posts[id] = {
        id, title
    };

    res.send(201).send(posts[id]);

});

app.listen(4000, () => {
    console.log('Listening on 4000')
});

