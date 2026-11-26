const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const deployment = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "deployments", "localhost.json"), "utf8")
  );
  const CONTRACT_ADDRESS = deployment.address;
  console.log("🔗 Using contract at:", CONTRACT_ADDRESS);

  const energyData = await hre.ethers.getContractAt("EnergyData", CONTRACT_ADDRESS);

  const deviceId = "sensor-001";
  const hash = "5ef10b04607b84cbc14a9d379a5b18208d2122c9d3e4991fec7a8ef7278753b0";
  const sensorData = BigInt("0x" + hash); // matches uint256 param

  const tx = await energyData.storeData(deviceId, sensorData, hash);
  console.log("⛓️ tx sent:", tx.hash);

  await tx.wait();
  console.log("✅ tx mined");

  const count = await energyData.getCount();
  console.log("📦 count:", count.toString());

  const rec = await energyData.getRecord(0);
  console.log("📄 record[0]:", rec);
}

main().catch((e) => {
  console.error("❌ test failed:", e);
  process.exitCode = 1;
});