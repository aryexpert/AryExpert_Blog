import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default: "https://img.freepik.com/photos-gratuite/spiritualite-religion-mains-jointes-priere-sainte-bible-dans-concept-eglise-pour-foi_1150-12947.jpg?t=st=1708910375~exp=1708913975~hmac=a569d4c763efd2d1c8d485681fbef2f32da850c53a0fcac22a97d911807f0e5e&w=740",
        },
        category: {
            type: String,
            default: "uncategorized",
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    }, { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;