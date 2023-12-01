const escrowabi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "nftId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "seller",
          type: "address",
        },
      ],
      name: "NFTListed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "nftId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "userId",
          type: "string",
        },
        {
          indexed: false,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
      ],
      name: "NFTPurchased",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "nftId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "seller",
          type: "address",
        },
      ],
      name: "NFTWithdrawn",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "isListed",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_nftId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_price",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "nftaddr",
          type: "address",
        },
      ],
      name: "listNFT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "price",
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
          internalType: "uint256",
          name: "_nftId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "nftaddr",
          type: "address",
        },
        {
          internalType: "string",
          name: "userId",
          type: "string",
        },
      ],
      name: "purchaseNFT",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "seller",
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
      inputs: [
        {
          internalType: "uint256",
          name: "_nftId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "nftaddr",
          type: "address",
        },
      ],
      name: "withdrawListing",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  export default escrowabi;