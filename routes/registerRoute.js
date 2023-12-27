const express = require("express");

const { registerationInProject, getAllRegistrationProjectOfSpecificUser, updateInstallmentStatus, getAllRegisterations } = require("../controllers/registerController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();


// post
router.route("/register/project/new/:id").post( registerationInProject);

// get Get All projects of a specific user
router.route("/register/project/me").get( getAllRegistrationProjectOfSpecificUser);

// get Get All project registerations
router
  .route("/admin/registerations")
  .get(  getAllRegisterations);

// put Update User Installment Status:
router.route("/project/Installments/:id").put( updateInstallmentStatus);


module.exports = router;
