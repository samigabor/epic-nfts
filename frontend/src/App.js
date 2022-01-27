import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import Header from "./components/Header";
import NetworkNotSupported from "./components/NetworkNotSupported";
import NFTsOnChain from "./components/NFTsOnChain";
import Footer from "./components/Footer";
import { setupEventListener, checkIfWalletIsConnected } from "./shared/web3";

const tabs = {
  onChain: "On-Chain",
  offChain: "Off-Chain",
};

function App() {
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState(null);
  const [maxSupply, setMaxSupply] = useState(0);
  const [mintedCount, setMintedCount] = useState(0);
  const [isChainSupported, setIsChainSupported] = useState(false);
  const [activeTabs, setActiveTabs] = useState(tabs.onChain);
  const [customData, setCustomData] = useState("");

  useEffect(() => {
    Object.freeze(tabs); // makes the object act as an enum - no new elements can be added to the object
    checkIfWalletIsConnected({ setIsChainSupported, setAccount });
    setupEventListener({ setSigner, setMintedCount, setMaxSupply });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Header
          tabs={tabs}
          activeTabs={activeTabs}
          setActiveTabs={setActiveTabs}
        />
        {isChainSupported ? (
          <div>
            {activeTabs === tabs.onChain ? (
              account !== "" ? (
                <NFTsOnChain
                  mintedCount={mintedCount}
                  maxSupply={maxSupply}
                  setCustomData={setCustomData}
                  signer={signer}
                  customData={customData}
                />
              ) : (
                <div className="metamask-button">
                  <ConnectWallet setAccount={setAccount} />
                </div>
              )
            ) : (
              <h2 style={{ color: "white" }}>Comming soon!</h2>
            )}
          </div>
        ) : (
          <NetworkNotSupported />
        )}
        <Footer />
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
