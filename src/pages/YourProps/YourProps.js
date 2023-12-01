import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ethers } from "ethers";
import { upload } from "@testing-library/user-event/dist/upload";

//abi import
const  propabi=[
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "propertyId",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "payer",
        type: "address",
      },
    ],
    name: "VerificationFeePaid",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "minimumPayment",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "propertyId",
        type: "string",
      },
    ],
    name: "payVerificationFee",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
]

const MyProps = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [properties, setProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState(null);
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
  };
  const handlePayVerificationFee = async () => {
    try {
      // Check if MetaMask is installed and available
      const propverify = "0x1b67dc3EAB89A7EE6aeeb73CF229B1109CdABA6b";
      if (window.ethereum) {
        // Create ethers provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        const signer = provider.getSigner();

        const contract=new ethers.Contract(propverify,propabi,signer);
        console.log(contract);

        // Perform operations using the address retrieved
        // ...
        const amount=ethers.utils.parseEther("0.001");
        const fn="payVerificationFee"
        const trans=await contract.functions[fn](currentProperty._id,{ value: amount })
        console.log(trans);if (trans && trans.hash) {
          // Transaction successful
          alert("Transaction successful!");
          // Refresh the page after 1 second
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          // Transaction failed
          alert("Transaction failed!");
        }
      } else {
        console.error("MetaMask not detected");
        // Handle the case when MetaMask is not available
      }
    } catch (error) {
      console.error("Error fetching account address:", error);
      // Handle the error gracefully - display a message to the user or perform necessary actions.
    }
  };
  
  const uploadfn = async () => {
    try {

        const jsonData = {
          token: cookies.token, // Replace with your token logic
          propertyId: currentProperty._id, // Assuming 'currentProperty' is set elsewhere
          // ... Add other JSON data properties if needed
        };

        // Merge file and JSON data into a single FormData object
   

        const uploadResponse = await axios.post("http://localhost:3000/api/properties/upload", jsonData);

        if (uploadResponse.status === 200) {
          
          alert("uploaded to ipfs!");
          window.location.reload();
          // You may perform additional actions after successful upload if needed
        } else {
          alert("Failed to upload image");
        }
      
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Your Properties" prevLocation={prevLocation} />
      <div className="mt-8">
        {properties.map((property) => (
          <div key={property._id} className="border p-4 mb-4 rounded-md" onClick={()=>handlePropertyClick(property)}>
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
            {!property.ipfsLink && (
        <button 
    onClick={uploadfn}
    className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
  >
uploadtoipfs  </button>
)}

              {property.ipfsLink&&property.paidVerification === false && (
                <button 
                onClick={handlePayVerificationFee}
                className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
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