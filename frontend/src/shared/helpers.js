import { CHAIN_SUPPORTED } from "./constants";

const getBlockExpolorerBaseLink = () => {
  switch (CHAIN_SUPPORTED) {
    case "0x3":
      return "https://ropsten.etherscan.io/tx";
    case "0x4":
      return "https://rinkeby.etherscan.io/tx";
    case "0x5":
      return "https://goerli.etherscan.io/tx";
    case "0x89":
      return "https://polygonscan.com/tx";
    default:
      return "https://etherscan.io/tx";
  }
};

const getConnectedNetworkName = () => {
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

export { getBlockExpolorerBaseLink, getConnectedNetworkName };
