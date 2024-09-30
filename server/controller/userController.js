const User = require("../Model/userModel");
const signToken = require("../utils/TokenSign");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve users.", error: error.message });
  }
};

// Create a User
exports.createUser = async (req, res) => {
  try {
    const {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Image,
      f_Pwd,
      f_isAdmin,
      f_sno,
    } = req.body;

    // Validate input
    if (
      !f_Name ||
      !f_Email ||
      !f_Mobile ||
      !f_Pwd ||
      !f_sno ||
      !f_Designation ||
      !f_gender ||
      !f_Image
    ) {
      return res.status(422).json({
        message:
          "Name, Email, Mobile Number, Password, and S.No etc. are required.",
      });
    }

    // Check for duplicate user by email
    const existingUser = await User.findOne({ f_Email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "A user with this email already exists." });
    }

    const newUser = new User({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Image,
      f_Pwd,
      f_sno,
      f_isAdmin,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user.", error: error.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve user.", error: error.message });
  }
};

// Delete a single user by ID
// Correct route: /api/v1/user/:id
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
      console.log(deletedUser);
    }

    res.status(200).json({
      message: "User deleted successfully.",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user.",
      error: error.message,
    });
  }
};

// Update a single user by ID
exports.updateUser = async (req, res) => {
  try {
    // Check if the request body is empty
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update.",
      });
    }

    // Construct an update object with the fields that are present in req.body
    const updateFields = {};
    const allowedFields = [
      "f_Name",
      "f_Email",
      "f_Mobile",
      "f_Designation",
      "f_gender",
      "f_Course",
      "f_Image",
      "f_Pwd",
      "f_sno",
      "f_isAdmin",
    ];

    // Loop through allowed fields and add to updateFields if present in req.body
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    // If no fields to update, return an error
    if (!Object.keys(updateFields).length) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
    }

    // Update the user
    const user = await User.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
    });

    // If the user isn't found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error });
  }
};

exports.loginUser = async (req, res) => {
  const { f_Email, f_Pwd } = req.body;
  if (!f_Email || !f_Pwd) {
    res.status(422).json({
      success: false,
      message: "Please Fill Email and Password",
    });
  }
  const user = User.find({ f_Email });

  if (user) {
    const tokenData = signToken(f_Email);
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: tokenData,
    });
  }
  if (!user) {
    return res.status(404).json({ success: false, message: "user not found" });
  }
};
// Logout function - Backend (Controller)
exports.logout = async (req, res) => {
  try {
    // Clear token from client-side (Handled by frontend)
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed. Please try again.",
    });
  }
};
