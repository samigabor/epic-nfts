import { toast } from "react-toastify";
import { ethers } from "ethers";
import "./MintNFT.css";
import { CONTRACT_ADDRESS, METAMASK } from "../shared/constants";
import { getBlockExpolorerBaseLink } from "../shared/helpers";
import renderCustomNotification from "../shared/notifications";
import epicNFT from "../utils/EpicNFT.json";

function MintNFT({ signer, name, description }) {
  const mintNFT = async () => {
    if (!name || !description) {
      toast.warning("Name and description are required!");
      return;
    }

    const contract = new ethers.Contract(CONTRACT_ADDRESS, epicNFT.abi, signer);

    toast.info(METAMASK.CONFIRM_TRANSACTION, { autoClose: 1000 });

    const tx = await contract.mintCustomNFT(name, description);

    const blockExpolorer = `${getBlockExpolorerBaseLink()}/${tx.hash}`;
    renderCustomNotification(
      "info",
      METAMASK.PENDING_TRANSACTION,
      blockExpolorer
    );

    await tx.wait();

    renderCustomNotification(
      "success",
      METAMASK.CONFIRMED_TRANSACTION,
      blockExpolorer
    );
  };

  return (
    <button className="cta-button mint-button" onClick={mintNFT}>
      Mint NFT
    </button>
  );
}

export default MintNFT;
