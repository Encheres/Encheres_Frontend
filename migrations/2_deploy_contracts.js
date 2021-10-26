const Account = artifacts.require('Account');
const NftAsset = artifacts.require('NftAsset');

module.exports = function(deployer) {
  deployer.deploy(Account);
};

module.exports = function(deployer) {
  deployer.deploy(NftAsset);
}