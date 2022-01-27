import "./NFTsOnChain.css";
import MintNFT from "./MintNFT";
import { OPENSEA } from "../shared/constants";

function NFTsOnChain({
  signer,
  mintedCount,
  maxSupply,
  customData,
  setCustomData,
}) {
  return (
    <div>
      <p className="header gradient-text">Generate your own NFT</p>
      <div className="sub-text-container">
        <div className="sub-text">
          <p className="sub-text-margin">
            Create your own, unique and everlasting memory!
          </p>
          <p className="sub-text-margin">
            Come up with something memorable and write down any details you
            might want.
          </p>
          <p className="sub-text-margin">And… DONE! View your NFT online!</p>
        </div>
      </div>

      <div className="nft-form-container">
        <div className="nft-form">
          <label htmlFor="customData"></label>
          <textarea
            id="customData"
            className="custom-data"
            placeholder="Add the content for your NFT"
            rows="5"
            onChange={(event) => setCustomData(event.target.value)}
          />
        </div>
      </div>

      <p className="footer-text">
        Minted {mintedCount} out of {maxSupply}. Curious what others have
        created? View collection on{" "}
        <a
          className="footer-text"
          href={OPENSEA.MATIC_COLLECTION}
          target="_blank"
          rel="noreferrer"
        >
          OpeanSea
        </a>
        .
      </p>

      <div className="metamask-button">
        <MintNFT signer={signer} customData={customData} />
      </div>
    </div>
  );
}

export default NFTsOnChain;
