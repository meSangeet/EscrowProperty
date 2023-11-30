import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import axios from "axios";
import { useCookies } from "react-cookie";

const MyProps = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [properties, setProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    setPrevLocation(location.state.data);

    // Fetch properties data using Axios
    axios
      .post("http://localhost:3000/api/properties/getmine", {
        token: cookies.token, // Replace with actual token retrieval logic
      })
      .then((response) => {
        setProperties(response.data.properties);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, [location]);

  const handlePropertyClick = (property) => {
    setCurrentProperty(property);
    setCurrentPhotoIndex(0);
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % currentProperty.photos.length);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Your Properties" prevLocation={prevLocation} />

      <div className="mt-8">
        {properties.map((property) => (
          <div key={property._id} className="border p-4 mb-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">{property.name}</h2>

            {/* Property Photos */}
            <div className="flex space-x-4 overflow-x-auto">
              {property.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${property.name}-photo-${index}`}
                  className="h-50px w-auto rounded-md"
                />
              ))}
            </div>

            {/* Status Field */}
            <div className="mt-4">
              {property.paidVerification === false && (
                <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
                  Pay Verification Fee
                </button>
              )}
              {property.govtApproved.isApproved === false && property.paidVerification && (
                <p className="text-yellow-500">Pending Government Approval</p>
              )}
              {property.approved.isApproved === false && property.govtApproved.isApproved && (
                <p className="text-yellow-500">Pending Admin Approval</p>
              )}
              {property.minted === false && property.approved.isApproved && (
                <button className="bg-green-500 text-white px-2 py-1 rounded-md mr-2">
                  Mint NFT
                </button>
              )}
              {property.canbelisted === false && property.minted && (
                <button className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2">
                  Approve Escrow
                </button>
              )}
              {property.listed === false && property.canbelisted && (
                <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                  List NFT
                </button>
              )}
              {property.listed === true && (
                <button className="bg-red-500 text-white px-2 py-1 rounded-md">
                  Withdraw NFT
                </button>
              )}
            </div>

            {/* Other Property Details (if needed) */}
            {/* ... */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProps;