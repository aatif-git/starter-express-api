const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  createPostValidationRules,
  updatePostValidationRules,
} = require("../middleware/postValidationMiddleware");
const { handleValidationErrors } = require("../middleware/errorHandler");

router
  .route("/")
  .post(
    authenticateToken,
    createPostValidationRules,
    handleValidationErrors,
    postController.createPost
  )
  .get(authenticateToken, postController.getAllPosts);

router
  .route("/:id")
  .get(authenticateToken, postController.getPostByPk)
  .put(
    authenticateToken,
    updatePostValidationRules,
    handleValidationErrors,
    postController.updatePost
  )
  .delete(authenticateToken, postController.deletePost);

module.exports = router;
