require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider'); 
const localProvider = () => new HDWalletProvider(process.env.MNEMONIC, `https://goerli.infura.io/v3/${process.env.INFURA_HTTP_URL}`);

module.exports = {

  networks: {
    goerli: {
      provider: localProvider,
      network_id: 5,
      gas: 5500000,        
      confirmations: 2,    
      timeoutBlocks: 200,
      skipDryRun: true,
      networkCheckTimeout: 10000,
    },
    
  },

  plugins: ['truffle-plugin-verify'],
  
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
  },

  mocha: {},

  compilers: {
    solc: {
      version: "0.8.17" // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

};
