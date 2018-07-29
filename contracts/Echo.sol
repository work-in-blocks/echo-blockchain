pragma solidity ^0.4.24;

//import "./Serialize.sol";
import "./strings.sol";

contract Echo{
    address public owner;
//    string[] private history;
    uint private word_count;
    using strings for *;
    string public s;

    modifier onlyOwner() {
        if (msg.sender == owner) _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function echo(string text) onlyOwner public returns (string, uint) {
//        history[wordcount++] = text;
        word_count = word_count + 1;
        string memory prefix = "From the Blockchain:";
        string memory response = prefix.toSlice().concat(text.toSlice());
        return (response, word_count);
    }
//
//    function fullHistory() public view returns (bytes){
//        return stringArrayToBytes(history);
//    }

}