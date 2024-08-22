// import React, { useState } from "react";
// import signuppic from "../../img/signuppic.png";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./Signup.css";
// import axios from "axios";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     firstName: "",
//     lastName: "",
//     phoneno: "",
//     work: "",
//     email: "",
//     password: "",
//   });

//   const [agreedTerms, setAgreedTerms] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({
//       ...user,
//       [name]: value,
//     });
//   };

//   const handleCheckboxChange = () => {
//     setAgreedTerms(!agreedTerms);
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (!agreedTerms) {
//       alert("Please agree to the terms and conditions.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/v1/signup", {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         phoneno: user.phoneno,
//         work: user.work,
//         email: user.email,
//         password: user.password,
//       });

//       const { data } = response;
//     } catch (err) {
//       console.error("Registration failed:", err);
//     }
//     navigate("/login");
//   };

//   return (
//     <>
//       <section className="signup">
//         <div className="container mt-5">
//           <div className="signup-content">
//             <div className="signup-form">
//               <h2 className="form-title">Sign up</h2>
//               <form className="register-form" value="register-form">
//                 <div className="form-group">
//                   <label htmlFor="name">
//                     <i className="zmdi zmdi-account material-icons-name"></i>
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={user.firstName}
//                     placeholder="Your First Name"
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="lname">
//                     <i className="zmdi zmdi-account material-icons-name"></i>
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={user.lastName}
//                     placeholder="Your Last Name"
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="phone">
//                     <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
//                   </label>
//                   <input
//                     type="text"
//                     name="phoneno"
//                     value={user.phoneno}
//                     placeholder="Your Phone Number"
//                     onChange={handleChange}
//                   />

//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="work">
//                     <i className="zmdi zmdi-slideshow material-icons-name"></i>
//                   </label>
//                   <input
//                     type="text"
//                     name="work"
//                     value={user.work}
//                     placeholder="Your Profession"
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="email">
//                     <i className="zmdi zmdi-email material-icons-name"></i>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={user.email}
//                     placeholder="Your email"
//                     onChange={handleChange}
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
//                     placeholder="Your password"
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="checkbox"
//                     id="terms-checkbox"
//                     name="terms"
//                     checked={agreedTerms}
//                     onChange={handleCheckboxChange}
//                   />
//                   <label htmlFor="terms" className="terms-label">
//                     I agree to the <NavLink to="/termsAndConditions">terms and conditions</NavLink>
//                   </label>
//                 </div>
//                 <div className="form-group form-button">
//                   <button
//                     type="submit"
//                     name="signup"
//                     value="signup"
//                     className="form-submit"
//                     onClick={onSubmit}
//                   >
//                     Register
//                   </button>
//                 </div>
//               </form>
//             </div>
//             <div className="signup image">
//               <figure>
//                 <img src={signuppic} alt="registration pic" />
//               </figure>
//               <NavLink to="/login" className="signup-image-link">
//                 I am already registered
//               </NavLink>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Signup;


//new code
import React, { useState } from "react";
//import signuppic from "../../img/signuppic.png";
import { NavLink, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateEmail } from "../../utils/common";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneno: "",
    work: "",
    email: "",
    password: "",
  });

  const [agreedTerms, setAgreedTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setAgreedTerms(!agreedTerms);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!agreedTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    } else if (user.firstName.length < 3) {
      toast.error("Please enter correct first name.");
      return;
    } else if (user.phoneno.length < 10) {
      toast.error("Please enter correct  phone number.");
      return;
    } else if (validateEmail(user.email) === false) {
      toast.error("Please enter correct  email.");
      return;
    } else if (user.password.length < 6) {
      toast.error("Please enter a valid password of length 6.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v1/signup", {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneno: user.phoneno,
        work: user.work,
        email: user.email,
        password: user.password,
      });

      const { data } = response;
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("Registration failed!! Please try again");
    }
    navigate("/login");
  };

  return (
    <>
      <ToastContainer />
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form className="register-form" value="register-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    placeholder="Your First Name*"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lname">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    placeholder="Your Last Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <span className="input-group-text">
                      <i className="fa fa-phone"></i>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="phoneno"
                    value={user.phoneno}
                    placeholder="Your Phone Number*"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="work">
                    <span className="input-group-text">
                      <i className="fa fa-building"></i>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="work"
                    value={user.work}
                    placeholder="Your Profession"
                    onChange={handleChange}
                  />
                </div>
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
                    placeholder="Your email*"
                    onChange={handleChange}
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
                    placeholder="Your password*"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group0">
                  <div className="form-group1">
                    <input
                      type="checkbox"
                      id="terms-checkbox"
                      name="terms"
                      checked={agreedTerms}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <div className="form-group2">
                    <label htmlFor="terms" className="terms-label">
                      I agree to the{" "}
                      <NavLink to="/termsAndConditions">
                        terms and conditions
                      </NavLink>
                    </label>
                  </div>
                </div>

                <div className="register-links">
                  <div className="links-container">
                    <NavLink to="/login" className="signup-image-link">
                      I am already registered
                    </NavLink>
                  </div>
                  <div className="form-group form-button">
                    <button
                      type="submit"
                      name="signup"
                      value="signup"
                      className="form-submit"
                      onClick={onSubmit}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
