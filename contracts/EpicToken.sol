// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EpicToken is ERC20 {
    /// @dev on contract creation, mint 1000 tokens and assign them to the contract deployer
    constructor() ERC20("Epic20Token", "Epic20") {
        _mint(msg.sender, 1000 * 10**18);
    }
}
