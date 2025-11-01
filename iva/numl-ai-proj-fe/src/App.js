import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LaunchPage from "./components/LaunchPage";
import ImageGenerator from "./components/ImageGenerator";
import AuthPage from "./components/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/imagegenerator" element={<ImageGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
