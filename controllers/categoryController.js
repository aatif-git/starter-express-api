const { where } = require("sequelize");
const Category = require("../models/Category");
const Post = require("../models/Post");
const cache = require("../utils/cache/cache");

// Get All Category
exports.getAllCategorys = async (req, res) => {
  try {
    const cachedCategories = cache.get("categories");

    if (cachedCategories) {
      return res.json({
        status: 200,
        message: "Data retrieved successfully",
        data: cachedCategories,
      });
    }

    const categories = await Category.findAll();

    // create a cache key for the category
    cache.set("categories", categories);

    return res.json({
      status: 200,
      message: "Data retrieved successfully",
      data: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get Category By ID
exports.getCategoryByPk = async (req, res) => {
  var id = req.params.id;
  try {
    const category = await Category.findByPk(id, { include: Post });

    if (!category) {
      return res.json(404, {
        status: 404,
        message: "Data not found!",
      });
    }

    res.json({
      status: 200,
      message: "Data retrieved successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Category
exports.deleteCategory = async (req, res) => {
  var id = req.params.id;
  try {
    const category = await Category.destroy({ where: { id: id } });

    if (!category) {
      return res.json(404, {
        status: 404,
        message: "Data not found!",
        data: [],
      });
    }
    cache.del("categories");

    res.json({
      status: 200,
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new Category
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  // Hash the password

  try {
    // Create category
    await Category.create({ name });

    cache.del("categories");

    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  const category = await Category.findByPk(categoryId);

  if (!category) {
    return res.json(404, {
      message: "Category not found!",
    });
  }

  // Update category
  const [updatedRows] = await Category.update(
    { name },
    { where: { id: categoryId } }
  );
  if (updatedRows === 0)
    return res.status(500).json({
      errors: [{ message: "something went wrong" }],
    });
  cache.del("categories");

  res.status(200).json({ message: "Category updated successfully" });
};

exports.statusChangeCategory = async (req, res) => {
  const categoryId = req.params.id;

  // Update category
  const category = await Category.findByPk(categoryId);

  if (!category)
    return res.json(404, {
      status: 404,
      message: "Category not found!",
    });

  const [updatedRows] = await Category.update(
    { status: !category.status },
    { where: { id: categoryId } }
  );

  res.status(200).json({ message: "Category status updated successfully" });
};
