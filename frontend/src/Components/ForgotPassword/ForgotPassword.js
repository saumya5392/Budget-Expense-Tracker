import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/v1/forgot-password", { email });
            setMessage("Password reset email sent successfully");
        } catch (error) {
            console.error("Forgot password failed:", error);
            setMessage("Failed to send password reset email");
        }
    };

    return (
        <div className="forget-password">
            <div className="forget-password-content">
                <h2>Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button type="submit">Send Password Reset Email</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
