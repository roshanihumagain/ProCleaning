import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../assets/styles/feedback.css";
import One from "../assets/images/one.jpeg";
import Two from "../assets/images/two.jpeg";
import Three from "../assets/images/three.jpeg";
import Four from "../assets/images/four.jpeg";
import Layout from "../components/layout/Layout";
import axios from "axios";

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
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/interactions/testimonials");
        setTestimonials(response.data);
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      }
    };
    fetchTestimonials();
  }, []);

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

  // Static fallback if no testimonials exist in DB yet
  const staticTestimonials = [
    { name: "Rumi Adhikari", avatar: One, text: "Excellent service! The team was punctual, thorough, and left my home sparkling clean." },
    { name: "Rahul Sharma", avatar: Two, text: "I've used ProCleaning multiple times, and each time they exceed my expectations." },
    { name: "Priya Patel", avatar: Three, text: "The team at ProCleaning transformed my home in just a few hours." },
    { name: "Amit Kumar", avatar: Four, text: "ProCleaning has become my go-to for all cleaning needs." }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : staticTestimonials;

  return (
    <Layout>
      <section className="feedback-section">
        <h1 className="title">What our Customers say</h1>
        <p className="subtitle">
          Real feedback from our satisfied clients about our professional cleaning services.
        </p>

        <div className="slider-wrapper">
          <Slider {...settings}>
            {displayTestimonials.map((t, index) => (
              <div key={index} className="slide">
                <div className="card">
                  <img src={t.avatar_url || t.avatar || One} alt={t.user_name || t.name} className="avatar" />
                  <h3 className="name">{t.user_name || t.name}</h3>
                  <span className="role">Customer</span>
                  <p className="feedback-text">
                    “{t.text}”
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </Layout>
  );
};

export default Feedback;
