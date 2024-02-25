import React, { useState, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import './ImageUploader.css';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    // Load in coco-SSD model
    const loadModel = async () => {
      const model = await cocoSsd.load();
      return model;
    };

    // Resize image so that it'll match around the border box
    const resizeImage = (img) => {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 850; // Set the desired width
        canvas.height = 850; // Set the desired height
    
        const resizedImg = new Image();
        resizedImg.onload = () => {
          ctx.drawImage(resizedImg, 0, 0, canvas.width, canvas.height);
          resolve(canvas);
        };
    
        resizedImg.src = img.src;
      });
    };

    // If an image has been uploaded, create an element called img, make the model detect it, and set predictions.
    if (file) {
      const img = document.createElement('img');
      const reader = new FileReader();

      reader.onload = async (e) => {
        img.onload = async () => {
          // Resize the image before performing object detection
          const resizedImage = await resizeImage(img);

          // Perform object detection on the resized image
          const model = await loadModel();
          const predictions = await model.detect(resizedImage);

          setDetections(predictions);
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

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
      {!file && <p>Drag and drop an image here</p>}
      {file && (
        <div>
          <img src={URL.createObjectURL(file)} alt="Uploaded" />

          {detections.map((det, index) => (
            <div
              key={index}
              className="bounding-box"
              style={{
                top: det.bbox[1],
                left: det.bbox[0],
                width: det.bbox[2],
                height: det.bbox[3],
                borderRadius: '3px',
                position: 'absolute',
                border: '5px solid red',
                fontSize: '20px',
                color: 'red',
                fontWeight: 'bold',
              }}
            >
              {det.class} ({Math.round(det.score * 100)}%)
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;