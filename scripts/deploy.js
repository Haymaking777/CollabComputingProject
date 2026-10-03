//Now every time you deploy locally, config stays correct.?

const fs = require("fs");
const path = require("path");
const { ethers } = require("hardhat");

async function main() {
  const EnergyData = await ethers.getContractFactory("EnergyData");
  const contract = await EnergyData.deploy();
  await contract.deployed();

  console.log("✅ EnergyData deployed to:", contract.address);

  // Auto-write address into config/contractInfo.json
  const cfgPath = path.join(__dirname, "..", "config", "contractInfo.json");
  const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
  cfg.address = contract.address;
  fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
  console.log("📝 Updated config/contractInfo.json");
}

main().catch((error) => {
  console.error("❌ Deploy failed:", error);
  process.exitCode = 1;
});
