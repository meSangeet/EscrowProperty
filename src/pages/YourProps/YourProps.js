import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ethers } from "ethers";
import { upload } from "@testing-library/user-event/dist/upload";
import Web3 from "web3";
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
  async function handleMint (link) {
      const ipfsUri = link;
      console.log(link);
      if (!ipfsUri) {
        alert("Please enter an IPFS URI");
        return;
      }

      // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask to mint NFTs');
      return;
    }

    // Request account access
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Contract address
      const contractAddress = '0xe916BeeA0314077e45A59EF386022B27aF585718';

      const contractAbi = [
        { inputs: [], stateMutability: "nonpayable", type: "constructor" },
        {
          inputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "address", name: "owner", type: "address" },
          ],
          name: "ERC721IncorrectOwner",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "ERC721InsufficientApproval",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "approver", type: "address" },
          ],
          name: "ERC721InvalidApprover",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "operator", type: "address" },
          ],
          name: "ERC721InvalidOperator",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
          ],
          name: "ERC721InvalidOwner",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "receiver", type: "address" },
          ],
          name: "ERC721InvalidReceiver",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "sender", type: "address" },
          ],
          name: "ERC721InvalidSender",
          type: "error",
        },
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "ERC721NonexistentToken",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "approved",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "_fromTokenId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "_toTokenId",
              type: "uint256",
            },
          ],
          name: "BatchMetadataUpdate",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "ContractApproved",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "_tokenId",
              type: "uint256",
            },
          ],
          name: "MetadataUpdate",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "tokenURI",
              type: "string",
            },
          ],
          name: "NFTMinted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [],
          name: "a",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "admin",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "approve",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "approveContract",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
          ],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "getApproved",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "getTokenURIById",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "operator", type: "address" },
          ],
          name: "isApprovedForAll",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "string", name: "tokenURI", type: "string" },
          ],
          name: "mint",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "ownerOf",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "bool", name: "approved", type: "bool" },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
          ],
          name: "supportsInterface",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "tokenURI",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      // Call the mint function
      try {
        // Get the account and nonce
        const accounts = await web3.eth.getAccounts();
        const nonce = await web3.eth.getTransactionCount(accounts[0]);
  
        // Estimate gas
        const gasEstimation = await contract.methods.mint(ipfsUri).estimateGas({
          from: accounts[0],
        });
  
        // Send transaction
        const result = await contract.methods.mint(ipfsUri).send({
          from: accounts[0],
          gas: gasEstimation, // Adjust the gas limit as needed
          nonce: nonce,
        });
  
        // Check transaction receipt for confirmation
        const receipt = await web3.eth.getTransactionReceipt(result.transactionHash);
  
        if (receipt.status) {
          console.log('Transaction confirmed:', receipt);
          alert('NFT Minted successfully!');
        } else {
          console.error('Transaction failed:', receipt);
          alert('NFT Minting failed. Please check the console for details.');
        }
      } catch (error) {
        console.error("Error minting NFT:", error.message);
        alert(`Error minting NFT: ${error.message}`);
      }
    } catch (error) {
      console.error('Error requesting account access:', error.message);
      alert('Error requesting account access');
    }
  };
  const uploadfn = async () => {
    try {

        const jsonData = {
          token: cookies.token, // Replace with your token logic
          propertyId: currentProperty._id, // Assuming 'currentProperty' is set elsewhere
          // ... Add other JSON data properties if needed
        };
        console.log(jsonData);
        // Merge file and JSON data into a single FormData object
   

        const uploadResponse = await axios.post("http://localhost:3000/api/properties/upload", jsonData);

        if (uploadResponse.status === 200) {
          
          alert("uploaded to ipfs!");
          window.location.reload();
          // You may perform additional actions after successful upload if needed
        } else {
          alert("Failed to upload");
        }
      
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Your Properties" prevLocation={prevLocation} />
      <div className="mt-8">
        {properties.map((property) => (
          <div key={property._id} className="border p-4 mb-4 rounded-md" onClick={() => handlePropertyClick(property)}>
            <h2 className="text-lg font-semibold mb-2">{property.name}</h2>
            
            {/* Property Photos*/}
            <div className="flex space-x-4 overflow-x-auto">
              {property.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${property.name}-photo-${index}`}
                  className="w-auto rounded-md"
                  style = {{height:"200px"}}
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
                <a
                href={`http://127.0.0.1:5500/verificationProp.html?propid=${property._id}`}
                 target="_blank"
                className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
                  Pay Verification Fee
                </a>
              )}
              {property.ipfsLink && property.govtApproved.isApproved === false && property.paidVerification && (
                <p className="text-yellow-500">Pending Government Approval</p>
              )}
              {property.ipfsLink && property.paidVerification && property.approved.isApproved === false && property.govtApproved.isApproved && (
                <p className="text-yellow-500">Pending Admin Approval</p>
              )}
              {property.ipfsLink && property.paidVerification && property.minted === false && property.approved.isApproved && property.govtApproved.isApproved && (
  <a
    href={`http://127.0.0.1:5500/mint.html?ipfs=${property.ipfsLink}`}
    target="_blank"
    className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
  >
    Mint NFT
  </a>
)}
              {property.ipfsLink && property.paidVerification  && property.approved.isApproved && property.govtApproved.isApproved && property.canbelisted === false && property.minted && (
                <a
                href={`http://127.0.0.1:5500/approve.html?nftid=${property.nftid}`}
                 target="_blank"
                className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2">
                  Approve Escrow
                </a>
              )}
              {property.ipfsLink && property.paidVerification  && property.approved.isApproved && property.govtApproved.isApproved && property.listed === false && property.canbelisted && (
                <a
                href={`http://127.0.0.1:5500/list.html?nftid=${property.nftid}`}
                 target="_blank"
                className="bg-purple-500 text-white px-2 py-1 rounded-md mr-2">
                  List NFT
                </a>
              )}
              {property.ipfsLink && property.paidVerification  && property.approved.isApproved && property.govtApproved.isApproved && property.listed === true && (
                <a
                href={`http://127.0.0.1:5500/withdraw.html?nftid=${property.nftid}`}
                 target="_blank"
                className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
                  Withdraw NFT
                </a>
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