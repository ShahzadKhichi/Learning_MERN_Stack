const post = require("../Models/post.models");
const users = require("../Models/user.models");

const createPost = async (req, res) => {
    try {
        const { title, body, user } = req.body;

        const Post = new post({ title, body, user });
        const newPost = await Post.save();
        const upadteUser = await users.findByIdAndUpdate(user, { $push: { posts: Post._id } }, { new: true });
        res.status(200).json({
            success: true,
            data: upadteUser,
            message: "Post created successfully"
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json(
            {
                success: false,
                message: "Post creation failed"
            })
    }
}
module.exports = createPost;