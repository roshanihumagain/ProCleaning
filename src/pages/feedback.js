import React from "react";
import Slider from "react-slick";
import "../styles/feedback.css";
import One from "../images/one.jpeg";
import Two from "../images/two.jpeg";
import Three from "../images/three.jpeg";
import Four from "../images/four.jpeg";
import Layout from "../Components/Layout/Layout";

const NextArrow = ({ onClick }) => {
  return (
    <button className="arrow next" onClick={onClick}>
      &gt;
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button className="arrow prev" onClick={onClick}>
      &lt;
    </button>
  );
};

const Feedback = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Layout>
      <section className="feedback-section">
        <h1 className="title">What our Customers say</h1>
        <p className="subtitle">
          All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks.
        </p>

        <div className="slider-wrapper">
          <Slider {...settings}>
            <div className="slide">
              <div className="card">
                <img src={One} alt="Rumi Adhikari" className="avatar" />
                <h3 className="name">Rumi Adhikari</h3>
                <span className="role">Customer</span>
                <p className="feedback-text">
                  “Excellent service! The team was punctual, thorough, and left my home sparkling clean.”
                </p>
              </div>
            </div>

            <div className="slide">
              <div className="card">
                <img src={Two} alt="Rahul Sharma" className="avatar" />
                <h3 className="name">Rahul Sharma</h3>
                <span className="role">Customer</span>
                <p className="feedback-text">
                  “I've used ProCleaning multiple times, and each time they exceed my expectations.”
                </p>
              </div>
            </div>

            <div className="slide">
              <div className="card">
                <img src={Three} alt="Priya Patel" className="avatar" />
                <h3 className="name">Priya Patel</h3>
                <span className="role">Customer</span>
                <p className="feedback-text">
                  “The team at ProCleaning transformed my home in just a few hours.”
                </p>
              </div>
            </div>

            <div className="slide">
              <div className="card">
                <img src={Four} alt="Amit Kumar" className="avatar" />
                <h3 className="name">Amit Kumar</h3>
                <span className="role">Customer</span>
                <p className="feedback-text">
                  “ProCleaning has become my go-to for all cleaning needs.”
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </section>
    </Layout>
  );
};

export default Feedback;
