const Blog = require("../models/blogModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Blog :
exports.createBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.create(req.body);

  res.status(201).json({
    success: true,
    blog,
  });
});

// Get All Blog
exports.getAllBlogs = catchAsyncErrors(async (req, res, next) => {
  const blogs = await Blog.find();

  res.status(200).json({
    success: true,
    blogs,
  });
});

exports.getBlogById = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  res.status(200).json({
    success: true,
    blog,
  });
});

// Delete Blog --User

exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorHander("Blog not found", 404));
  }

  await blog.remove();

  res.status(200).json({
    success: true,
    message: "Blog Delete Successfully",
  });
});
