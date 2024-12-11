export const incoNetwork = {
  id: 21097,
  network: "Rivest",
  name: "Rivest Testnet",
  nativeCurrency: {
    name: "INCO",
    symbol: "INCO",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://validator.rivest.inco.org"],
    },
    public: {
      http: ["https://validator.rivest.inco.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.rivest.inco.org",
    },
  },
};

export const mantleNetwork = {
  id: 5003,
  network: "mantle-sepolia",
  name: "Mantle Sepolia Testnet",
  nativeCurrency: {
    name: "Mantle",
    symbol: "MNT",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia.mantle.xyz"],
    },
    public: {
      http: ["https://rpc.sepolia.mantle.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.sepolia.mantle.xyz",
    },
  },
  testnet: true,
};

export const networks = {
  inco: incoNetwork,
  mantleNetwork: mantleNetwork,
};
