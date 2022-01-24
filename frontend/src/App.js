import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NetworkNotSupported from "./components/NetworkNotSupported";
import Footer from "./components/Footer";
import NFTsOnChainRandomlyGenerated from "./components/NFTsOnChainRandomlyGenerated";
import { setupEventListener, checkIfWalletIsConnected } from "./shared/web3";

function App() {
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState(null);
  const [maxSupply, setMaxSupply] = useState(0);
  const [mintedCount, setMintedCount] = useState(0);
  const [isRinkeby, setIsRinkeby] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected({ setIsRinkeby, setAccount });
    setupEventListener({ setSigner, setMintedCount, setMaxSupply });
  }, []);

  return (
    <div className="App">
      <div className="container">
        {isRinkeby ? (
          <NFTsOnChainRandomlyGenerated
            account={account}
            setAccount={setAccount}
            signer={signer}
            mintedCount={mintedCount}
            maxSupply={maxSupply}
          />
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
