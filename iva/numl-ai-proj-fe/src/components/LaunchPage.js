import React from "react";
import { useNavigate } from "react-router-dom";

function LaunchPage() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h1 className="auth-title">Welcome to Imaginate Vision AI</h1>

      <div className="auth-button-group">
        {/* Single button to go to combined Auth Page */}
        <button
          className="auth-button"
          onClick={() => navigate("/auth")}
        >
          Sign In / Sign Up
        </button>
      </div>
    </div>
  );
}

export default LaunchPage;
