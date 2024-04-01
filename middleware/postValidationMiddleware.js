const { body, validationResult } = require("express-validator");

// Validation rules for creating a new post
const createPostValidationRules = [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("categoryId")
        .notEmpty()
        .withMessage("Category ID is required")
        .isInt()
        .withMessage("Category ID must be an integer"),
];

const updatePostValidationRules = [
    body("title").optional().notEmpty().withMessage("Title is required"),
    body("content").optional().notEmpty().withMessage("Content is required"),
    body("categoryId")
        .optional()
        .notEmpty()
        .withMessage("Category ID is required")
        .isInt()
        .withMessage("Category ID must be an integer"),
];

module.exports = {
    createPostValidationRules,
    updatePostValidationRules,
};
