import { CHAIN_SUPPORTED } from "../shared/constants";

function NetworkNotSupported() {
  const getNetworkName = () => {
    switch (CHAIN_SUPPORTED) {
      case "0x3":
        return "Ropsten Test Network";
      case "0x4":
        return "Rinkeby Test Network";
      case "0x5":
        return "Goerli Test Network";
      case "0x89":
        return "Matic Mainnet";
      default:
        return "the supported network";
    }
  };
  return (
    <p className="sub-text">
      Network not supported. Please connect to {getNetworkName()}!
    </p>
  );
}

export default NetworkNotSupported;
