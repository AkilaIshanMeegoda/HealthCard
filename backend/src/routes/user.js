const express = require("express");

const {
  signupUser,
  loginUser,
  searchDoctors,
  searchStaffMembers,
  searchStaffAdmins,
  searchUsers,
  searchAppointments
} = require("../controller/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/doctors", searchDoctors);

router.get("/staffMembers", searchStaffMembers);

router.get("/staffAdmins", searchStaffAdmins);

router.get("/users", searchUsers);

module.exports = router;
