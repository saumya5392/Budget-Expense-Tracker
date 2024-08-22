import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ResetPassword.css"; // Import CSS file

const ResetPassword = () => {
    const { userId, token } = useParams(); // Access URL parameters
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/v1/reset-password", { userId, token, newPassword });
            setMessage("Password reset successful");
        } catch (error) {
            console.error("Reset password failed:", error);
            setMessage("Failed to reset password");
        }
    };

    return (
        <div className="forget-password">
            <div className="forget-password-content">
                <h2>Reset Password</h2>
                <form onSubmit={handleResetPassword}>
                    <input type="hidden" value={userId} name="userId" />
                    <input type="hidden" value={token} name="token" />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                        required
                    />
                    <button type="submit">Reset Password</button>
                    <Link to='/login'>Back to Login</Link>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
