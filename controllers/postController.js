const User = require('../models/userModel')
const Post = require('../models/postModel')

exports.createpost = async (req, res) => {
    const { content } = req.body

    const user = await User.findOne({ email: req.user.email });
    const post = await Post.create(
        {
            content,
            user: user._id
        })
    user.posts.push(post._id)
    await user.save();
    const populatedUser = await User.findById(user._id).populate("posts");
    res.json(populatedUser.posts)
}

exports.editpost = async (req, res) => {
    const { content } = req.body
    const { id } = req.params

    const post = await Post.findByIdAndUpdate(
        id,
        { content },
        { new: true }
    );

    res.json(post)
}

exports.deletepost = async (req, res) => {
    const { id } = req.params

    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully" });
}