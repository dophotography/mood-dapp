const myDapp = artifacts.require('dApp');

module.exports = (deployer) => {
    deployer.deploy(myDapp);
}