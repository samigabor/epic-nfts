import { toast } from "react-toastify";
import { ethers } from "ethers";
import "./MintNFT.css";
import epicNFT from "../utils/EpicNFT.json";
import renderCustomNotification from "../shared/notifications";
import { CONTRACT_ADDRESS, METAMASK, MATIC } from "../shared/constants";

function MintNFT({ signer, customData }) {
  const mintNFT = async () => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, epicNFT.abi, signer);

    toast.info(METAMASK.CONFIRM_TRANSACTION, { autoClose: 1000 });

    const tx = await contract.mintCustomNFT(customData);

    // TODO: get network currently deployed network
    const maticLink = `${MATIC.BASE_LINK}/${tx.hash}`;
    renderCustomNotification("info", METAMASK.PENDING_TRANSACTION, maticLink);

    await tx.wait();

    renderCustomNotification(
      "success",
      METAMASK.CONFIRMED_TRANSACTION,
      maticLink
    );
  };

  return (
    <button className="cta-button mint-button" onClick={mintNFT}>
      Mint NFT
    </button>
  );
}

export default MintNFT;
