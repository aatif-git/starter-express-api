const { where } = require("sequelize");
const Post = require("../models/Post");
const Category = require("../models/Category");
const cache = require("../utils/cache/cache");

// Get All Post
exports.getAllPosts = async (req, res) => {
    try {
        const cachedPosts = cache.get("Posts");

        if (cachedPosts) {
            return res.json({
                status: 200,
                message: "Data retrieved successfully",
                data: JSON.parse(cachedPosts),
            });
        }

        const posts = await Post.findAll({ include: Category });

        // create a cache key for the category
        cache.set("posts", JSON.stringify(posts));

        return res.json({
            status: 200,
            message: "Data retrieved successfully",
            data: posts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get Post By ID
exports.getPostByPk = async (req, res) => {
    var id = req.params.id;
    try {
        const post = await Post.findByPk(id, { include: Category });

        if (!post) {
            return res.json(404, {
                status: 404,
                message: "Data not found!",
                data: [],
            });
        }

        res.json({
            status: 200,
            message: "Data retrieved successfully",
            data: post,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Post
exports.deletePost = async (req, res) => {
    var id = req.params.id;
    try {
        const post = await Post.destroy({ where: { id: id } });

        if (!post) {
            return res.json(404, {
                status: 404,
                message: "Data not found!",
                data: [],
            });
        }

        cache.del("Posts");

        res.json({
            status: 200,
            message: "Data deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new Post
exports.createPost = async (req, res) => {
    const { title, content, categoryId } = req.body;

    try {
        // Check if categoryId exists and has status 1
        const category = await Category.findOne({
            where: { id: categoryId, status: 1 },
        });
        if (!category) {
            return res
                .status(400)
                .json({ error: "Invalid categoryId or category is inactive" });
        }

        // Create post
        const post = await Post.create({
            title,
            content,
            categoryId,
        });

        cache.del("Posts");

        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, content, categoryId } = req.body;
    try {
        // Check if categoryId exists and has status 1
        const category = await Category.findOne({
            where: { id: categoryId, status: 1 },
        });
        if (!category) {
            return res.status(400).json({
                errors: [
                    { field: "categoryId", message: "Category not found or inactive" },
                ],
            });
        }
        // Update post
        const [updatedRows] = await Post.update(
            { title, content, categoryId },
            { where: { id: postId } }
        );
        if (updatedRows === 0)
            return res.json(404, {
                status: 404,
                message: "Post not found!",
            });

        cache.del("Posts");

        res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
