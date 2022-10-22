const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/Issue.js')

// Get All issues
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// Get issues by user (profile page)
issueRouter.get("/user", (req, res, next) => {
  Issue.find({ user: req.auth._id }, (err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// get issues by user Id
issueRouter.get("/user/:userId", (req, res, next) => {
  Issue.find({ user: req.params.userId }, (err, issues) => {
      if(err){
          res.status(500)
          return next(err)
      }
      return res.status(200).send(issues)
  })
})

// Add new issue
issueRouter.post("/", (req, res, next) => {
  req.body.user = req.auth._id
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})

// Delete Todo
issueRouter.delete("/:issueId", (req, res, next) => {
  Issue.findOneAndDelete(
    { _id: req.params.issueId, user: req.auth._id },
    (err, deletedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete Issue: ${deletedIssue.title}`)
    }
  )
})

// Update Todo
issueRouter.put("/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedIssue)
    }
  )
})

// likes 
issueRouter.put("/upvotes/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      {$inc: {upVotes: 1}},
      {new: true},
      (err, issue) => {
          if(err) {
              res.status(500)
              return next(err)
          }
          if(!issue.upVoters.includes(req.auth._id)) {
              Issue.findOneAndUpdate(
                  {_id: req.params.issueId},
                  {$push: {upVoters: req.auth._id}},
                  {new: true},
                  (err, issue) => {
                      if(err) {
                          res.status(500)
                          return next(err)
                      }
                      console.log(issue)
                      return res.status(200).send(issue)
                  })
          } else {
              res.status(500)
              Issue.findOneAndUpdate(
                  {_id: req.params.issueId},
                  {$inc: {upVotes: -1}},
                  {new: true},
                  (err, issue) => {
                      if(err) {
                          res.status(500)
                          return next(err)
                      }
                      return
                  }
              )
              return next(new Error("You already liked this issue!"))
          }
      })
})

// dislike 
issueRouter.put("/downvotes/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate (
      {_id: req.params.issueId}, // find issue Id
      {$inc: {downVotes: 1}}, // increase downVotes (from model)
      {new: true}, // yes its true
      (err, issue) => {
          if(err){
              res.status(500)
              return next(err)
          }
          if(!issue.downVoters.includes(req.auth._id)){ // if issue.downVoters doesnt include the auth._id then 
              Issue.findOneAndUpdate(
                  {_id: req.params.issueId}, // find the issueId and push the auth._id to .downVoters
                  {$push: {downVoters: req.auth._id}},
                  {new: true},
                  (err, issue) => {
                      if(err){
                          res.status(500)
                          return next(err)
                      }
                      console.log(issue)
                      return res.status(200).send(issue)
                  })
          } else {
              res.status(500)
              Issue.findOneAndUpdate (
                  {_id: req.params.issueId},
                  {$inc: {downVotes: -1}},
                  {new: true},
                  (err, issue) => {
                      if(err){
                          res.status(500)
                          return next(err)
                      }
                      return
                  }
              )
              return next(new Error("You already disliked this issue"))
            }
          }
      )
  })

module.exports = issueRouter