const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./Category");

// Define the Post model
const Post = sequelize.define("posts", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

Post.belongsTo(Category, {
    foreignKey: "categoryId", 
});
Category.hasMany(Post, { 
    foreignKey: "categoryId",
});
module.exports = Post;
