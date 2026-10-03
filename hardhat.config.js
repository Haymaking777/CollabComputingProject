require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.XX", // keep whatever you already use
  networks: {
    localhost: { url: "http://127.0.0.1:8545" },
  },
};
