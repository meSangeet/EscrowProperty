import React, { useState } from 'react';
import axios from 'axios';

const AddProps = () => {
  const [formData, setFormData] = useState({
    name: '',
    token: '', // Retrieve from cookies
    latitude: '',
    longitude: '',
    photos: [],
    balcony: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const selectedPhotos = Array.from(e.target.files);

    if (selectedPhotos.length < 3) {
      setErrorMessage('Please upload at least 3 photos.');
    } else {
      setErrorMessage('');
      setFormData({ ...formData, photos: selectedPhotos });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform API call using Axios
      const response = await axios.post('http://localhost:300/api/properties/add', formData);

      if (response.status === 200) {
        setSuccessMessage('Property details uploaded successfully!');
      } else {
        setErrorMessage('Failed to upload property details.');
      }
    } catch (error) {
      console.error('API call error:', error);
      setErrorMessage('Failed to upload property details.');
    }
  };

  return (
    <div className="bg-black text-white p-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="bg-white text-black p-2 rounded"
          />
        </div>

        {/* Add other input fields with appropriate labels, IDs, and classes */}
        {/* ... */}

        <div className="mb-4">
          <label htmlFor="photos">Upload Photos (at least 3):</label>
          <input
            type="file"
            id="photos"
            name="photos"
            onChange={handlePhotoUpload}
            multiple
            className="bg-white text-black p-2 rounded"
          />
        </div>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        <button type="submit" className="bg-white text-black p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProps;
