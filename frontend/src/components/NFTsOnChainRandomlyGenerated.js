import ConnectWallet from "./ConnectWallet";
import MintNFT from "./MintNFT";
import { OPENSEA } from "../shared/constants";

function NFTsOnChainRandomlyGenerated({
  account,
  setAccount,
  signer,
  mintedCount,
  maxSupply,
}) {
  return (
    <div className="header-container">
      <p className="header gradient-text">Epic NFT Collection</p>
      <p className="sub-text">
        Each unique. Each beautiful. Discover your NFT today.
      </p>
      <p className="footer-text">
        Minted {mintedCount} out of {maxSupply}. View collection on{" "}
        <a
          className="footer-text"
          href={OPENSEA.COLLECTION_LINK}
          target="_blank"
          rel="noreferrer"
        >
          OpeanSea
        </a>
        .
      </p>
      <br />
      {account === "" ? (
        <ConnectWallet setAccount={setAccount} />
      ) : (
        <MintNFT signer={signer} />
      )}
    </div>
  );
}

export default NFTsOnChainRandomlyGenerated;
