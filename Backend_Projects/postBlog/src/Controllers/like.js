const like = require("../Models/like.models")
const Post = require("../Models/post.models");

const likeIt = async (req, res) => {
    try {
        const { user, post } = req.body;
        const liked = new like({ user, post });
        const saved = await liked.save();
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { likes: liked } }, { new: true }).populate("likes").exec();
        res.status(200).json({
            success: true,
            data: liked,
            message: "post liked successfully"
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            messgae: "failed to like post"
        })
    }

}
module.exports = likeIt;