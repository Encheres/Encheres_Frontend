const NftAsset = artifacts.require('NftAsset');

module.exports = function(deployer) {
  deployer.deploy(NftAsset);
}