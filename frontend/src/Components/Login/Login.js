// import React, { useState } from "react";
// import Loginpic from "../../img/Loginpic.jpeg";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./Login.css";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//     captchaInput: "",
//   });

//   const [captcha, setCaptcha] = useState(generateCaptcha());

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({
//       ...user,
//       [name]: value,
//     });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     toast.success("login");

//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/v1/userDetails",
//         user
//       );
//       localStorage.setItem(
//         "user",
//         JSON.stringify({ ...data.user, password: "" })
//       );
//     } catch (err) {
//       console.error("Login failed:", err);
//     }

//     if (user.captchaInput === captcha) {
//       try {
//         const response = await axios.post("http://localhost:5000/api/v1/login", {
//           email: user.email,
//           password: user.password,
//         });

//         const { data } = response;
//         if (data.token) {
//           localStorage.setItem("authToken", data.token);
//           navigate("/");
//           toast.success('Login successful!'); // Show success notification
//         }
//       } catch (err) {
//         console.error("Login failed:", err);
//       }
//     } else {
//       alert("Incorrect CAPTCHA. Please try again.");
//       setCaptcha(generateCaptcha());
//     }
//   };

//   function generateCaptcha() {
//     const characters =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let captcha = "";
//     const captchaLength = 6;

//     for (let i = 0; i < captchaLength; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       captcha += characters.charAt(randomIndex);
//     }

//     return captcha;
//   }

//   return (
//     <>
//       <ToastContainer />
//       <section className="sign-in">
//         <div className="container mt-5">
//           <div className="signin-content">
//             <div className="signin image">
//               <figure>
//                 <img src={Loginpic} alt="Login pic" />
//               </figure>
//               <NavLink to="/signup" className="signin-image-link">
//                 Create an account
//               </NavLink>
//             </div>

//             <div className="signin-form">
//               <h2 className="form-title">Sign In</h2>
//               <form className="register-form" id="register-form">
//                 <div className="form-group">
//                   <label htmlFor="email">
//                     <i className="zmdi zmdi-email material-icons-name"></i>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={user.email}
//                     onChange={handleChange}
//                     placeholder="Your email"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password">
//                     <i className="zmdi zmdi-lock material-icons-name"></i>
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={user.password}
//                     onChange={handleChange}
//                     placeholder="Your password"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="captcha">Enter the CAPTCHA:</label>
//                   <input
//                     type="text"
//                     id="captcha"
//                     name="captchaInput"
//                     value={user.captchaInput}
//                     onChange={handleChange}
//                     placeholder="Enter the CAPTCHA"
//                   />
//                   <p>CAPTCHA: {captcha}</p>
//                 </div>

//                 <div className="form-group form-button">
//                   <button
//                     type="submit"
//                     name="signup"
//                     id="signup"
//                     className="form-submit"
//                     onClick={onSubmit}
//                   >
//                     Login
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Login;

//with forget password
import React, { useState } from "react";
//import Loginpic from "../../img/Loginpic.jpeg";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    captchaInput: "",
  });

  const [captcha, setCaptcha] = useState(generateCaptcha());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/userDetails",
        user
      );
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
    } catch (err) {
      console.error("Login failed:", err);
    }

    if (user.captchaInput === captcha) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/login",
          {
            email: user.email,
            password: user.password,
          }
        );

        const { data } = response;
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          navigate("/");
          toast.success("Login successful!"); // Show success notification
        }
      } catch (err) {
        toast.error("Login unsuccessful! Invalid username or password."); // Show success notification
        console.error("Login failed:", err);
      }
    } else {
      alert("Incorrect CAPTCHA. Please try again.");
      setCaptcha(generateCaptcha());
    }
  };

  function generateCaptcha() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    const captchaLength = 6;

    for (let i = 0; i < captchaLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters.charAt(randomIndex);
    }

    return captcha;
  }

  return (
    <>
      <ToastContainer />
      <section className="sign-in">
        <div className="container mt-5">
          <div className="signin-content">
            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              <form className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="email">
                    <span className="input-group-text">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Your password"
                  />
                </div>

                <div className="form-group">
                  <div className="captcha-container1">

                    CAPTCHA: {captcha}
                  </div>
                  <div className="captcha-container2">

                    <input
                      type="text"
                      id="captcha"
                      name="captchaInput"
                      value={user.captchaInput}
                      onChange={handleChange}
                      placeholder="Enter the CAPTCHA"
                    />
                  </div>

                </div>
                <div className="form-group form-button1">
                  <button
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    onClick={onSubmit}
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="links-container">
                <NavLink to="/signup" className="signin-image-link">
                  Create an account
                </NavLink>
                <NavLink to="/forgot-password" className="forgot-password-link">
                  Forgot password
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
