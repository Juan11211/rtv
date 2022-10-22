const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    upVotes: {
        type: Number,
    },

    downVotes: {
        type: Number
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    upVoters: {
        type: Array
    },

    downVoters: {
        type: Array
    }

})

module.exports = mongoose.model("Issue", issueSchema)