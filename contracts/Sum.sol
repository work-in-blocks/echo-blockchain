pragma solidity ^0.4.24;

contract Sum{
    constructor() public {
    }

    function sum(uint first, uint second) public returns (uint) {
        return (first + second);
    }
}