import "./NFTsOnChain.css";
import MintNFT from "./MintNFT";
import { OPENSEA } from "../shared/constants";

function NFTsOnChain({
  signer,
  mintedCount,
  maxSupply,
  name,
  setName,
  description,
  setDescription,
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
          <label htmlFor="name">Name</label>
          <textarea
            id="name"
            className="custom-data"
            placeholder="Add name for your NFT. It will be the main, centered text displayed on OpenSea. Ideally it should have less than 35 characters."
            rows="3"
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="custom-data"
            placeholder="Add description for your NFT. It will be displayed under the 'Description' section on OpenSea."
            rows="5"
            onChange={(event) => setDescription(event.target.value)}
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
        <MintNFT signer={signer} name={name} description={description} />
      </div>
    </div>
  );
}

export default NFTsOnChain;
