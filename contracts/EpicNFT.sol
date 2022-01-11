// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract EpicNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Epic", "EPC") {
        console.log("This is the Epic NFT contract!");
    }

    function makeAnEpicNFT() public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        console.log("make nft %s", tokenId);
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, "https://jsonkeeper.com/b/HM46");
        console.log(
            "An NFT with id %s was minted on address %s",
            tokenId,
            msg.sender
        );
        console.log("finished nft %s", tokenId);
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
