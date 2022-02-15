const Election = artifacts.require("Election");

module.exports = function(deployer) {
  deployer.deploy(Election, '0x0ed274DD2FF93580bA853675E14ace4376e5E4bB','MyElection', 'blabla');
};
