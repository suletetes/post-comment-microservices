import React, {useState, useEffect} from "react";
import axios, {post} from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
    const [post, setPost] = useState({})

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts')
        setPost(res.data)
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    console.log(post)
    const renderedPosts = Object.values(post).map(posts => {
        return (
            <div className="card" style={{width: '30%', marginBottom: '20px'}} key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comment}/>
                    <CommentCreate postId={post.id}/>
                </div>
            </div>
        )
    })

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>)
}