// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VINTOKEN is ERC20, ERC20Burnable, Ownable {

    constructor() ERC20("VINTOKEN", "VINN") {
        _mint(0xBa01056994957E67720770CFAad16d21EbF3e2c8, 100000000000000 * 10 ** 6);
    }
}