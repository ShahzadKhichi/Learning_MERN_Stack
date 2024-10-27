const comment = require("../Models/comment.models");
const Post = require("../Models/post.models");
const commentPost = async (req, res) => {
    try {
        const { post, user, body } = req.body;
        const Comment = new comment({ post, user, body });
        const saved = await Comment.save();
        const updatePost = await Post.findByIdAndUpdate(post, { $push: { comments: Comment } }, { new: true });

        res.status(200).json({
            success: true,
            data: Comment,
            message: "comment added successfully"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "comment additon failied"
        })
    }

}
module.exports = commentPost;