import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaLinkedinIn, FaEye, FaEyeSlash } from 'react-icons/fa';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase"; // ✅ import from your firebase.js
import "../App.css";

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Google user:", user);

            // Optional: Save to localStorage or send to your backend
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect to dashboard or image generator
            navigate("/imagegenerator");
        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
            alert("Failed to sign in with Google");
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-left"></div>

            <div className="signin-right">
                <div className="signin-form-wrapper">
                    <div className="signin-form">
                        <p className="signin-welcome">Welcome back</p>
                        <h1 className="signin-title">Sign In</h1>

                        <label className="signin-label">Email</label>
                        <input type="email" className="signin-input" />

                        <label className="signin-label">Password</label>
                        <div className="signin-password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="signin-input"
                            />
                            <span className="signin-eye" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="signin-links">
                            <a href="#" className="signin-forgot">Forgot password?</a>
                        </div>

                        <button className="signin-button" onClick={() => navigate("/imagegenerator")}>Sign In</button>

                        <div className="signin-divider">OR</div>

                        <div className="signin-icons">
                            <button className="signin-icon" title="Sign in with Google" onClick={handleGoogleSignIn}>
                                <FaGoogle />
                            </button>
                            <button className="signin-icon" title="Sign in with Facebook">
                                <FaFacebookF />
                            </button>
                            <button className="signin-icon" title="Sign in with LinkedIn">
                                <FaLinkedinIn />
                            </button>
                        </div>

                        <div className="signin-footer">
                            Don’t have an account?
                            <a href="#" onClick={() => navigate("/signup")}>Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
