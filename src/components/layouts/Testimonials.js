import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../../stylesheets/category.css";

import susan from "../../images/susan.jpg";
import james from "../../images/jamess.jpg";
import ann from "../../images/ann.jpg";

const Testimonials = () => {
  return (
    <div className="container testimonial">
      <h2 className="text-center mb-4 ">TES<span className="underline">TIMONI</span>ALS</h2>
      <div className="carousel-div">
      <Carousel>
        <Carousel.Item className="item">
          <img style={imgStyle} src={susan} alt="susan" />
          <Carousel.Caption>
            <p>
              On Tudemy, You can learn absolutely anything worth learning. I
              learnt HTML & CSS and a bit of javascript/jquery. I have decent
              knowledge of html/css & js. Whether if you're newbie or just
              looking for a refresher course, look no further. This is it!
              Thanks again Tudemy!
            </p>
            <h4>
              <i>SUSAN BROX</i>, Web Developer
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="item">
          <img style={imgStyle} src={james} alt="James" />

          <Carousel.Caption>
            <p>
              The Tutors on here are simply the best. To be one of the best
              students too, take notes and practice along. If you pass the final
              exam at the end like I did(and for graduate students, that means
              getting an 80% or better), then you are more than ready for any
              adventure{" "}
            </p>
            <h4>
              <i>JAMES MILNER</i>, Statistician
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="item">
          <img style={imgStyle} src={ann} alt="Ann" />
          <Carousel.Caption>
            <p>
              Mastering the technical skills needed to analyze financial
              statements and disclosures for use in financial analysis, and
              learn how accounting standards and managerial incentives affect
              the financial reporting process is one thing i'll forever thank
              Tudemy for.
            </p>
            <h4>
              <i>ANN DREW</i>, Accountant
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>
    </div>
  );
};

const imgStyle = {
  height: "150px",
  width: "150px", 
  borderRadius: "50%",
};

export default Testimonials;
