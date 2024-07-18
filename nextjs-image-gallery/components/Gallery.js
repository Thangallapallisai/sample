import { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log('Fetching images...');
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => {
        console.log('Images fetched:', data);
        setImages(data);
      })
      .catch((err) => console.error('Error fetching images:', err));
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDownload = (publicId) => {
    const url = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}.jpg`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'image.jpg');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const buttonStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    opacity: 0.8,
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={image.asset_id} style={{ position: 'relative' }}>
              <Image
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                publicId={image.public_id}
                width="300"
                crop="scale"
              />
              <button
                onClick={() => handleDownload(image.public_id)}
                style={buttonStyle}
              >
                Download
              </button>
            </div>
          ))
        ) : (
          <p>No images found</p>
        )}
      </div>
      {images.length > 0 && (
        <div>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
