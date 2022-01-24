const CONTRACT_ADDRESS = "0xf5B02FeeE91D85Ab9945598A2DBAb7783E5D487C";

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
  BASE_LINK: `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}`,
  COLLECTION_LINK: "https://testnets.opensea.io/collection/epic-ig9chy9fzd",
  MINT_NOTIFICATION: `Hey there! We've minted your NFT and sent it to your wallet. It
    may be blank right now. It can take a max of 10 min to show up on
    OpenSea. Here's the link:`,
};

const RINKEBY = {
  BASE_LINK: "https://rinkeby.etherscan.io/tx",
};

const TWITTER = {
  HANDLE: "sami_gabor",
  LINK: "https://twitter.com/sami_gabor",
};

export { CONTRACT_ADDRESS, METAMASK, OPENSEA, RINKEBY, TWITTER };
