import "./ConnectWallet.css";
import { connectWallet } from "../shared/web3.js";

function ConnectWallet({ setAccount }) {
  return (
    <button
      className="cta-button connect-wallet-button"
      onClick={() => connectWallet(setAccount)}
    >
      Connect to Wallet
    </button>
  );
}

export default ConnectWallet;
