import React, { useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import imageGallery from "./imgGallery";
import "aos/dist/aos.css";
import AOS from "aos";

const ImageGallery = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations
      once: true, // Only animate once
    });
  }, []);

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
      <Masonry gutter="1.5rem">
        {imageGallery.map((image, index) => (
          <div
            key={index}
            className="masonry-item"
            data-aos="fade-up"
            data-aos-duration="1000" // Adjust animation duration as needed
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="masonry_image transition-transform duration-300 ease-in-out transform hover:scale-110 rounded-lg"
              style={{ width: "100%", display: "block" }}
            />
            <div
              className={`text-animation-${index + 1}`}
              data-aos={`fade-${index % 2 === 0 ? "left" : "right"}`}
              data-aos-duration="1000" // Adjust animation duration as needed
            >
              {/* Unique text animation for each image */}
            </div>
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ImageGallery;
