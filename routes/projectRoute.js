const express = require("express");

const {
  createProject,
  getAllProjects,
  getProjectDetails,
  updateProject,
  deleteProject,
  createProjectReview,
  getProjectReviews,
} = require("../controllers/projectController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

// post
router
  .route("/project/new")
  .post( createProject);

// get
router.route("/projects").get(getAllProjects);

//get specific project detail
router
  .route("/project/:id")
  .get(getProjectDetails)
  .put( updateProject)
  .delete( deleteProject);

// Create New Review or Update the review:
router.route("/review/project").put(createProjectReview);

// Get product review:
router.route("/reviews/project").get( getProjectReviews);

module.exports = router;
