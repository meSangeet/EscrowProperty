// Import necessary React components and hooks
import React, { useState, useEffect } from 'react';
import './BuyerHome.css';
// Mock data for properties
const propertiesData = [
  { id: 1, name: 'Luxury Villa 1', location: 'City A', price: '$1,000,000', owner: 'John Doe' },
  { id: 2, name: 'Oceanfront Condo', location: 'City B', price: '$800,000', owner: 'Jane Smith' },
  { id: 2, name: 'Oceanfront Condo', location: 'City B', price: '$800,000', owner: 'Jane Smith' },
  { id: 2, name: 'Oceanfront Condo', location: 'City B', price: '$800,000', owner: 'Jane Smith' },
  { id: 2, name: 'Oceanfront Condo', location: 'City B', price: '$800,000', owner: 'Jane Smith' },
  { id: 2, name: 'Oceanfront Condo', location: 'City B', price: '$800,000', owner: 'Jane Smith' },
  { id: 2, name: 'Oceanfront Condo', location: 'City B', price: '$800,000', owner: 'Jane Smith' },
  { id: 2, name: 'Oceanfront Condo', location: 'City B', price: '$800,000', owner: 'Jane Smith' }

  // Add more mock data as needed
];

// Function to simulate fetching data from a server
const fetchProperties = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(propertiesData);
    }, 1000);
  });
};
// Main component for the homepage
const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5; // Number of properties to display per page

  useEffect(() => {
    // Fetch properties when the component mounts
    fetchProperties().then((data) => setProperties(data));
  }, []);

  // Filter properties based on search term
  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the properties to display for the current page
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Function to handle adding/removing properties from favorites
  const handleToggleFavorite = (propertyId) => {
    const isFavorite = favorites.includes(propertyId);
    if (isFavorite) {
      setFavorites(favorites.filter((id) => id !== propertyId));
    } else {
      setFavorites([...favorites, propertyId]);
    }
  };

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container"> {/* Header */}

      <h1>Welcome to PropLuxe</h1>
      <input
        type="text"
        placeholder="Search by location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {currentProperties.map((property) => (
          <li key={property.id}>
            <h2>{property.name}</h2>
            <p>Location: {property.location}</p>
            <p>Price: {property.price}</p>
            <p>Owner: {property.owner}</p>
            <button onClick={() => handleToggleFavorite(property.id)}>
              {favorites.includes(property.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <button onClick={() => console.log('Buy now clicked for', property.name)}>
              Buy Now
            </button>
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <div>
        {Array.from({ length: Math.ceil(filteredProperties.length / propertiesPerPage) }).map(
          (_, index) => (
            <button key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;