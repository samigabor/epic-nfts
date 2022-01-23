import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import epicNFT from "./utils/EpicNFT.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EPIC_NFT_CONTRACT_ADDRESS = "0xf5B02FeeE91D85Ab9945598A2DBAb7783E5D487C";
const TWITTER_HANDLE = "sami_gabor";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "https://testnets.opensea.io/collection/epic-ig9chy9fzd";

function App() {
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState(null);
  const [maxSupply, setMaxSupply] = useState(0);
  const [mintedCount, setMintedCount] = useState(0);
  const [isRinkeby, setIsRinkeby] = useState(false);

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderMintNFTContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={mintNFT}>
      Mint NFT
    </button>
  );

  const renderNetworkNotSupported = () => (
    <p className="sub-text">
      You are not connected to the Rinkeby Test Network!
    </p>
  );

  const renderCustomNotification = (
    type,
    description,
    link,
    autoClose = true
  ) =>
    toast[type](
      <>
        <p>{description}</p>
        <a
          style={{
            color: "darkgreen",
            textDecoration: "none",
          }}
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {link}
        </a>
      </>,
      { autoClose, position: "top-center" }
    );

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      toast.error("Unable to connect. Make sure MetaMask is installed!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    let chainId = await ethereum.request({ method: "eth_chainId" });

    const rinkebyChainId = "0x4";
    if (chainId === rinkebyChainId) {
      setIsRinkeby(true);
    }

    if (accounts.length) {
      setAccount(accounts[0]);
    }
  };

  const setupEventListener = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        toast.error("Make sure MetaMask is installed!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const newSigner = provider.getSigner();
      setSigner(newSigner);

      const contract = new ethers.Contract(
        EPIC_NFT_CONTRACT_ADDRESS,
        epicNFT.abi,
        newSigner
      );

      const countBigNumber = await contract.getMintedCount();
      const count = ethers.utils.formatUnits(countBigNumber, 0);
      setMintedCount(count);

      const supplyBigNumber = await contract.MAX_SUPPLY();
      const supply = ethers.utils.formatUnits(supplyBigNumber, 0);
      setMaxSupply(supply);

      contract.on("NewEpicNFTMinted", (from, tokenId) => {
        const openseaLink = `https://testnets.opensea.io/assets/${EPIC_NFT_CONTRACT_ADDRESS}/${tokenId.toNumber()}`;
        const opeanseaDesc = `Hey there! We've minted your NFT and sent it to your wallet. It
          may be blank right now. It can take a max of 10 min to show up on
          OpenSea. Here's the link:`;
        renderCustomNotification("success", opeanseaDesc, openseaLink, false);
      });
    } catch (error) {
      toast.error("Unable to access MetaMask. Please login!");
      console.error("Unable to setup event listener:", error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        toast.error("Get MetaMask!");
        return;
      }
      const connectedAccounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(connectedAccounts[0]);
    } catch (error) {
      toast.error("Unable co connect to MetaMask.");
      console.error("Unable co connect MetaMask: ", error);
    }
  };

  const mintNFT = async () => {
    const contract = new ethers.Contract(
      EPIC_NFT_CONTRACT_ADDRESS,
      epicNFT.abi,
      signer
    );

    toast.info("Confirm MetaMask transaction!", { autoClose: 1000 });
    const tx = await contract.makeAnEpicNFT();

    const rinkebyLink = `https://rinkeby.etherscan.io/tx/${tx.hash}`;
    const descriptionPending = "Mining. Here's the pending transaction:";
    renderCustomNotification("info", descriptionPending, rinkebyLink);

    await tx.wait();

    const descriptionConfirmed = "Mined. Here's the confirmed transaction:";
    renderCustomNotification("success", descriptionConfirmed, rinkebyLink);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    setupEventListener();
  }, []);

  return (
    <div className="App">
      <div className="container">
        {isRinkeby ? (
          <div className="header-container">
            <p className="header gradient-text">Epic NFT Collection</p>
            <p className="sub-text">
              Each unique. Each beautiful. Discover your NFT today.
            </p>
            <p className="footer-text">
              Minted {mintedCount} out of {maxSupply}. View collection on{" "}
              <a
                className="footer-text"
                href={OPENSEA_LINK}
                target="_blank"
                rel="noreferrer"
              >
                OpeanSea
              </a>
              .
            </p>
            <br />
            {account === ""
              ? renderNotConnectedContainer()
              : renderMintNFTContainer()}
          </div>
        ) : (
          renderNetworkNotSupported()
        )}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
      <ToastContainer
        style={{ width: "fit-content" }}
        theme="colored"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

export default App;
