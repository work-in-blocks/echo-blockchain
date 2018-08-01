const Echo = artifacts.require("Echo");

module.exports = function (deployer) {
    deployer.deploy(Echo);
};