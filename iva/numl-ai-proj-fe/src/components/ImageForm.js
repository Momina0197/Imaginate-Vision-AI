import React, { useRef, useState, useEffect } from "react";
import './ImageGenerator.css';

const ImageForm = ({ prompt, setPrompt, setImage, image, onGenerate, loading, error }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState(false);
  const [localImage, setLocalImage] = useState(image);

  useEffect(() => {
    // Sync local image when parent resets it
    if (!image) {
      setFileName("");
      setLocalImage(null);
    }
  }, [image]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setLocalImage(file);
      setImage(file);
      setFileError(false);
    }
  };

  const handleGenerateClick = () => {
    if (!localImage) {
      setFileError(true);
    }
    const imageData = {
      prompt,
      image: localImage,
    };
    onGenerate(imageData);
  };

  return (
    <section className="input-section">
      <label htmlFor="prompt">Enter Prompt</label>
      <textarea
        id="prompt"
        placeholder="Describe the image you want to generate"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>

      {/* Drag and Drop Zone */}
      <div
        className={`drop-zone ${fileError ? "error" : ""}`}
        onClick={handleUploadClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) {
            setFileName(file.name);
            setLocalImage(file);
            setImage(file);
            setFileError(false);
          }
        }}
      >
        <p>{fileName ? "Image Selected" : "Click or drag image here to upload"}</p>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      {fileName && (
        <div className="uploaded-image-preview">
          <div className="uploaded-image-info">
            <span className="checkmark">✅</span>
            <span className="filename" title={fileName}>{fileName}</span>
            <button
              className="dismiss-btn"
              onClick={() => {
                setFileName("");
                setLocalImage(null);
                setImage(null);
                fileInputRef.current.value = null;
              }}
            >
              ×
            </button>
          </div>
          {localImage && (
            <img
              src={URL.createObjectURL(localImage)}
              alt="Preview"
              className="image-thumbnail"
            />
          )}
        </div>
      )}

      {/* Show this specific error below image, above button */}
      {error && (
        <div className="form-error-message">
          <p className="error">{error}</p>
        </div>
      )}

      <button
        className={`generate-btn ${loading ? "loading" : ""}`}
        onClick={handleGenerateClick}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </section>
  );
};

export default ImageForm;
