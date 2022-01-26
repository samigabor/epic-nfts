// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./libraries/Base64.sol";

contract SvgUriGenerator {
    string private svgStartingTag =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";
    string private svgEndingTag = "</text></svg>";

    /**
     * @param _name the NFT name - visible on NFT/OpenSea as the image content
     * @param _description the NFT description - visible on OpenSea under the description section
     */
    function generateSvgUri(string memory _name, string memory _description)
        internal
        view
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    generateBase64EncodedJson(_name, _description)
                )
            );
    }

    /**
     * @dev the generated json(NFT metadata) has the following structure:
     * '{
     *   "name": "_name",
     *   "description": "_description",
     *   "image": "data:image/svg+xml;base64,<Base64 encoded SVG and contains the _name data>"
     *  }'
     * @param _name the NFT name - visible on NFT/OpenSea as the image content
     * @param _description the NFT description - visible on OpenSea under the description section
     */
    function generateBase64EncodedJson(
        string memory _name,
        string memory _description
    ) private view returns (string memory) {
        return
            Base64.encode(
                bytes(
                    string(
                        abi.encodePacked(
                            '{"name": "',
                            _name,
                            '", "description": "',
                            _description,
                            '", "image": "data:image/svg+xml;base64,',
                            Base64.encode(bytes(generateSvg(_name))),
                            '"}'
                        )
                    )
                )
            );
    }

    /**
     * @param _name the text displayed on the SVG - visible on NFT/OpenSea as the image content
     */
    function generateSvg(string memory _name)
        private
        view
        returns (string memory)
    {
        return string(abi.encodePacked(svgStartingTag, _name, svgEndingTag));
    }
}
