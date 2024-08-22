const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const jwt = require('jsonwebtoken')
const { readdirSync } = require('fs')
const nodemailer = require('nodemailer');
const UsrsSchema = require('./models/usrs');

const app = express()
//const mongoose  = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))
// app.post('/login', (req,res)=>{
//     res.send("my api login")
// })
// app.post('/register', (req, res) => {
//     res.send("my api register")
// })

//console.log(require('crypto').randomBytes(32).toString('hex'))

//new code
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        // Check if the user exists
        const user = await UsrsSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        // Send reset password email
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'workpurpose703@gmail.com',
                pass: 'xgdzhzupqvvxfjeo'
            }
        });
        var mailOptions = {
            from: 'workpurpose703@gmail.com',
            to: 'yshreyaawasthi23@gmail.com', // Use the email provided in the request
            subject: 'Reset Password Link',
           // text: `http://localhost:3000/reset_password/${user._id}/${token}`
            text: `http://localhost:5000/api/v1/reset-password`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: "error", message: "Error sending email" });
            } else {
                return res.status(200).json({ status: "success", message: "Password reset email sent successfully!" });
            }
        });
    } catch (error) {
        console.error("Error sending reset password email:", error);
        return res.status(500).json({ status: "error", message: "Error sending reset password email. Please try again." });
    }
});
const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}
server();