import { toast } from "react-toastify";
import epicNFT from "../utils/EpicNFT.json";
import { ethers } from "ethers";
import renderCustomNotification from "./notifications";

import { CONTRACT_ADDRESS, METAMASK, OPENSEA } from "./constants";

const checkIfWalletIsConnected = async ({
  setIsChainSupported,
  setAccount,
}) => {
  const { ethereum } = window;
  if (!ethereum) {
    toast.error(METAMASK.UNABLE_TO_CONNECT);
    return;
  }

  const accounts = await ethereum.request({ method: "eth_accounts" });

  let chainId = await ethereum.request({ method: "eth_chainId" });

  // const supportedChain = "0x3"; // Ropsten Testnetc
  // const supportedChain = "0x4"; // Rinkeby Testnetc
  // const supportedChain = "0x5"; // Goerli Testnetc
  const supportedChain = "0x89"; // Matic Mainnet
  console.log(chainId);
  if (chainId === supportedChain) {
    setIsChainSupported(true);
  }

  if (accounts.length) {
    setAccount(accounts[0]);
  }
};

const connectWallet = async ({ setAccount }) => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      toast.error(METAMASK.NOT_INSTALLED);
      return;
    }
    const connectedAccounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(connectedAccounts[0]);
  } catch (error) {
    toast.error(METAMASK.UNABLE_TO_CONNECT);
    console.error(METAMASK.UNABLE_TO_CONNECT, error);
  }
};

const setupEventListener = async ({
  setSigner,
  setMintedCount,
  setMaxSupply,
}) => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      toast.error(METAMASK.NOT_INSTALLED);
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const newSigner = provider.getSigner();
    setSigner(newSigner);

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      epicNFT.abi,
      newSigner
    );

    const countBigNumber = await contract.getMintedCount();
    const count = ethers.utils.formatUnits(countBigNumber, 0);
    setMintedCount(count);

    const supplyBigNumber = await contract.MAX_SUPPLY();
    const supply = ethers.utils.formatUnits(supplyBigNumber, 0);
    setMaxSupply(supply);

    contract.on("NewEpicNFTMinted", (from, tokenId) =>
      renderCustomNotification(
        "success",
        OPENSEA.MINT_NOTIFICATION,
        `${OPENSEA.BASE_LINK}/${tokenId.toNumber()}`,
        false
      )
    );
  } catch (error) {
    toast.error(METAMASK.UNABLE_TO_CONNECT);
    console.error("Unable to setup event listener:", error);
  }
};

export { checkIfWalletIsConnected, connectWallet, setupEventListener };
