const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const EnergyData = await hre.ethers.getContractFactory("EnergyData");
  const energyData = await EnergyData.deploy();
  await energyData.waitForDeployment();

  const addr = await energyData.getAddress();
  console.log("✅ EnergyData deployed to:", addr);

  // Save address for other scripts
  const outDir = path.join(__dirname, "..", "deployments");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "localhost.json"),
    JSON.stringify({ address: addr }, null, 2)
  );
  console.log("📝 Address saved to deployments/localhost.json");
}

main().catch((error) => {
  console.error("❌ Deploy failed:", error);
  process.exitCode = 1;
});