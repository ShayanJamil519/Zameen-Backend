const express = require("express");

const {
  createBlog,
  getAllBlogs,
  deleteBlog,
  getBlogById,
} = require("../controllers/blogController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

// post
router
  .route("/blog/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createBlog);

// get
router.route("/blogs").get(getAllBlogs);

//delete
router
  .route("/blog/:id")
  .get(getBlogById)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteBlog);

module.exports = router;
