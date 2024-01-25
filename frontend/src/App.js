import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import Header from "./components/Header";
import NetworkNotSupported from "./components/NetworkNotSupported";
import NFTsOnChain from "./components/NFTsOnChain";
import SignMessage from "./components/SignMessage";
import Footer from "./components/Footer";
import { setupEventListener, checkIfWalletIsConnected } from "./shared/web3";

const tabs = {
  onChain: "On-Chain",
  offChain: "Off-Chain",
  signMessage: "Sign Message",
};

function App() {
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState(null);
  const [maxSupply, setMaxSupply] = useState(0);
  const [mintedCount, setMintedCount] = useState(0);
  const [isChainSupported, setIsChainSupported] = useState(false);
  const [activeTabs, setActiveTabs] = useState(tabs.signMessage);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
        {
          <div>
            {activeTabs === tabs.onChain && isChainSupported && (
              account !== "" ? (
                <NFTsOnChain
                  signer={signer}
                  mintedCount={mintedCount}
                  maxSupply={maxSupply}
                  description={description}
                  setDescription={setDescription}
                  name={name}
                  setName={setName}
                />
              ) : (
                <div className="metamask-button">
                  <ConnectWallet setAccount={setAccount} />
                </div>
                )
            )}
            {activeTabs === tabs.onChain && !isChainSupported && (
              <NetworkNotSupported />
            )}
            {activeTabs === tabs.offChain && (
              <div style={{ color: "white" }}>
                Comming Soon...
              </div>
            )}
            {activeTabs === tabs.signMessage && (
              <SignMessage signer={signer} />
            )}
          </div>
        }
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
