// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/utils/Strings.sol";

contract RandomWordGenerator {
    string[] private firstWords = [
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
    string[] private secondWords = [
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
    string[] private thirdWords = [
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

    function generateCombinedRandomWord(uint256 _tokenId)
        internal
        view
        returns (string memory)
    {
        string memory first = pickRandomFirstWord(_tokenId);
        string memory second = pickRandomSecondWord(_tokenId);
        string memory third = pickRandomThirdWord(_tokenId);
        return string(abi.encodePacked(first, second, third));
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
}
