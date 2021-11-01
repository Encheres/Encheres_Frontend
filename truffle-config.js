
module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*",       // Any network
    },
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.9",    // (default: truffle's version)
      settings: {
       optimizer: {
         enabled: true,
         runs: 200
       },
      }
    }
  },
};
