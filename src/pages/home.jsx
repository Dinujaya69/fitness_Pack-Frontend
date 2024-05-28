import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import Subtitle from "../Shared/Subtitle";
import ImageGallery from "../components/ImageGallery/ImageGallery";
import Testimonials from "../components/testimonial/Testimonial";
import "aos/dist/aos.css";
import AOS from "aos";
import video11 from "../videos/video11.mp4";
import video2 from "../videos/video2.mp4";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 2500, once: true });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-screen-lg flex flex-col items-center mt-6 lg:mt-20"
    >
      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl sm:text-6xl lg:text-7xl text-center text-transparent bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text"
      >
        FITNESS
        <span className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-transparent bg-clip-text">
          {" "}
          PACK
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10 text-lg text-center text-neutral-500 max-w-4xl"
      >
        "Welcome to Fitness Pack, where we're more than just a gym - we're a
        family dedicated to your fitness success! Join our pack and let's crush
        those goals together, one workout at a time. Dare to be fit, dare to be
        fabulous - join Fitness Pack today!"
      </motion.p>
      <div className="flex justify-center mt-10">
        <a
          href="/login"
          className="bg-red-600 hover:bg-red-700 rounded-md py-3 px-4 mx-3 text-white transition duration-300 ease-in-out"
        >
          Get Started
        </a>
      </div>
      {/* Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex mt-3 justify-center"
      >
        <motion.video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border-4 border-red-600 shadow-red-600 mx-2 my-4 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <source src={video11} type="video/mp4" />
        </motion.video>
        <motion.video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border-4 border-red-600 shadow-red-600 mx-2 my-4 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <source src={video2} type="video/mp4" />
        </motion.video>
      </motion.div>
      {/* Gym Details Section */}
      <section className="mt-12">
        <Container>
          <Row className="lg:flex">
            <Col lg="6">
              <div data-aos="fade-right" data-aos-duration="2000">
                <Subtitle subtitle={"Experience"} />
                <h2
                  className="text-center text-2xl lg:text-3xl font-semibold italic mt-4"
                  data-aos="fade-right"
                  data-aos-duration="2000"
                  data-aos-delay="400"
                >
                  Experience the Ultimate Fitness Journey
                </h2>
                <p
                  className="text-base lg:text-lg text-neutral-500 mt-4"
                  data-aos="fade-right"
                  data-aos-duration="2000"
                  data-aos-delay="600"
                >
                  Our gym is more than just a fitness center; it's a community
                  dedicated to transforming your health and wellness. With
                  state-of-the-art equipment, expert trainers, and personalized
                  programs, we're committed to helping you achieve your fitness
                  goals. Whether you're a beginner or a seasoned athlete, our
                  team is here to support you every step of the way.
                </p>
                <div
                  className="flex gap-5 mt-10"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <div className="bg-red-800 text-white rounded-lg p-4 flex items-center justify-center">
                    <span className="text-2xl font-semibold">150+</span>
                    <h6 className="text-sm lg:text-base font-medium text-yellow-50 ml-2">
                      Happy Members
                    </h6>
                  </div>
                  <div className="bg-red-800 text-white rounded-lg p-4 flex items-center justify-center">
                    <span className="text-2xl font-semibold">3</span>
                    <h6 className="text-sm lg:text-base font-medium text-yellow-50 ml-2">
                      Years in Service
                    </h6>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>{" "}
      <br />
      {/* Gallery Section */}
      <Container>
        <Row>
          <Col lg="12">
            <div data-aos="fade-right" data-aos-duration="2000">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="text-center text-2xl lg:text-3xl font-semibold italic mt-4">
                Visit Our Gallery
              </h2>
            </div>
            <br />
          </Col>
          <Col lg="12">
            <ImageGallery />
          </Col>
        </Row>
      </Container>
      {/* Testimonial Section */}
      <section className="mt-12">
        <Container>
          <Row>
            <Col lg="12">
              <div data-aos="fade-right" data-aos-duration="2000">
                <Subtitle subtitle={"Fans Love"} />
                <h2 className="text-center text-2xl lg:text-3xl font-semibold italic mt-4">
                  What our fans say about us
                </h2>
              </div>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
    </motion.div>
  );
};

export default Home;
