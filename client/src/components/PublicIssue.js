import React, {useState, useEffect} from "react";
import Comment from "./Comment";
import axios from "axios";

export default function PublicIssue(props) {

    const { title, description, _id, upVotes, downVotes, createdAt, username, user } = props

    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const [votes, setVotes] = useState({upVotes: upVotes || 0, downVotes: downVotes || 0})
    const [voteErrMsg, setVoteErr] = useState("")
    const [commentToggle, setCommentToggle] = useState(false)
    const [comments, setComments] = useState([])
    const [postObject, setPostObject] = useState({comment: "", issueId: _id})

    useEffect(
        () => {
            userAxios.get(`/api/comments/${_id}`)
                .then(res => setComments(res.data))
                .catch(err => console.log(err))
        }, 
    [])

    function upVote(issueId) {
        userAxios.put(`/api/issue/upvotes/${issueId}`)
            .then(res => setVotes(prevVotes => ({
                ...prevVotes, upVotes: res.data.upVotes ||
                prevVotes.upVotes
            })))
            .catch(err => setVoteErr(err.response.data.errMsg))
    }

    function downVote(issueId) {
        userAxios.put(`/api/issue/downvotes/${issueId}`)
            .then (res => setVotes(prevVotes => ({
                ...prevVotes, downVotes: res.data.downVotes
            })))
            .catch(err => setVoteErr(err.response.data.errMsg))
    }

    function handleChange(e) {
        const { name, value } = e.target
        setPostObject(prevPostObject => ({
            ...prevPostObject,
            [name] : value
        }))
    }

    function addComment(e) {
        e.preventDefault()
        userAxios.post("/api/comments", postObject)
            .then(res => {
                setComments(prevComments => [...prevComments, res.data])
            })
            .catch(err => console.log(err))

            setPostObject(prevPostObject => ({
                ...prevPostObject,
                comment: ""
            }))
    }

    function deleteComment(commentId) {
        userAxios.delete(`/api/comments/${commentId}`)
            .then(res => setComments(prevState => prevState.filter(comment => comment._id !== commentId)))
            .catch(err => console.log(err))
    }

    return (
        !commentToggle?
        <div className="issue">
            <h1>{title}</h1>
            <h3>{description}</h3>
            <button onClick={() => upVote(_id)} >🔺 {votes.upVotes}</button>
            <button onClick={() => downVote(_id)} >🔻 {votes.downVotes}</button>
            <button onClick={() => setCommentToggle(prevToggle => !prevToggle)}>💬</button>
            <p style={{color: "red"}}>{voteErrMsg}</p>
        </div>

        :

        <div className="issue">
            <form className="comment-form" onSubmit={addComment}>
                <textarea 
                    type="text"
                    name="comment"
                    value={postObject.comment}
                    onChange={handleChange}
                    placeholder="Type your comment here..."
                />
                <button>Add Comment</button>
            </form>
            {comments.map(comment => <Comment {...comment} deleteComment={deleteComment} />)}
            <br />
            <button onClick={() => setCommentToggle(prevToggle => !prevToggle)}>Hide Comments</button>    
        </div>
    )
    
}