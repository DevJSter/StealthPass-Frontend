

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

export const eduNetwork = {
  id: 656476,
  network: "edu-chain-testnet",
  name: "EDU Chain Testnet",
  nativeCurrency: {
    name: "EDU Chain Testnet",
    symbol: "EDU",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_EDUCHAIN_RPC_URL],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_EDUCHAIN_RPC_URL],
    },
  },
  blockExplorers: {
    default: {
      name: "EDUChain Explorer",
      url: "https://edu-chain-testnet.blockscout.com",
    },
  },
  testnet: true,
};

export const networks = {
  inco: incoNetwork,
  educhain: eduNetwork,
};