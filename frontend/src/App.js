import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import { useEffect, useState } from "react";

const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
// const OPENSEA_LINK = "";
// const TOTAL_MINT_COUNT = 50;

function App() {
  const [account, setAccount] = useState("");

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

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have MetaMask installed.");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log("eth_accounts: ", accounts);
    if (accounts.length) {
      setAccount(accounts[0]);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Get MetaMask!");
        return;
      }
      const connectedAccounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("eth_requestAccounts: ", connectedAccounts);
      setAccount(connectedAccounts[0]);
    } catch (error) {
      console.error("Unable co connect MetaMask: ", error);
    }
  };

  const mintNFT = () => {
    console.log("mint!");
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Epic NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {account === ""
            ? renderNotConnectedContainer()
            : renderMintNFTContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
}

export default App;
