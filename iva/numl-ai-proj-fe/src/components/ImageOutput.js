// import React from "react";
// import './ImageGenerator.css';

// const ImageOutput = ({ imageUrl, onDownload }) => {

//   return (
//       <section className="output-section">
//         {imageUrl ? (
//           <img src={imageUrl} alt="Generated Result" className="output-image" />
//         ) : (
//           <div className="output-placeholder">
//             <p>Your generated image will appear here.</p>
//           </div>
//         )}
    
//         <div className="action-buttons">
//           <button className="download-btn" onClick={onDownload} disabled={!imageUrl}>
//             Download
//           </button>
//         </div>
//       </section>
//     );
// };

// export default ImageOutput;



import React from "react";
import './ImageGenerator.css';

const ImageOutput = ({ imageUrl, onDownload }) => {

  const handleDownload = () => {
    if (imageUrl) {
      // Create a link to trigger the download
      const link = document.createElement("a");
      
      // Check if the image URL is from an external source or a data URL
      if (imageUrl.startsWith("http")) {
        // If the image URL is external, you can fetch it as a Blob
        fetch(imageUrl)
          .then((res) => res.blob())
          .then((blob) => {
            // Create an object URL for the Blob
            const objectUrl = URL.createObjectURL(blob);
            link.href = objectUrl;
            link.download = "generated_image.png"; // You can change the name
            link.click();
            // Clean up the object URL after downloading
            URL.revokeObjectURL(objectUrl);
          });
      } else {
        // If it's already a data URL, just trigger the download
        link.href = imageUrl;
        link.download = "generated_image.png"; // You can change the name
        link.click();
      }
    }
  };

  return (
    <section className="output-section">
      {imageUrl ? (
        <img src={imageUrl} alt="Generated Result" className="output-image" />
      ) : (
        <div className="output-placeholder">
          <p>Your generated image will appear here.</p>
        </div>
      )}
  
      <div className="action-buttons">
        <button className="download-btn" onClick={handleDownload} disabled={!imageUrl}>
          Download
        </button>
      </div>
    </section>
  );
};

export default ImageOutput;
