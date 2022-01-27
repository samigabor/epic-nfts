import { toast } from "react-toastify";
import { ethers } from "ethers";
import "./MintNFT.css";
import epicNFT from "../utils/EpicNFT.json";
import renderCustomNotification from "../shared/notifications";
import { CONTRACT_ADDRESS, METAMASK, RINKEBY } from "../shared/constants";

function MintNFT({ signer, customData }) {
  const mintNFT = async () => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, epicNFT.abi, signer);

    toast.info(METAMASK.CONFIRM_TRANSACTION, { autoClose: 1000 });

    const rinkebyLink = `${RINKEBY.BASE_LINK}/${tx.hash}`;
    renderCustomNotification(
      "info",
      METAMASK.PENDING_TRANSACTION,
      `${RINKEBY.BASE_LINK}/${tx.hash}`
    );
    const tx = await contract.mintCustomNFT(customData);

    await tx.wait();

    renderCustomNotification(
      "success",
      METAMASK.CONFIRMED_TRANSACTION,
      rinkebyLink
    );
    window.location.reload();
  };

  return (
    <button className="cta-button mint-button" onClick={mintNFT}>
      Mint NFT
    </button>
  );
}

export default MintNFT;
