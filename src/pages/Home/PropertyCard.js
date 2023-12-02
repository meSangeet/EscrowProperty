import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Heading from "../../components/home/Products/Heading";

const PropertyCard = ({ property }) => {
    const [cookies] = useCookies(["token"]);
    const [user, setUser] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch("http://localhost:3000/api/users/me", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: cookies.token,
              }),
            });
    
            const data = await response.json();
            setUser(data);
    
            // Determine verification status
            if (data.paidFor.includes(property._id)) {
              setVerificationStatus("pendingGovernmentApproval");
            } else if (data.govtapprovedFor.includes(property._id)) {
              setVerificationStatus("pendingAdminApproval");
            } else if (data.adminapprovedFor.includes(property._id)) {
              setVerificationStatus("buyProperty");
            }
          } catch (error) {
            console.error("Error fetching user data:", error.message);
          }
        };
    
        if (cookies.token) {
          fetchUserData();
        }
      }, [cookies.token, property._id]);

      const openModal = () => {
        setModalVisible(true);
        document.body.style.overflow = "hidden"; // Prevent scrolling
      };
    
      const closeModal = () => {
        setModalVisible(false);
        document.body.style.overflow = "auto"; // Enable scrolling
      };


  return (
    <div className="property-card" style={{margin: "0 0.5em"}}>
      
      <img
        src={property.photos[0]} // Assuming the first photo is the main one
        alt="name"
        style={{ height: "230px" }}
        onClick={openModal}
      />
      <p><h3 style={{fontWeight: "bolder"}}>{property.name}</h3> {property.price}ETH</p>
      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" style={{ overflowY: "auto", zIndex: "100"}}>
          <div className="bg-white p-8 rounded-md flex" style={{maxHeight:"70vh", overflow:"auto"}}>
            {/* Left Section (Photos) */}
            <div className="mr-4" style={{ flex: "1" }}>
            <div style={{ maxHeight: "90%", overflowY: "auto" }}>
              {property.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  style={{ height: "300px", width:"500px" }}
                />
              ))}
            </div>
            </div>

            {/* Right Section (Property Details) */}
            <div style={{ flex: "2", maxHeight: "70vh", maxWidth:"40%", overflowY: "auto", marginLeft: "20px"}}>
              <h3><span style={{ fontWeight: "bold" }}>{property.name}</span></h3>
              <p><span style={{ fontWeight: "bold" }}>Coordinates: </span>{property.location.coordinates.join(", ")}</p>
              <p><span style={{ fontWeight: "bold" }}>Distance: </span>{property.distance} meters</p>
              <p><span style={{ fontWeight: "bold" }}>Bedrooms: </span>{property.bedrooms}</p>
              <p><span style={{ fontWeight: "bold" }}>Bathrooms: </span>{property.bathrooms}</p>
              <p><span style={{ fontWeight: "bold" }}>Sqft: </span>{property.sqft}</p>
              <p><span style={{ fontWeight: "bold" }}>Balcony: </span>{property.balcony}</p>
              <p><span style={{ fontWeight: "bold" }}>Price: </span>{property.price}</p>
              <a
      href={property.nftlink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-black"
      style={{ display: "block", margin: "10px 0" }}
    >
                <span style={{ fontWeight: "bold" }}>View NFT</span>
              </a>

            {/* Render buttons based on verification status */}
            {user && verificationStatus === "pendingGovernmentApproval" && (
              <p>Pending government approval</p>
            )}
            {user && verificationStatus === "pendingAdminApproval" && (
              <p>Pending admin approval</p>
            )}
            {user && verificationStatus === "buyProperty" && (
              <a
                href={`http://127.0.0.1:5500/buyProp.html?nftid=${property.nftid}&userid=${user._id}&price=${property.price}`}
                target="_blank"
                className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2"
              >
                Buy Property
              </a>
            )}
            {user && verificationStatus === null && (
              <a
                href={`http://127.0.0.1:5500/verificationBuyer.html?propid=${property._id}&userid=${user._id}`}
                target="_blank"
                className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2"
              >
                Pay Verification
              </a>
            )}

             {/* Close button */}
    <button
      className="block bg-black text-white px-2 py-1 rounded-md mt-4"
      onClick={closeModal}
    >
      Close
    </button>
          </div>
        </div>
        </div>
      )}
      </div>
  );
};

export default PropertyCard;
