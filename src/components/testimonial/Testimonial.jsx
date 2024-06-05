import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import gymAvt1 from "../../images/avt 1.jpeg";
import gymAvt2 from "../../images/avt 2.jpeg";
import gymAvt3 from "../../images/avt 3.jpeg";
import gymAvt4 from "../../images/avt 4.jpeg";
import "aos/dist/aos.css";
import AOS from "aos";
import "./testimonial.css"; // Import the CSS file for testimonials styles

function Testimonials() {
  useEffect(() => {
    AOS.init({ duration: 5000 });
  }, []);

  return (
    <div className="flex gap-4 mt-3 justify-between cardtest">
      <Card
        className="testimonial-card"
        data-aos="fade-up"
        data-aos-duration="5000"
      >
        <Card.Img variant="top" src={gymAvt1} />
        <Card.Body>
          <Card.Title>John Doe</Card.Title>
          <h6 className="role">Member</h6>
          <Card.Text>
            The gym facilities are top-notch. I've been a member for over a year
            now, and I'm impressed with the cleanliness and variety of equipment
            available. The trainers are knowledgeable and supportive, always
            helping me achieve my fitness goals.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        className="testimonial-card"
        data-aos="fade-left"
        data-aos-duration="5000"
      >
        <Card.Img variant="top" src={gymAvt2} />
        <Card.Body>
          <Card.Title>Jane Smith</Card.Title>
          <h6 className="role">Member</h6>
          <Card.Text>
            The gym atmosphere is fantastic. It's not just about working out;
            it's about community and support. The group classes are my favorite,
            and the instructors are motivating and fun.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        className="testimonial-card"
        data-aos="fade-right"
        data-aos-duration="5000"
      >
        <Card.Img variant="top" src={gymAvt3} />
        <Card.Body>
          <Card.Title>Mark Johnson</Card.Title>
          <h6 className="role">Member</h6>
          <Card.Text>
            I joined this gym recently, and I'm already feeling the positive
            impact on my health. The staff is friendly, and the personal
            training sessions have been tailored perfectly to my needs.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Testimonials;
