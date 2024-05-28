import React, { useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import imageGallery from './imgGallery';
import AOS from 'aos';
import 'aos/dist/aos.css';


const ImageGallery = () => {
  useEffect(() => {
    AOS.init({
      duration: 2500,
      once: true,
    });
  }, []);

  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
        <Masonry gutter="1.5rem">
          {imageGallery.map((item, index) => (
            <img
              src={item}
              alt=""
              key={index}
              className="masonry_image transition-transform duration-300 ease-in-out transform hover:scale-110 rounded-lg"
              data-aos="fade-up"
              style={{ width: '100%', display: 'block' }}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export default ImageGallery;

