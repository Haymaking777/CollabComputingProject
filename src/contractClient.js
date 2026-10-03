

const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");

const DEFAULT_HARDHAT_MNEMONIC =
  "test test test test test test test test test test test junk";

function loadContractInfo() {
  const infoPath = path.join(__dirname, "..", "config", "contractInfo.json");
  return JSON.parse(fs.readFileSync(infoPath, "utf8"));
}

function loadAbi(abiJsonPath) {
  const p = path.join(__dirname, "..", abiJsonPath);
  const artifact = JSON.parse(fs.readFileSync(p, "utf8"));
  return artifact.abi;
}

function getEnergyContract() {
  const { address, abiPath, networkUrl } = loadContractInfo();
  const abi = loadAbi(abiPath);

  const provider = new ethers.providers.JsonRpcProvider(networkUrl);
  const wallet = ethers.Wallet.fromMnemonic(DEFAULT_HARDHAT_MNEMONIC).connect(provider);

  const contract = new ethers.Contract(address, abi, wallet);
  return { contract, provider, wallet };
}

module.exports = { getEnergyContract };
