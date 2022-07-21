var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Docs = artifacts.require("./Docs.sol");
var Accounts = artifacts.require("./Accounts.sol");
var Docs2 = artifacts.require("./Docs2.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(Docs);
  deployer.deploy(Accounts);
  deployer.deploy(Docs2);
};
