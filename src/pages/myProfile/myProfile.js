import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [cookies] = useCookies(["token"]);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        
        if (cookies.token) {
          const response = await axios.post(
            "http://localhost:3000/api/users/me",
            {
              token:cookies.token,
            },
          );

          setUserDetails(response.data);
        } else {
          // Handle the absence of token, e.g., redirect to login page
          console.error("Token is missing. Redirecting to /signin");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // You might want to handle errors or redirect to the login page
      }
    };
    
    fetchUserProfile();
  }, [cookies.token, navigate]);
  return (
<div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-1/2 h-full text-primeColor bg-white px-10 flex flex-col gap-6 justify-center">
        <h1 className="text-4xl font-bold mb-4">My Profile</h1>
        {userDetails ? (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Name: 
              </p>
              <p className="text-base font-medium">    {userDetails.name}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Email: 
              </p>
              <p className="text-base font-medium">    {userDetails.email}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Role:   
              </p>
              <p className="text-base font-medium">   {userDetails.role}</p>
            </div>

            {/* Add more attributes as needed */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
