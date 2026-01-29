import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import "../styles/servicesbook.css";

const Servicesbook = () => {
  const [planType, setPlanType] = useState("day");

  const packages = [
    {
      title: "Basic Package",
      price: 2500,
      features: [
        "Dusting of all surfaces",
        "Sweeping and mopping floors",
        "Vacuuming carpets and rugs",
        "Cleaning of kitchen surfaces",
        "Cleaning of bathroom surfaces",
        "Emptying trash bins",
      ],
    },
    {
      title: "Enterprise Package",
      price: 2200,
      features: [
        "All services in the Basic Plan",
        "Detailed dusting",
        "Wiping down kitchen appliances",
        "Cleaning inside the microwave",
        "Changing bed linens",
        "Spot cleaning walls and doors",
      ],
    },
    {
      title: "Premium Package",
      price: 2800,
      features: [
        "All services in the Clean Plan",
        "Deep cleaning of kitchen",
        "Baseboards, door frames & vents",
        "Organization of closets & pantries",
        "Carpet & upholstery spot cleaning",
        "Detailed bathroom cleaning",
      ],
    },
    {
      title: "Specialized Package",
      price: 3200,
      features: [
        "All services in the Clean Plan",
        "Deep cleaning of kitchen",
        "Baseboards, door frames & vents",
        "Organization of closets & pantries",
        "Carpet & upholstery spot cleaning",
        "Detailed bathroom cleaning",
      ],
    },
  ];

  return (
    <Layout>
      <section className="pricing-section">
        <div className="pricing-header">
          <p>OUR PRICING</p>
          <h1>
            Choose From Our Lowest <br /> Plans and Prices
          </h1>

          <div className="toggle">
            <button
              className={planType === "day" ? "active" : ""}
              onClick={() => setPlanType("day")}
            >
              Daily
            </button>
            <button
              className={planType === "hour" ? "active" : ""}
              onClick={() => setPlanType("hour")}
            >
              Hourly
            </button>
          </div>
        </div>

        <div className="pricing-cards">
          {packages.map((pkg, index) => (
            <div key={index} className="pricing-card">
              <h3>{pkg.title}</h3>

              <div className="price-box">
                Rs. {pkg.price} <span>/{planType}</span>
              </div>

              <ul>
                {pkg.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              <button className="book-btn">Book Now</button>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Servicesbook;
