const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  createCategoryValidationRules,
  updateCategoryValidationRules,
} = require("../middleware/categoryValidationMiddleware");
const { handleValidationErrors } = require("../middleware/errorHandler");


router
  .route("/")
  .post(
    authenticateToken,
    createCategoryValidationRules,
    handleValidationErrors,
    categoryController.createCategory
  )
  .get(authenticateToken, categoryController.getAllCategorys);

router
  .route("/:id")
  .get(authenticateToken, categoryController.getCategoryByPk)
  .put(
    authenticateToken,
    updateCategoryValidationRules,
    handleValidationErrors,
    categoryController.updateCategory
  )
  .delete(authenticateToken, categoryController.deleteCategory);

router.patch(
  "/status-change/:id",
  authenticateToken,
  categoryController.statusChangeCategory
);

module.exports = router;
