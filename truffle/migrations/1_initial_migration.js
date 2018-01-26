var Migrations = artifacts.require("./Migrations.sol");
var TimeSlotVote = artifacts.require("TimeSlotVote");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(TimeSlotVote);
};
