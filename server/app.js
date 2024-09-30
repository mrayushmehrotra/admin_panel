const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/v1", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is working fine ");
});

// Server start
app.listen(3000, () => {
  console.log(`server is running on http://localhost:3000`);
});
