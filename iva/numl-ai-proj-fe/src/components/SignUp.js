import React, { useState } from "react";
import ImageForm from "./ImageForm";
import ImageOutput from "./ImageOutput";
import LoadingError from "./LoadingError";
import axios from 'axios';
import './ImageGenerator.css';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleGenerateImage = async () => {
    if (!prompt || !image) {
      setError("Please provide both an image and a prompt.");
      return;
    }

    setLoading(true);
    setError("");
    setGeneratedImage(null);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('prompt', prompt);

    try {
      const response = await axios.post('http://localhost:8000/edit-image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.image_url) {
        setGeneratedImage(response.data.image_url);
      } else {
        setError('Image not returned. Check backend.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditImage = () => {
    alert("Opening editor for the image...");
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "generated-image.png";
    link.click();
  };

  return (
    <div className="image-generator-container">
      <header className="image-generator-header">
        <div className="header-left">
          <h1 className="logo">Imaginate Vision AI</h1>
        </div>
        <div className="header-right">
          <div className="employee-info">
            <button className="logout-btn">Log Out</button>
            <img src="/path/to/employee-icon.png" alt="Employee Icon" className="employee-icon" />
          </div>
        </div>
      </header>

      <main className="image-generator-main">
        <section className="image-generator-welcome-section">
          <h1>Welcome Onboard</h1>
          <p>Create the Unseen, Powered by Imagine Vision AI</p>
        </section>

        {/* 🔌 Form Component */}
        <div className="generator-interface">
          <ImageForm
            prompt={prompt}
            setPrompt={setPrompt}
            setImage={setImage}
            onGenerate={handleGenerateImage}
          />
          {/* 🎨 Output Component */}
          <ImageOutput imageUrl={generatedImage} onEdit={handleEditImage} onDownload={handleDownload} />
        </div>
        {/* ⚠️ Error & Loading */}
        <LoadingError loading={loading} error={error} />

        {/* 👣 Steps Section */}
        <section className="image-generator-steps-section">
          <h3>How to turn your text into an image?</h3>
          <div className="image-generator-steps">
            <div className="image-generator-steps">
              <div className="image-generator-step">
                <div className="step-number">01</div>
                <h4>Enter Prompt</h4>
                <p>Start by entering detailed instructions of the image you want. You can also upload reference images for better results.</p>
              </div>
              <div className="image-generator-step">
                <div className="step-number">02</div>
                <h4>Generate Image</h4>
                <p>Using an advanced AI model, the system will generate an image based on your description.</p>
              </div>
              <div className="image-generator-step">
                <div className="step-number">03</div>
                <h4>Edit Image</h4>
                <p>If you need adjustments, click "Edit" to refine your image.</p>
              </div>
              <div className="image-generator-step">
                <div className="step-number">04</div>
                <h4>Download</h4>
                <p>Once satisfied with the image, hit "Download" to save it to your device.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ImageGenerator;
