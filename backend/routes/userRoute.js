const express = require("express");
const {
  loginController,
  registerController,
  forgotPassword, resetPassword
} = require("../controllers/userController");

//router object
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/forgot-password", forgotPassword);
//router.post("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;


//new code

// const express = require("express");
// const nodemailer  = require("nodemailer");
// const {
//   loginController,
//   registerController,
// } = require("../controllers/userController");

// //router object
// const router = express.Router();

// //routers
// // POST || LOGIN USER
// router.post("/login", loginController);

// //POST || REGISTER USER
// router.post("/register", registerController,(req,res)=>{
//   const {email} = req.body;
// try {
//     const transporter = nodemailer.createTransport({
//       service:"gmail",
//       auth:{
//         user:process.env.EMAIL,
//         pass:process.env.PASSWORD
//       }
//     });
//     const mailOptions = {
//       from : process.env.EMAIL,
//       to : email,
//       subject: "Verification mail sent",
//       html: "<h1>Verified successfully</h1>"
//     }
//     transporter.sendMail(mailOptions,(error,info)=>{
//       if(error){
//         console.log("Error",error)
//       }else
//       console.log("Email sent" + info.response);
//       res.status(201).json({status:201,info})
//     })

// } catch (error) {
//   res.status(401).json({status:401,error})
// }
// });
    

// module.exports = router;

