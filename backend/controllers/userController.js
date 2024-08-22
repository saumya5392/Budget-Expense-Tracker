const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};


const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body); 
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: "7d" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Password Reset Link",
      html: `<p>Please click <a href="${process.env.CLIENT_URL}/reset-password/${user._id}/${token}">here</a> to reset your password.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send password reset email" });
      }
      console.log("Password reset email sent:", info.response);
      res.status(200).json({ message: "Password reset email sent successfully" });
    });
  } catch (error) {
    console.error("Forgot password failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { userId, token, newPassword } = req.body;

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_KEY);
    if (!decoded || decoded.userId !== userId) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Find user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set new password and save
    user.password = newPassword;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = { loginController, registerController, forgotPassword, resetPassword };
