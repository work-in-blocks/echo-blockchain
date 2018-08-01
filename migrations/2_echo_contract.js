const Echo = artifacts.require("./Echo.sol");

module.exports = function(deployer) {
  deployer.deploy(Echo);
};
