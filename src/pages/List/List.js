import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const PropertyUploadForm = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const handleSubmit = async (e) => {
    try{
    e.preventDefault();
    
    const formData = new FormData(e.target);

    formData.append('token', cookies.token);
    const resp=await fetch('http://localhost:3000/api/properties/add', {
      method: 'POST',
      body: formData,
    })
      if(resp.ok)
      {
        alert("created");
        navigate('/');
      }
      else{
        const data=await resp.json();
        alert(data.error)
      }
      
    }
    catch(err)
    {
      alert(err);
    }
    }

    return (
      <div className="max-w-screen-md mx-auto p-8 bg-gray-100 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6">Upload Property Information and Photos</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="nameInput" className="mb-1">Property Name:</label>
            <input type="text" id="nameInput" name="name" required className="border p-2 rounded-md" />
          </div>
    
          <div className="flex flex-col">
            <label htmlFor="latitudeInput" className="mb-1">Latitude:</label>
            <input type="text" id="latitudeInput" name="latitude" required className="border p-2 rounded-md" />
          </div>
    
          <div className="flex flex-col">
            <label htmlFor="longitudeInput" className="mb-1">Longitude:</label>
            <input type="text" id="longitudeInput" name="longitude" required className="border p-2 rounded-md" />
          </div>
    
          <div className="flex flex-col">
            <label htmlFor="balconyInput" className="mb-1">Number of Balconies:</label>
            <input type="number" id="balconyInput" name="balcony" required className="border p-2 rounded-md" />
          </div>
    
          <div className="flex flex-col">
            <label htmlFor="bedroomsInput" className="mb-1">Number of Bedrooms:</label>
            <input type="number" id="bedroomsInput" name="bedrooms" required className="border p-2 rounded-md" />
          </div>
    
          <div className="flex flex-col">
            <label htmlFor="bathroomsInput" className="mb-1">Number of Bathrooms:</label>
            <input type="number" id="bathroomsInput" name="bathrooms" required className="border p-2 rounded-md" />
          </div>
    
          <div className="flex flex-col">
            <label htmlFor="sqftInput" className="mb-1">Square Footage:</label>
            <input type="number" id="sqftInput" name="sqft" required className="border p-2 rounded-md" />
          </div>
    
          <div className="flex flex-col">
            <label htmlFor="photoInput" className="mb-1">Select Photos:</label>
            <input
              type="file"
              id="photoInput"
              name="photos"
              multiple
              accept="image/*"
              required
              className="border p-2 rounded-md"
            />
          </div>
    
          <div className="flex justify-end">
            <input type="submit" value="Upload" className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700" />
          </div>
        </form>
      </div>
    );
    };
export default PropertyUploadForm;