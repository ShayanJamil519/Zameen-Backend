const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

//create -->post
router.route("/register").post(registerUser);

// login
router.route("/login").post(loginUser);

// logout
router.route("/logout").get(logOut);

// forgot Password
router.route("/password/forgot").post(forgotPassword);

// reset Password
router.route("/password/reset/:token").put(resetPassword);

// Get User Details
router.route("/me").get( getUserDetails);

// Update User Password:
router.route("/password/update").put( updatePassword);

// Update User Profile:
router.route("/me/update").put( updateProfile);

// Get All User (Admin):
router
  .route("/admin/users")
  .get( getAllUser);

// Get Single User (Admin), Update User Role (Admin), Delete User (Admin):
router
  .route("/admin/user/:id")
  .get( getSingleUser)
  .put( updateUserRole)
  .delete( deleteUser);

module.exports = router;
