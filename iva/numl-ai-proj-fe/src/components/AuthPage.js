import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase"; // adjust the path if needed
import { signInWithPopup } from "firebase/auth";
import "../App.css"; // your CSS file

function AuthPage() {
  const [tab, setTab] = useState("signin");
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Login Success:", user);
      navigate("/imagegenerator");
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed. Try again.");
    }
  };

  return (
    <div className="signin-container">
      {/* Left Side Background */}
      <div className="signin-left" />

      {/* Right Side Form */}
      <div className="signin-right">
        <div className="signin-form-wrapper">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${tab === "signin" ? "active" : ""}`}
              onClick={() => setTab("signin")}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${tab === "signup" ? "active" : ""}`}
              onClick={() => setTab("signup")}
            >
              Sign Up
            </button>
          </div>

          <h2 className="signin-title">
            {tab === "signin" ? "Welcome Back!" : "Create Account"}
          </h2>

          <div className="signin-icons">
            <button className="signin-icon" onClick={handleGoogleLogin}>
              G
            </button>
          </div>

          <div className="signin-divider">or continue with email</div>

          <form className="signin-form" onSubmit={(e) => e.preventDefault()}>
            <label className="signin-label">Email</label>
            <input
              type="email"
              className="signin-input"
              placeholder="Enter your email"
              required
            />

            <label className="signin-label">Password</label>
            <div className="signin-password-wrapper">
              <input
                type="password"
                className="signin-input"
                placeholder="Enter your password"
                required
              />
              <span className="signin-eye">👁️</span>
            </div>

            <button className="signin-button" type="submit">
              {tab === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {tab === "signin" && (
            <div className="signin-links">
              <a className="signin-forgot" href="#">
                Forgot password?
              </a>
            </div>
          )}

          <div className="signin-footer">
            {tab === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setTab(tab === "signin" ? "signup" : "signin");
              }}
            >
              {tab === "signin" ? "Sign up" : "Sign in"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
