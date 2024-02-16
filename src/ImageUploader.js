import React, { useState } from 'react';
import './ImageUploader.css'; // Create this stylesheet for styling


const ImageUploader = () => {
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  return (
    <div
      className="image-uploader"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e)}
    >
      <p>Drag and drop an image here</p>
      {file && <img src={URL.createObjectURL(file)} alt="Uploaded" />}
    </div>
  );
};

export default ImageUploader;