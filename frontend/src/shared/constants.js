const CHAINS = {
  ROPSTEN_TEST_NETWORK: "0x3",
  RINKEBY_TEST_NETWORK: "0x4",
  GOERLI_TEST_NETWORK: "0x5",
  MATIC_MAINNET: "0x89",
};

const CHAIN_SUPPORTED = CHAINS.MATIC_MAINNET;

const CONTRACT_ADDRESS = "0x81e40D52E25224877dB546DdA9A1AE4293Ff1C0E";

const METAMASK = {
  CONFIRM_TRANSACTION: "Confirm MetaMask transaction!",
  PENDING_TRANSACTION: "Mining. Here's the pending transaction:",
  CONFIRMED_TRANSACTION: "Mined. Here's the confirmed transaction:",
  NOT_INSTALLED: "Make sure MetaMask is installed!",
  UNABLE_TO_ACCESS: "Unable to access MetaMask. Please login!",
  UNABLE_TO_CONNECT:
    "Unable to access your MetaMask accounts. Please connect to wallet!",
};

const OPENSEA = {
  BASE_LINK: `https://opensea.io/assets/${CONTRACT_ADDRESS}`,
  RINKEBY_COLLECTION:
    "https://testnets.opensea.io/collection/casual-thoughts-ideas-v2",
  MATIC_COLLECTION: "https://opensea.io/collection/casual-thoughts-ideas",
  MINT_NOTIFICATION: `Hey there! We've minted your NFT and sent it to your wallet. It
    may be blank right now. It can take a max of 10 min to show up on
    OpenSea. Here's the link:`,
};

const MATIC = {
  BASE_LINK: "https://polygonscan.com/tx",
};

const RINKEBY = {
  BASE_LINK: "https://rinkeby.etherscan.io/tx",
};

const TWITTER = {
  HANDLE: "sami_gabor",
  LINK: "https://twitter.com/sami_gabor",
};

export {
  CHAIN_SUPPORTED,
  CONTRACT_ADDRESS,
  MATIC,
  METAMASK,
  OPENSEA,
  RINKEBY,
  TWITTER,
};
