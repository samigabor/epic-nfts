// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./libraries/Base64.sol";

contract SvgUriGenerator {
    string private svgStartingTag =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";
    string private svgEndingTag = "</text></svg>";

    /**
     * @param _data the NFT name - visible on NFT/OpenSea as the image content
     * @param _description the NFT description - visible on OpenSea under the description section
     */
    function generateSvgUri(string memory _data, string memory _description)
        internal
        view
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    generateBase64EncodedJson(_data, _description)
                )
            );
    }

    /**
     * @dev the generated json(NFT metadata) has the following structure:
     * '{
     *   "name": "_data",
     *   "description": "_description",
     *   "image": "data:image/svg+xml;base64,<Base64 encoded SVG and contains the _data data>"
     *  }'
     * @param _data the NFT name - visible on NFT/OpenSea as the image content
     * @param _description the NFT description - visible on OpenSea under the description section
     */
    function generateBase64EncodedJson(
        string memory _data,
        string memory _description
    ) private view returns (string memory) {
        return
            Base64.encode(
                bytes(
                    string(
                        abi.encodePacked(
                            '{"name": "',
                            _data,
                            '", "description": "',
                            _description,
                            '", "image": "data:image/svg+xml;base64,',
                            Base64.encode(bytes(generateSvg(_data))),
                            '"}'
                        )
                    )
                )
            );
    }

    /**
     * @param _data the text displayed on the SVG - visible on NFT/OpenSea as the image content
     */
    function generateSvg(string memory _data)
        private
        view
        returns (string memory)
    {
        return string(abi.encodePacked(svgStartingTag, _data, svgEndingTag));
    }
}
