import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const CommonSection = ({ title }) => {
  return (
    <section className="common-sec bg-gray-300 rounded-b-lg overflow-hidden">
      <Container className="h-3/4">
        <Row className="h-full">
          <Col lg="12" className="flex items-center justify-center">
            <h1 className="text-6xl text-white">{title}</h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CommonSection;
