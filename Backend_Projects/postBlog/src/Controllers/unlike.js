const like = require("../Models/like.models");
const Post = require("../Models/post.models");

const unlikeIt = async (req, res) => {
    try {
        const { user, post, likes, likedArr } = req.body;
        const updateLikes = await like.findByIdAndDelete(likes);
        const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: likedArr } }, { new: true })
        res.status(200).json({
            success: true,
            message: "post unliked successfully"
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            messgae: "failed to unlike post"
        })
    }

}
module.exports = unlikeIt;