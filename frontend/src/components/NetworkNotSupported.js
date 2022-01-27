import { getConnectedNetworkName } from "../shared/helpers";

function NetworkNotSupported() {
  return (
    <p className="sub-text">
      Network not supported. Please connect to {getConnectedNetworkName()} and
      refresh the page!
    </p>
  );
}

export default NetworkNotSupported;
