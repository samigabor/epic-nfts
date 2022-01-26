// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./SvgUriGenerator.sol";
import "./RandomWordGenerator.sol";

contract EpicNFT is
    ERC721,
    ERC721URIStorage,
    RandomWordGenerator,
    SvgUriGenerator
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public constant MAX_SUPPLY = 10000;

    event NewEpicNFTMinted(address sender, uint256 tokenId);

    constructor() ERC721("EpicTimes", "EPIC") {}

    function makeAnEpicNFT() public {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId < MAX_SUPPLY, "All NFTs have been minted");
        _tokenIdCounter.increment();

        _safeMint(msg.sender, tokenId);

        string memory nftName = generateCombinedRandomWord(tokenId);
        string memory nftDescription = "An epic collection of cool names";
        string memory finalTokenUri = generateSvgUri(nftName, nftDescription);

        _setTokenURI(tokenId, finalTokenUri);

        emit NewEpicNFTMinted(msg.sender, tokenId);
    }

    function mintCustomNFT(string memory _name, string memory _description)
        public
    {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(msg.sender, tokenId);

        string memory finalTokenUri = generateSvgUri(_name, _description);

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
