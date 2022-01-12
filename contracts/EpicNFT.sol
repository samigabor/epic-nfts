// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract EpicNFT is ERC721, ERC721URIStorage, Ownable {
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

    constructor() ERC721("Epic", "EPC") {}

    function makeAnEpicNFT() public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);

        string memory first = pickRandomFirstWord(tokenId);
        string memory second = pickRandomSecondWord(tokenId);
        string memory third = pickRandomThirdWord(tokenId);
        string memory finalSVG = string(
            abi.encodePacked(svgStartingTag, first, second, third, svgEndingTag)
        );

        console.log("------------------------\n");
        console.log(finalSVG);
        console.log("------------------------\n");

        _setTokenURI(
            tokenId,
            "data:application/json;base64,ewogICAgIm5hbWUiOiAiVWxyYVNvdW5kTW9uZXkiLAogICAgImRlc2NyaXB0aW9uIjogIlRoZSBtb3N0IHNvdW5kIG1vbmV5IG91dCB0aGVyZSIsCiAgICAiaW1hZ2UiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhCeVpYTmxjblpsUVhOd1pXTjBVbUYwYVc4OUluaE5hVzVaVFdsdUlHMWxaWFFpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNEtJQ0FnSUR4emRIbHNaVDR1WW1GelpTQjdJR1pwYkd3NklIZG9hWFJsT3lCbWIyNTBMV1poYldsc2VUb2djMlZ5YVdZN0lHWnZiblF0YzJsNlpUb2dNVFJ3ZURzZ2ZUd3ZjM1I1YkdVK0NpQWdJQ0E4Y21WamRDQjNhV1IwYUQwaU1UQXdKU0lnYUdWcFoyaDBQU0l4TURBbElpQm1hV3hzUFNKaWJHRmpheUlnTHo0S0lDQWdJRHgwWlhoMElIZzlJalV3SlNJZ2VUMGlOVEFsSWlCamJHRnpjejBpWW1GelpTSWdaRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlJbTFwWkdSc1pTSWdkR1Y0ZEMxaGJtTm9iM0k5SW0xcFpHUnNaU0krVld4MGNtRlRiM1Z1WkUxdmJtVjVQQzkwWlhoMFBnbzhMM04yWno0PSIKfQ=="
        );
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
    ) private pure returns (uint256) {
        string memory input = string(
            abi.encodePacked(_inputString, Strings.toString(_inputNumber))
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
