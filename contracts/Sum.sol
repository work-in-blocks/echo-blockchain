pragma solidity ^0.4.24;

contract Sum{
    constructor() public {
    }

    function sum(uint first, uint second) public view returns (uint) {
        return (first + second);
    }
}