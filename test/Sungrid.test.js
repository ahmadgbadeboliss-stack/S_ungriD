const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("🧪 Testing SunGrid Energy Token Minting");
  console.log("=".repeat(60));

  // Load deployment addresses
  const deploymentPath = path.join(
    __dirname,
    "..",
    "deployments",
    `sungrid-${hre.network.name}-latest.json`
  );

  if (!fs.existsSync(deploymentPath)) {
    console.log("❌ No deployment found. Please run deploy script first.");
    return;
  }

  const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
  const tokenAddress = deployment.contracts.SunGridEnergyToken.address;

  console.log("📍 Using Token Contract:", tokenAddress);
  console.log("👤 Minter Address:", deployer.address);

  // Get contract instance
  const SunGridEnergyToken = await hre.ethers.getContractAt(
    "SunGridEnergyToken",
    tokenAddress
  );

  // Check if deployer is authorized minter
  const isAuthorized = await SunGridEnergyToken.authorizedMinters(deployer.address);
  console.log("✓ Minter Authorized:", isAuthorized);

  if (!isAuthorized) {
    console.log("❌ Address not authorized as minter. Run deployment script first.");
    return;
  }

  console.log("\n" + "=".repeat(60));
  console.log("⚡ Minting Test Energy Tokens");
  console.log("=".repeat(60));

  // Test mint: 100 kWh of energy
  const producer = deployer.address; // In production, this would be the actual producer
  const kWhAmount = 100n; // 100 kWh
  const deviceId = "TEST-DEVICE-001";
  const hcsTopicId = hre.ethers.encodeBytes32String("test-topic-123");

  console.log("\n📊 Minting Details:");
  console.log("   Producer:", producer);
  console.log("   Energy Amount:", kWhAmount.toString(), "kWh");
  console.log("   Device ID:", deviceId);
  console.log("   HCS Topic ID:", hcsTopicId);

  console.log("\n🔄 Sending mint transaction...");
  const mintTx = await SunGridEnergyToken.mintEnergy(
    producer,
    kWhAmount,
    deviceId,
    hcsTopicId
  );

  console.log("⏳ Waiting for confirmation...");
  const receipt = await mintTx.wait();
  console.log("✅ Transaction confirmed!");
  console.log("   Tx Hash:", receipt.hash);
  console.log("   Block Number:", receipt.blockNumber);

  // Check balance
  const balance = await SunGridEnergyToken.balanceOf(producer);
  const balanceInKwh = balance / (10n ** 18n);
  
  console.log("\n💰 Token Balance:");
  console.log("   Raw Balance:", balance.toString(), "wei");
  console.log("   SET Balance:", hre.ethers.formatEther(balance), "SET");
  console.log("   Energy Equivalent:", balanceInKwh.toString(), "kWh");

  // Get energy records
  const records = await SunGridEnergyToken.getUserEnergyRecords(producer);
  console.log("\n📝 Energy Production Records:");
  console.log("   Total Records:", records.length);
  
  if (records.length > 0) {
    const latestRecord = records[records.length - 1];
    console.log("\n   Latest Record:");
    console.log("   - Timestamp:", new Date(Number(latestRecord.timestamp) * 1000).toISOString());
    console.log("   - kWh Amount:", latestRecord.kWhAmount.toString());
    console.log("   - Device ID:", latestRecord.deviceId);
    console.log("   - HCS Topic:", latestRecord.hcsTopicId);
  }

  console.log("\n" + "=".repeat(60));
  console.log("✨ Minting test completed successfully!");
  console.log("=".repeat(60));
  console.log("🔗 View on Explorer:");
  console.log(`   https://hashscan.io/${hre.network.name === "hederaTestnet" ? "testnet" : "mainnet"}/transaction/${receipt.hash}`);
  console.log("=".repeat(60) + "\n");
}

main().catch((error) => {
  console.error("\n❌ Test failed:");
  console.error(error);
  process.exitCode = 1;
});