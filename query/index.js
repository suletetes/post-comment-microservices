const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/events', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const {type, data} = req.body
    if (type === 'postCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []}
    }
    if (type === 'commentCreated') {
        const {id, content, postId, status} = data
        const post = posts[postId]
        post.comments.push({id, content, status})
    }
    res.send({})
})


app.listen(4002, () => {
    console.log('listening on port 4002')
})