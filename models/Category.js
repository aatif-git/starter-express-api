const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Post = require("./Post");

// Define the Category model
const Category = sequelize.define("categories", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});



module.exports = Category;
