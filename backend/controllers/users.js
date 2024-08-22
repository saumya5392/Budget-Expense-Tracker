const UsrsSchema = require("../models/usrs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const { firstName, lastName, phoneno, work, email, password } = req.body;

  const user = UsrsSchema({
    firstName,
    lastName,
    phoneno,
    work,
    email,
    password,
  });

  try {
    //validations
    if (!firstName || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    await user.save();
    res.status(200).json({ message: "user Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(user);
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // Find the user by email
    const user = await UsrsSchema.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "User not found!!" });
    } // Compare the password
    //const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);
    // if (!isMatch) {

    //   return res.status(401).json({ message: "Invalid email or password" });

    // } // Create a token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { email, password } = req.body; // Find the user by email
    const user = await UsrsSchema.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "User not found!!" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//getuser

// Get user details by passing auth token
exports.getUser = async function (req, res) {
  // Log the headers for debugging
  console.log(req.headers);

  // Check for the authorization header
  if (req.headers && req.headers.authorization) {
    // Extract the token from the header
    const authorization = req.headers.authorization;
    console.log("Auth", authorization);
    // If there's no token, return unauthorized
    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(authorization, process.env.SECRET_KEY);

      // Extract the user ID from the decoded token
      const userId = decoded.id;

      // Fetch the user by ID from the database
      const user = await UsrsSchema.findOne({ _id: userId });

      // If user is not found, return an error
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return the user details
      return res.status(200).json({ status: 200, data: user });
    } catch (e) {
      // Log the error and return unauthorized
      console.error("Token verification failed:", e);
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  // If no authorization header is provided, return unauthorized
  return res.status(401).json({ message: "Unauthorized" });
};
