pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Echo.sol";

contract TestEcho {
    Echo echo = Echo(DeployedAddresses.Echo());

    function testWeReceiveWhatWeSend() public {
        string memory testText = "HELLO";
        string memory returnedText = echo.echo(testText);
        Assert.equal(returnedText, testText, "Should receive the same");
//        Assert.notEqual(word_count, 0, "Should have receive more than one");
    }

    function testWeReceiveTheHistory() public {
        string memory testText = "HELLO";
        echo.echo(testText);
        string memory fullHistory = echo.fullHistory();
        Assert.equal(fullHistory, "||HELLO||HELLO", "Should receive something");
    }

    function testWeReceiveTheLastMessage() public {
        string memory testText = "THE SECOND";
        echo.echo(testText);
        string memory message = echo.lastMessage();
        Assert.equal(message, testText, "Should receive the last message");
    }

    function testWeReceiveTheMessageCount() public {
        uint msgCount = echo.messageCount();
        Assert.notEqual(msgCount, 0, "Should be more than 0");
    }
}
