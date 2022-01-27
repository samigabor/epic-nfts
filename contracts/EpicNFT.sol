// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./SvgUriGenerator.sol";
import "hardhat/console.sol";

contract EpicNFT is ERC721, ERC721URIStorage, SvgUriGenerator {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public constant MAX_SUPPLY = 721;
    string private description;

    event NewEpicNFTMinted(address sender, uint256 tokenId);

    constructor() ERC721("RandomThoughts", "RT") {
        description = "Remember your thoughts and ideas by creating an unique NFT, personalized as you wish. Mark memorable events by minting your customized NFT on the Polygon network. Fully on-chain.";
    }

    function mintCustomNFT(string memory _data) public {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId < MAX_SUPPLY, "All NFTs have been minted");
        _tokenIdCounter.increment();

        _safeMint(msg.sender, tokenId);

        string memory finalTokenUri = generateSvgUri(_data, description);
        console.log("finalTokenUri", finalTokenUri);
        _setTokenURI(tokenId, finalTokenUri);

        emit NewEpicNFTMinted(msg.sender, tokenId);
    }

    function getMintedCount() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    ///@dev The following function is override required by Solidity.
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    ///@dev The following function is override required by Solidity.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
