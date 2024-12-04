
export const EDUCHAIN_MAILBOX =
  "0x5425F7F15E7a44930afDbE3906A13C5E7F82a38b";
export const INCO_ADDRESS = "0x3E52457a30F0F002B4fF43DA43f81cB535F7a4B9";
export const USDCADDRESS = "0xED04015A40e27880694928787A9f89D7EF1b9F6e";
export const EDUCHAIN_EVENT_CONTRACT =
  "0xc02C45cf15832791D12f41fCA2920a314bE51df5";

export const MAILBOXES = {
  EDUCHAIN: EDUCHAIN_MAILBOX,
  INCO: INCO_ADDRESS,
};

export const INCO_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_mailBoxAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "eaddress",
        name: "holderAddress",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenProcessed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "einput",
        name: "_eaddressInput",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "inputProof",
        type: "bytes",
      },
    ],
    name: "formEaddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "senderContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getDeterministicKey",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_tokeKey",
        type: "bytes32",
      },
    ],
    name: "getEaddressForTicket",
    outputs: [
      {
        internalType: "eaddress",
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
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenContractAddress",
        type: "address",
      },
    ],
    name: "getRandomWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_origin",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_sender",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "handle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "interchainSecurityModule",
    outputs: [
      {
        internalType: "contract IInterchainSecurityModule",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mailbox",
    outputs: [
      {
        internalType: "contract IMailbox",
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
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "randomNumber",
        type: "uint32",
      },
    ],
    name: "myCustomCallback",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "eventContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "readUsersTotalTickets",
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
    inputs: [],
    name: "renounceOwnership",
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
    name: "requestIdToStruct",
    outputs: [
      {
        internalType: "uint256",
        name: "originChain",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "eventContractAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "returnAEaddress",
    outputs: [
      {
        internalType: "eaddress",
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
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "eventContract",
        type: "address",
      },
    ],
    name: "returnEaddress",
    outputs: [
      {
        internalType: "eaddress",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "setInterchainSecurityModule",
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
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenKeyCounter",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "tokenKeyToAmount",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "tokenKeyToEaddress",
    outputs: [
      {
        internalType: "eaddress",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "eaddress",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenKeyToEaddressToAmount",
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
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenKeyWinner",
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
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const EDUCHAIN_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_paymentToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_mailBoxAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_raffleAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_incoContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "actualEInput",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "inputProof",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TokenPurchased",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "cost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "incoContractAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "incoDomain",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mailBox",
		"outputs": [
			{
				"internalType": "contract IMailbox",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paymentToken",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "actualEInput",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "hashOfInputProof",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "purchaseToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "raffleAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "inputProof",
				"type": "bytes"
			}
		],
		"name": "returnByte32Hash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newIncoContractAddress",
				"type": "address"
			}
		],
		"name": "setIncoContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "tokenIdToAddressToAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenIdToToAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenUri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newRaffleAmount",
				"type": "uint256"
			}
		],
		"name": "updateRaffleAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export const DUMMYABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_paymentToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_mailBoxAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_raffleAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_incoContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "actualEInput",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "inputProof",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TokenPurchased",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "cost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "incoContractAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "incoDomain",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mailBox",
		"outputs": [
			{
				"internalType": "contract IMailbox",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paymentToken",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "actualEInput",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "hashOfInputProof",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "purchaseToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "raffleAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "inputProof",
				"type": "bytes"
			}
		],
		"name": "returnByte32Hash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newIncoContractAddress",
				"type": "address"
			}
		],
		"name": "setIncoContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "tokenIdToAddressToAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenIdToToAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenUri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newRaffleAmount",
				"type": "uint256"
			}
		],
		"name": "updateRaffleAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export const USDC_EDUCHAIN_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
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
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "transferFromOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const CONTRACTBYTECODE =
 "608060405234801561000f575f80fd5b50604051611ae3380380611ae383398181016040528101906100319190610321565b335f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036100a2575f6040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161009991906103a7565b60405180910390fd5b6100b1816101cf60201b60201c565b508460025f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360035f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040518060400160405280600381526020017f75726900000000000000000000000000000000000000000000000000000000008152506005908161017691906105f1565b50826006819055508160045f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060078190555050505050506106c0565b5f805f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050815f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6102bd82610294565b9050919050565b6102cd816102b3565b81146102d7575f80fd5b50565b5f815190506102e8816102c4565b92915050565b5f819050919050565b610300816102ee565b811461030a575f80fd5b50565b5f8151905061031b816102f7565b92915050565b5f805f805f60a0868803121561033a57610339610290565b5b5f610347888289016102da565b9550506020610358888289016102da565b94505060406103698882890161030d565b935050606061037a888289016102da565b925050608061038b8882890161030d565b9150509295509295909350565b6103a1816102b3565b82525050565b5f6020820190506103ba5f830184610398565b92915050565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061043b57607f821691505b60208210810361044e5761044d6103f7565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026104b07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610475565b6104ba8683610475565b95508019841693508086168417925050509392505050565b5f819050919050565b5f6104f56104f06104eb846102ee565b6104d2565b6102ee565b9050919050565b5f819050919050565b61050e836104db565b61052261051a826104fc565b848454610481565b825550505050565b5f90565b61053661052a565b610541818484610505565b505050565b5b81811015610564576105595f8261052e565b600181019050610547565b5050565b601f8211156105a95761057a81610454565b61058384610466565b81016020851015610592578190505b6105a661059e85610466565b830182610546565b50505b505050565b5f82821c905092915050565b5f6105c95f19846008026105ae565b1980831691505092915050565b5f6105e183836105ba565b9150826002028217905092915050565b6105fa826103c0565b67ffffffffffffffff811115610613576106126103ca565b5b61061d8254610424565b610628828285610568565b5f60209050601f831160018114610659575f8415610647578287015190505b61065185826105d6565b8655506106b8565b601f19841661066786610454565b5f5b8281101561068e57848901518255600182019150602085019450602081019050610669565b868310156106ab57848901516106a7601f8916826105ba565b8355505b6001600288020188555050505b505050505050565b611416806106cd5f395ff3fe6080604052600436106100fd575f3560e01c80636bd5c4e611610094578063c77391e611610063578063c77391e6146102f9578063c94028c214610323578063e2f09c801461034d578063f2fde38b14610389578063f52bcc11146103b1576100fd565b80636bd5c4e614610253578063715018a61461027d5780638da5cb5b14610293578063b4581e6d146102bd576100fd565b8063355e0c5d116100d0578063355e0c5d146101bb5780633938ce14146101e5578063494be57a14610201578063547cb1d41461022b576100fd565b806313faede61461010157806317d70f7c1461012b578063230ee055146101555780633013ce2914610191575b5f80fd5b34801561010c575f80fd5b506101156103d9565b6040516101229190610bd1565b60405180910390f35b348015610136575f80fd5b5061013f6103df565b60405161014c9190610bd1565b60405180910390f35b348015610160575f80fd5b5061017b60048036038101906101769190610c4f565b6103e5565b6040516101889190610bd1565b60405180910390f35b34801561019c575f80fd5b506101a5610405565b6040516101b29190610ccc565b60405180910390f35b3480156101c6575f80fd5b506101cf61042a565b6040516101dc9190610d55565b60405180910390f35b6101ff60048036038101906101fa9190610d75565b6104b6565b005b34801561020c575f80fd5b506102156108aa565b6040516102229190610ccc565b60405180910390f35b348015610236575f80fd5b50610251600480360381019061024c9190610def565b6108cf565b005b34801561025e575f80fd5b50610267610912565b6040516102749190610e75565b60405180910390f35b348015610288575f80fd5b50610291610937565b005b34801561029e575f80fd5b506102a761094a565b6040516102b49190610ccc565b60405180910390f35b3480156102c8575f80fd5b506102e360048036038101906102de9190610eef565b610971565b6040516102f09190610f49565b60405180910390f35b348015610304575f80fd5b5061030d610992565b60405161031a9190610f80565b60405180910390f35b34801561032e575f80fd5b50610337610998565b6040516103449190610bd1565b60405180910390f35b348015610358575f80fd5b50610373600480360381019061036e9190610f99565b61099e565b6040516103809190610bd1565b60405180910390f35b348015610394575f80fd5b506103af60048036038101906103aa9190610def565b6109b3565b005b3480156103bc575f80fd5b506103d760048036038101906103d29190610f99565b610a37565b005b60075481565b60015481565b6008602052815f5260405f20602052805f5260405f205f91509150505481565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6005805461043790610ff1565b80601f016020809104026020016040519081016040528092919081815260200182805461046390610ff1565b80156104ae5780601f10610485576101008083540402835291602001916104ae565b820191905f5260205f20905b81548152906001019060200180831161049157829003601f168201915b505050505081565b806007546104c4919061104e565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b815260040161052092919061108f565b602060405180830381865afa15801561053b573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061055f91906110ca565b10156105a0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105979061113f565b60405180910390fd5b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846007546105ed919061104e565b6040518463ffffffff1660e01b815260040161060b9392919061115d565b6020604051808303815f875af1158015610627573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061064b91906111c7565b508060085f60015481526020019081526020015f205f8581526020019081526020015f20819055506001543373ffffffffffffffffffffffffffffffffffffffff167f7c89e371c48ba1f22e9ee1a6aaaeec2b62920293de1cc9d7ae05ac14dc1967a48585856040516106c0939291906111f2565b60405180910390a360015f8154809291906106da90611227565b91905055505f336001548585856040516020016106fb95949392919061126e565b60405160208183030381529060405290505f60035f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639c42bd1861526961077760045f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610a49565b856040518463ffffffff1660e01b815260040161079693929190611311565b602060405180830381865afa1580156107b1573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906107d591906110ca565b905060035f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663fa31de018261526961084260045f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610a49565b866040518563ffffffff1660e01b815260040161086193929190611311565b60206040518083038185885af115801561087d573d5f803e3d5ffd5b50505050506040513d601f19601f820116820180604052508101906108a29190611361565b505050505050565b60045f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b8060045f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60035f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61093f610a6a565b6109485f610af1565b565b5f805f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b5f82826040516109829291906113c8565b6040518091039020905092915050565b61526981565b60065481565b6009602052805f5260405f205f915090505481565b6109bb610a6a565b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610a2b575f6040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610a229190610ccc565b60405180910390fd5b610a3481610af1565b50565b610a3f610a6a565b8060068190555050565b5f8173ffffffffffffffffffffffffffffffffffffffff165f1b9050919050565b610a72610bb2565b73ffffffffffffffffffffffffffffffffffffffff16610a9061094a565b73ffffffffffffffffffffffffffffffffffffffff1614610aef57610ab3610bb2565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610ae69190610ccc565b60405180910390fd5b565b5f805f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050815f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f33905090565b5f819050919050565b610bcb81610bb9565b82525050565b5f602082019050610be45f830184610bc2565b92915050565b5f80fd5b5f80fd5b610bfb81610bb9565b8114610c05575f80fd5b50565b5f81359050610c1681610bf2565b92915050565b5f819050919050565b610c2e81610c1c565b8114610c38575f80fd5b50565b5f81359050610c4981610c25565b92915050565b5f8060408385031215610c6557610c64610bea565b5b5f610c7285828601610c08565b9250506020610c8385828601610c3b565b9150509250929050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610cb682610c8d565b9050919050565b610cc681610cac565b82525050565b5f602082019050610cdf5f830184610cbd565b92915050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f610d2782610ce5565b610d318185610cef565b9350610d41818560208601610cff565b610d4a81610d0d565b840191505092915050565b5f6020820190508181035f830152610d6d8184610d1d565b905092915050565b5f805f60608486031215610d8c57610d8b610bea565b5b5f610d9986828701610c3b565b9350506020610daa86828701610c3b565b9250506040610dbb86828701610c08565b9150509250925092565b610dce81610cac565b8114610dd8575f80fd5b50565b5f81359050610de981610dc5565b92915050565b5f60208284031215610e0457610e03610bea565b5b5f610e1184828501610ddb565b91505092915050565b5f819050919050565b5f610e3d610e38610e3384610c8d565b610e1a565b610c8d565b9050919050565b5f610e4e82610e23565b9050919050565b5f610e5f82610e44565b9050919050565b610e6f81610e55565b82525050565b5f602082019050610e885f830184610e66565b92915050565b5f80fd5b5f80fd5b5f80fd5b5f8083601f840112610eaf57610eae610e8e565b5b8235905067ffffffffffffffff811115610ecc57610ecb610e92565b5b602083019150836001820283011115610ee857610ee7610e96565b5b9250929050565b5f8060208385031215610f0557610f04610bea565b5b5f83013567ffffffffffffffff811115610f2257610f21610bee565b5b610f2e85828601610e9a565b92509250509250929050565b610f4381610c1c565b82525050565b5f602082019050610f5c5f830184610f3a565b92915050565b5f63ffffffff82169050919050565b610f7a81610f62565b82525050565b5f602082019050610f935f830184610f71565b92915050565b5f60208284031215610fae57610fad610bea565b5b5f610fbb84828501610c08565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061100857607f821691505b60208210810361101b5761101a610fc4565b5b50919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61105882610bb9565b915061106383610bb9565b925082820261107181610bb9565b9150828204841483151761108857611087611021565b5b5092915050565b5f6040820190506110a25f830185610cbd565b6110af6020830184610cbd565b9392505050565b5f815190506110c481610bf2565b92915050565b5f602082840312156110df576110de610bea565b5b5f6110ec848285016110b6565b91505092915050565b7f496e73756666696369656e7420616c6c6f77616e6365000000000000000000005f82015250565b5f611129601683610cef565b9150611134826110f5565b602082019050919050565b5f6020820190508181035f8301526111568161111d565b9050919050565b5f6060820190506111705f830186610cbd565b61117d6020830185610cbd565b61118a6040830184610bc2565b949350505050565b5f8115159050919050565b6111a681611192565b81146111b0575f80fd5b50565b5f815190506111c18161119d565b92915050565b5f602082840312156111dc576111db610bea565b5b5f6111e9848285016111b3565b91505092915050565b5f6060820190506112055f830186610f3a565b6112126020830185610f3a565b61121f6040830184610bc2565b949350505050565b5f61123182610bb9565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361126357611262611021565b5b600182019050919050565b5f60a0820190506112815f830188610cbd565b61128e6020830187610bc2565b61129b6040830186610f3a565b6112a86060830185610f3a565b6112b56080830184610bc2565b9695505050505050565b5f81519050919050565b5f82825260208201905092915050565b5f6112e3826112bf565b6112ed81856112c9565b93506112fd818560208601610cff565b61130681610d0d565b840191505092915050565b5f6060820190506113245f830186610f71565b6113316020830185610f3a565b818103604083015261134381846112d9565b9050949350505050565b5f8151905061135b81610c25565b92915050565b5f6020828403121561137657611375610bea565b5b5f6113838482850161134d565b91505092915050565b5f81905092915050565b828183375f83830152505050565b5f6113af838561138c565b93506113bc838584611396565b82840190509392505050565b5f6113d48284866113a4565b9150819050939250505056fea2646970667358221220ff7bb9ad30816b1a2f30e5cd1b523c0924753b7e3bde07d2852a676ea2f7272164736f6c634300081a0033"