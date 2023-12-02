import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Property from '../../components/home/Products/Property2';



const PropertyList = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with actual token retrieval logic
    const token = cookies.token;

    axios
      .post("http://localhost:3000/api/properties/getmine", { token })
      .then((response) => {
        setProperties(response.data.properties);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {properties.map((property) => (
        <Property property={property} />
      ))}
    </div>
  );
};

export default PropertyList;