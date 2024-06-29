const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require("axios");


const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}
const handleEvent = (type, data) => {
    // const {type, data} = req.body
    if (type === 'postCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []}
    }
    if (type === 'commentCreated') {
        const {id, content, postId, status} = data
        const post = posts[postId]
        post.comments.push({id, content, status})
    }
    if (type === 'commentUpdated') {
        const {id, content, postId, status} = data
        const post = posts[postId]
        const comment = post.comments.find(comment => {
            return comment.id === id
        })
        comment.status = status
        comment.content = content
    }

}
app.get('/events', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const {type, data} = req.body
    handleEvent(type, data)
    res.send({})
})


app.listen(4002, async () => {
    console.log('listening on port 4002')
    try {
        const res = await axios.get("http://localhost:4005/events");

        for (let event of res.data) {
            console.log("Processing event:", event.type);

            handleEvent(event.type, event.data);
        }
    } catch (error) {
        console.log(error.message);
    }
})