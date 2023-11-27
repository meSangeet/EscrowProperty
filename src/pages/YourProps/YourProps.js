import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const YourProps = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [metadataURI, setMetadataURI] = useState("");

  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  const handleMintProperty = () => {
    // Call the mint function here with metadataURI
    // Example: mintFunction(metadataURI);
    console.log("Minting property with metadata URI:", metadataURI);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Your Properties" prevLocation={prevLocation} />

      <div className="mt-4">
        <label htmlFor="metadataURI" className="block text-sm font-medium text-gray-700">
          Enter IPFS Metadata URI:
        </label>
        <input
          type="text"
          id="metadataURI"
          className="mt-1 p-2 w-full border rounded-md"
          value={metadataURI}
          onChange={(e) => setMetadataURI(e.target.value)}
        />
      </div>

      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleMintProperty}
      >
        Mint Property
      </button>
    </div>
  );
};

export default YourProps;
