const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    content: String,
    user:{type: mongoose.Schema.Types.ObjectId, ref:"User"}
})

module.exports = mongoose.model("Post", PostSchema)