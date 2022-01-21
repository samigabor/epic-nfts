// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./libraries/Base64.sol";

contract EpicNFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    string svgStartingTag =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";
    string svgEndingTag = "</text></svg>";

    string[] firstWords = [
        "Cats",
        "Dogs",
        "Horses",
        "Bulls",
        "Bears",
        "Chickens",
        "Rats",
        "Rabbits",
        "Snakes",
        "Whales"
    ];
    string[] secondWords = [
        "Like",
        "Love",
        "Hate",
        "Kill",
        "Eat",
        "Distroy",
        "Abandon",
        "Beat",
        "Punch",
        "Build"
    ];
    string[] thirdWords = [
        "Bitcoin",
        "Ethereum",
        "Polkadot",
        "Cardano",
        "Solana",
        "Terra",
        "Avalanche",
        "Elrond",
        "Polygon",
        "Fantom"
    ];

    uint256 public constant MAX_SUPPLY = 100;

    event NewEpicNFTMinted(address sender, uint256 tokenId);

    constructor() ERC721("Epic", "EPC") {}

    function makeAnEpicNFT() public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        require(tokenId < MAX_SUPPLY, "All NFTs have been minted");

        _safeMint(msg.sender, tokenId);

        string memory first = pickRandomFirstWord(tokenId);
        string memory second = pickRandomSecondWord(tokenId);
        string memory third = pickRandomThirdWord(tokenId);
        string memory combinedWord = string(
            abi.encodePacked(first, second, third)
        );

        string memory finalSVG = string(
            abi.encodePacked(svgStartingTag, combinedWord, svgEndingTag)
        );

        /**
         * json generated:
         * '{
         *   "name": "DinamicallyCombinedWord",
         *   "description": "An epic collection of cool names",
         *   "image": "data:image/svg+xml;base64,<hashedSVG>"
         *  }'
         */
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        combinedWord,
                        '", "description": "An epic collection of cool names", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSVG)),
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _setTokenURI(tokenId, finalTokenUri);

        emit NewEpicNFTMinted(msg.sender, tokenId);
    }

    function getMintedCount() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function pickRandomFirstWord(uint256 _tokenId)
        private
        view
        returns (string memory)
    {
        uint256 random = generateRandomNumber("FIRST_WORD", _tokenId);
        random = random % firstWords.length;
        return firstWords[random];
    }

    function pickRandomSecondWord(uint256 _tokenId)
        private
        view
        returns (string memory)
    {
        uint256 random = generateRandomNumber("SECOND_WORD", _tokenId);
        random = random % secondWords.length;
        return secondWords[random];
    }

    function pickRandomThirdWord(uint256 _tokenId)
        private
        view
        returns (string memory)
    {
        uint256 random = generateRandomNumber("THIRD_WORD", _tokenId);
        random = random % thirdWords.length;
        return thirdWords[random];
    }

    function generateRandomNumber(
        string memory _inputString,
        uint256 _inputNumber
    ) private view returns (uint256) {
        string memory input = string(
            abi.encodePacked(
                _inputString,
                Strings.toString(block.timestamp),
                Strings.toString(_inputNumber)
            )
        );
        return uint256(keccak256(abi.encodePacked(input)));
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
