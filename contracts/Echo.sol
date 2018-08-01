pragma solidity ^0.4.24;

import "./strings.sol";

contract Echo{
    address public owner;
    string[] private history;
    using strings for *;
    string public s;
    string public lastMessage;
    uint public messageCount;

    modifier onlyOwner() {
        if (msg.sender == owner) _;
    }

    constructor() public {
        owner = msg.sender;
        lastMessage = "None yet";
    }

    function echo(string text) public returns (string) {
        history.push(text);
        lastMessage = text;
        messageCount++;
        return text;
    }

    function fullHistory() public view returns (string){
        string memory _history = "";
        for (uint i = 0; i < history.length; i++){
            _history = _history.toSlice().concat("||".toSlice()).toSlice().concat(history[i].toSlice());
        }
        return _history;
    }

}