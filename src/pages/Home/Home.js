import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import PropertyCard from "./PropertyCard";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import Penthouse from "../../components/home/Penthouses/Penthouse";
import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import Heading from "../../components/home/Products/Heading";
import SampleNextArrow from "../../components/home/Penthouses/SampleNextArrow";
import SamplePrevArrow from "../../components/home/Penthouses/SamplePrevArrow";
import Slider from "react-slick";
const Home = () => {
  const [cookies] = useCookies(["latt", "long"]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch properties using latitude and longitude from cookies
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/properties", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: {
              latitude: cookies.latt,
              longitude: cookies.long,
            },
          }),
        });
        const data = await response.json();
        setProperties(data.listings);
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      }
    };

    fetchData();
  }, [cookies]);


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        <Sale />
        
        <Heading heading="In The Market" />
        
        <div className="max-w-container mx-auto px-4" style={{display:"flex", flexWrap:"wrap", margin: "0px"}}>
        {/* Render PropertyCard for each property */}
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
        </div>
        <Penthouse />
        <BestSellers />
        <YearProduct />
        <SpecialOffers />
      </div>
    </div>
  );
};

export default Home;
