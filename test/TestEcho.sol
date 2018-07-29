pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Echo.sol";

contract TestAdoption {
    Echo echo = Echo(DeployedAddresses.Echo());

    function testWeReceiveWhatWeSend() public {
        string memory testText = "HELLO";
        string memory returnedText = echo.echo(testText);
        Assert.equal(returnedText, testText, "Should receive the same");
    }
}
