import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import gymAvt1 from "../../images/avt 1.jpeg";
import gymAvt2 from "../../images/avt 2.jpeg";
import gymAvt3 from "../../images/avt 3.jpeg";
import gymAvt4 from "../../images/avt 4.jpeg";
import "aos/dist/aos.css";
import AOS from "aos";

function Testimonials() {
  useEffect(() => {
    AOS.init({ duration: 5000 });
  }, []);

  return (
    <div className="flex gap-4 mt-3 justify-between cardtest">
      <Card
        className="w-80 border border-red-500 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        data-aos="fade-up"
        data-aos-duration="5000"
      >
        <Card.Img variant="top" src={gymAvt1} className="object-cover h-64" />
        <Card.Body className="flex flex-col items-center">
          <Card.Title>John Doe</Card.Title>
          <h6 className="text-red-500 font-bold">Member</h6>
          <Card.Text className="text-sm CardiText text-justify">
            The gym facilities are top-notch. I've been a member for over a year
            now, and I'm impressed with the cleanliness and variety of equipment
            available. The trainers are knowledgeable and supportive, always
            helping me achieve my fitness goals.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        className="w-80 border border-red-500 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        data-aos="fade-left"
        data-aos-duration="5000"
      >
        <Card.Img variant="top" src={gymAvt2} className="object-cover h-64" />
        <Card.Body className="flex flex-col items-center">
          <Card.Title>Jane Smith</Card.Title>
          <h6 className="text-red-500 font-bold">Member</h6>
          <Card.Text className="text-sm CardiText text-justify">
            The gym atmosphere is fantastic. It's not just about working out;
            it's about community and support. The group classes are my favorite,
            and the instructors are motivating and fun.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        className="w-80 border border-red-500 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        data-aos="fade-right"
        data-aos-duration="5000"
      >
        <Card.Img variant="top" src={gymAvt3} className="object-cover h-64" />
        <Card.Body className="flex flex-col items-center">
          <Card.Title>Mark Johnson</Card.Title>
          <h6 className="text-red-500 font-bold">Member</h6>
          <Card.Text className="text-sm CardiText text-justify">
            I joined this gym recently, and I'm already feeling the positive
            impact on my health. The staff is friendly, and the personal
            training sessions have been tailored perfectly to my needs.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        className="w-80 border border-red-500 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        data-aos="fade-up"
        data-aos-duration="5000"
      >
        <Card.Img variant="top" src={gymAvt4} className="object-cover h-64" />
        <Card.Body className="flex flex-col items-center">
          <Card.Title>Sarah Adams</Card.Title>
          <h6 className="text-red-500 font-bold">Member</h6>
          <Card.Text className="text-sm CardiText text-justify">
            The gym's cleanliness and hygiene standards are commendable. It's
            reassuring to work out in such a well-maintained environment. The
            membership benefits are also great, with access to all fitness
            classes included.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Testimonials;
