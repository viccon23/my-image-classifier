import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import './App.css';



import cat1 from './images/cat1.jpg';
import dog1 from './images/dog1.jpg';
import cat2 from './images/cat2.jpg';
import dog2 from './images/dog2.jpg';
import cat3 from './images/cat3.jpg';
import dog3 from './images/dog3.png';

const AnimalImages = [cat1, dog1, cat2, dog2, cat3, dog3];

function App() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % AnimalImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="title">Cat or Dog?</div>
      <div className="container">
        <div className="image-container">
        {AnimalImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Animal ${index + 1}`}
                style={{
                  opacity: index === currentImageIndex ? 1 : 0,
                  position: index === currentImageIndex ? 'relative' : 'absolute',
                  zIndex: index === currentImageIndex ? 1 : 0,
                  transition: 'opacity 1s ease-in-out',
                }}
              />
            ))}
          </div>
        <div className="drop-container">
          <ImageUploader />
        </div>
      </div>
      <div className="instructions">
        <h1> So, what's the point of this site? </h1>
        Drag an image, any image, and a trained Machine Learning model will interpret the photo and declare if a cat or dog is present in the image. If not, then depending on it's confidence, it will output a message saying that no such animals are present. 
        <br></br>
        A bit of a fair warning however, it will not be able to distinguish both animals in one photo. In such case, it will either choose one or display a low confidence.
      </div>
    </div>
  );
}

export default App;