const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  loginUser,
  logout,
} = require("../controller/userController");

router.route("/all-users").get(getAllUsers);

router.route("/create-user").post(createUser);
router.route("/login-user").post(loginUser);
router.route("/logout-user").post(logout);

router.route("/user/:id").get(getUserById).delete(deleteUser).put(updateUser);

module.exports = router;
