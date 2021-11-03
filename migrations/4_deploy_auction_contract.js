const Auctions = artifacts.require('Auctions');

module.exports = function(deployer) {
  deployer.deploy(Auctions);
}