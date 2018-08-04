const Echo = artifacts.require("Echo");
const Sum = artifacts.require("Sum");

contract('Echo', async (accounts) => {
    const from = accounts[0];
    console.log("ECHO", Echo);
    console.log("ECHO", Echo.deployed);
    console.log("ECHO", Echo.new);
    console.log("ECHO", Echo);
    console.log("ACCOUNTS", from);

    it("should return the same that i sent", async () => {
        const instance = await artifacts.require("Echo.sol").new();
        const textMessage = "TEST";
        const text = await instance.echo.call(textMessage, {from});
        assert.equal(text, textMessage, "echoes");
    });

    it("should return full history", async () => {
        const instance = await Echo.deployed();
        await instance.echo("TEST", {from});
        await instance.echo("TEST", {from});
        await instance.echo("TEST", {from});
        const history = await instance.fullHistory.call({from});
        console.log("FULL_HISTORY", history);
    });

    it("should return last message", async () => {
        const instance = await Echo.deployed();
        await instance.echo.call(web3.fromAscii("TEST"), {from});
        await instance.echo.call("TEST", {from});
        await instance.echo.call("TEST", {from});
        const last = await instance.lastMessage.call({from});
        console.log("LAST", last);
    });

    it("should return sum of two numbers", async () => {
        const instance = await Sum.deployed();
        const a = await instance.sum.call(1, 2, {from});
        console.log("SUM", a);
        const b = await instance.sum.call(2, 3, {from});
        console.log("SUM", b);
    });

    // it("should return last message", async () => {
    //     const instance = await Echo.deployed();
    //     const someOtherMessague = "TEST9999";
    //     await instance.echo.call(someOtherMessague, {from});
    //     const lastMessague = "TEST";
    //     await instance.echo.call(lastMessague, {from});
    //     const text = await instance.lastMessage.call();
    //     const history = await instance.fullHistory.call();
    //     console.log("FULL_HISTORY2", history);
    //     assert.equal(text, lastMessague, "Should be last sent message");
    // });
    //
    // it("should return message number", async () => {
    //     const instance = await Echo.deployed();
    //     const someOtherMessague = "TEST9999";
    //     await instance.echo.call(someOtherMessague);
    //     await instance.echo.call(someOtherMessague);
    //     await instance.echo.call(someOtherMessague);
    //     await instance.echo.call(someOtherMessague);
    //     const count = await instance.messageCount.call();
    //     const history = await instance.fullHistory.call();
    //     console.log("FULL_HISTORY3", history);
    //     assert.notEqual(count, 0, "more than one message");
    // });


});