pragma solidity ^0.4.24;

import "./Serialize.sol";

contract Echo is Serialize{
    address public owner;
    string[] private history;
    uint private wordcount;

    modifier onlyOwner() {
        if (msg.sender == owner) _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function echo(string text) onlyOwner public returns (string) {
        history[wordcount++] = text;
        return text;
    }

    function fullHistory() public view returns (bytes){
        return stringArrayToBytes(history);
    }

}