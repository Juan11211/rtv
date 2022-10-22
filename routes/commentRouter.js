const express = require('express')
const commentRouter = express()
const Comment = require('../models/Comment')

commentRouter.get("/:issueId", (req, res, next) => {
    Comment.find(
        {issueId: req.params.issueId},
        (err, comments) => {
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(comments)
        }
    )
})

// Post Comment
commentRouter.post("/", (req, res, next) => {
    req.body.userId = req.auth._id
    req.body.username = req.auth.username
    const newComment = new Comment (req.body)
    console.log(newComment)
    newComment.save(
        (err, comment) => {
            if(err){
                res.status(500)
                next(err)
            }
            return res.status(201).send(comment)
        }
    )
})

commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.params.commentId, userId: req.auth._id},
        (err, deletedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send("Successfully deleted comment")
        }
    )
})

module.exports = commentRouter