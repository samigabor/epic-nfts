// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./SvgUriGenerator.sol";

contract EpicNFT is ERC721, ERC721URIStorage, Ownable, SvgUriGenerator {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public constant MAX_SUPPLY = 721;

    uint256 public txFeeAmount;
    address public txFeeToken;

    event NewEpicNFTMinted(address sender, uint256 tokenId);

    constructor(address _royaltyToken, uint256 _royaltyAmount)
        ERC721("Random Thoughts", "RT")
    {
        txFeeToken = _royaltyToken; // e.g. DAI Rinkeby => 0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D
        txFeeAmount = _royaltyAmount;
    }

    function mintCustomNFT(string memory _data, string memory _description)
        public
    {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId < MAX_SUPPLY, "All NFTs have been minted");
        _tokenIdCounter.increment();

        _safeMint(msg.sender, tokenId);

        string memory finalTokenUri = generateSvgUri(_data, _description);

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

    /**
     * @dev This overrides the method transferFrom from inherited ERC721 contract
     * @dev Added royalty functionality
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );

        if (msg.sender != owner()) {
            _payTxFee(from);
        }

        _transfer(from, to, tokenId);
    }

    /**
     * @dev This overrides the method safeTransferFrom from inherited ERC721 contract
     * @dev Added royalty functionality
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        if (msg.sender != owner()) {
            _payTxFee(from);
        }
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev This overrides the method safeTransferFrom (with forth param) from inherited ERC721 contract
     * @dev Added royalty functionality
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        if (msg.sender != owner()) {
            _payTxFee(from);
        }
        _safeTransfer(from, to, tokenId, _data);
    }

    function _payTxFee(address from) internal {
        uint256 txFeeTokenBalace = ERC20(txFeeToken).balanceOf(msg.sender);
        require(
            txFeeTokenBalace >= txFeeAmount,
            "The sender does not have enough royalty tokens"
        );
        IERC20 token = IERC20(txFeeToken);
        token.transferFrom(from, owner(), txFeeAmount);
    }
}
