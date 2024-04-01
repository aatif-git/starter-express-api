const { body, validationResult } = require("express-validator");

// Validation rules for creating a new post
const createCategoryValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
];

const updateCategoryValidationRules = [
  body("name").optional().notEmpty().withMessage("Name is required"),
];

module.exports = {
  createCategoryValidationRules,
  updateCategoryValidationRules,
};
