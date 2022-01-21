import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import epicNFT from "./utils/EpicNFT.json";

const EPIC_NFT_CONTRACT_ADDRESS = "0x31FDeef601a85a5b66f800EB41d865452aD9061C";
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
// const OPENSEA_LINK = "";
// const TOTAL_MINT_COUNT = 50;

function App() {
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState(null);
  const [maxSupply, setMaxSupply] = useState(0);
  const [mintedCount, setMintedCount] = useState(0);

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

    if (accounts.length) {
      setAccount(accounts[0]);
    }
  };

  const setupEventListener = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask installed.");
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
        alert(
          `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${EPIC_NFT_CONTRACT_ADDRESS}/${tokenId.toNumber()}`
        );
      });
    } catch (error) {
      console.error("Unable to setup event listener:", error);
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

      setAccount(connectedAccounts[0]);
    } catch (error) {
      console.error("Unable co connect MetaMask: ", error);
    }
  };

  const mintNFT = async () => {
    const contract = new ethers.Contract(
      EPIC_NFT_CONTRACT_ADDRESS,
      epicNFT.abi,
      signer
    );

    console.log("Going to pop wallet now to pay gas...");
    const tx = await contract.makeAnEpicNFT();

    console.log("Mining...please wait.");
    await tx.wait();

    console.log(
      `Mined, see transaction: https://rinkeby.etherscan.io/tx/${tx.hash}`
    );
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    setupEventListener();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Epic NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          <p className="footer-text">
            Minted {mintedCount} out of {maxSupply}.
          </p>
          <br />
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
