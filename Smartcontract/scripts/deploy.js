const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("🌞 Deploying SunGrid Africa ecosystem to Hedera...");
  console.log("=".repeat(60));
  console.log("🆔 Deploying with account:", deployer.address);

  // Check balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "HBAR");

  if (balance === 0n) {
    console.log("❌ Insufficient balance for deployment. Please fund your account with test HBAR.");
    console.log("💡 Get test HBAR from: https://portal.hedera.com/");
    return;
  }

  console.log("\n" + "=".repeat(60));
  console.log("📦 STEP 1: Deploying SunGridEnergyToken (SET)...");
  console.log("=".repeat(60));
  
  const SunGridEnergyToken = await hre.ethers.deployContract("SunGridEnergyToken");
  await SunGridEnergyToken.waitForDeployment();
  const tokenAddress = await SunGridEnergyToken.getAddress();
  
  console.log("✅ SunGridEnergyToken deployed at:", tokenAddress);
  console.log("   - Token Name: SunGrid Energy Token");
  console.log("   - Symbol: SET");
  console.log("   - Decimals: 18");
  console.log("   - Owner:", deployer.address);

  // Wait for a few seconds to ensure contract is indexed
  console.log("\n⏳ Waiting for contract to be indexed...");
  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log("\n" + "=".repeat(60));
  console.log("📦 STEP 2: Deploying SunGridMarketplace...");
  console.log("=".repeat(60));
  
  const SunGridMarketplace = await hre.ethers.deployContract(
    "SunGridMarketplace",
    [tokenAddress]
  );
  await SunGridMarketplace.waitForDeployment();
  const marketplaceAddress = await SunGridMarketplace.getAddress();
  
  console.log("✅ SunGridMarketplace deployed at:", marketplaceAddress);
  console.log("   - Connected to Token:", tokenAddress);
  console.log("   - Platform Fee: 0.25%");
  console.log("   - Owner:", deployer.address);

  // Wait again
  console.log("\n⏳ Waiting for contract to be indexed...");
  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log("\n" + "=".repeat(60));
  console.log("📦 STEP 3: Deploying SunGridRewards...");
  console.log("=".repeat(60));
  
  const SunGridRewards = await hre.ethers.deployContract(
    "SunGridRewards",
    [tokenAddress, marketplaceAddress]
  );
  await SunGridRewards.waitForDeployment();
  const rewardsAddress = await SunGridRewards.getAddress();
  
  console.log("✅ SunGridRewards deployed at:", rewardsAddress);
  console.log("   - Connected to Token:", tokenAddress);
  console.log("   - Connected to Marketplace:", marketplaceAddress);
  console.log("   - Carbon Credit Rate: 1 credit per 10 kWh");
  console.log("   - Eco Points Rate: 10 points per kWh traded");

  console.log("\n" + "=".repeat(60));
  console.log("🔧 STEP 4: Post-Deployment Configuration...");
  console.log("=".repeat(60));

  // Authorize the deployer as a minter (for testing)
  console.log("\n📝 Authorizing deployer as energy minter...");
  const authTx = await SunGridEnergyToken.authorizeMinter(deployer.address);
  await authTx.wait();
  console.log("✅ Deployer authorized as minter");

  // Create deployment summary
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      SunGridEnergyToken: {
        address: tokenAddress,
        transactionHash: SunGridEnergyToken.deploymentTransaction().hash,
        name: "SunGrid Energy Token",
        symbol: "SET",
        decimals: 18
      },
      SunGridMarketplace: {
        address: marketplaceAddress,
        transactionHash: SunGridMarketplace.deploymentTransaction().hash,
        platformFee: "0.25%",
        tokenAddress: tokenAddress
      },
      SunGridRewards: {
        address: rewardsAddress,
        transactionHash: SunGridRewards.deploymentTransaction().hash,
        tokenAddress: tokenAddress,
        marketplaceAddress: marketplaceAddress
      }
    },
    explorer: {
      token: `https://hashscan.io/${hre.network.name === "hederaTestnet" ? "testnet" : "mainnet"}/contract/${tokenAddress}`,
      marketplace: `https://hashscan.io/${hre.network.name === "hederaTestnet" ? "testnet" : "mainnet"}/contract/${marketplaceAddress}`,
      rewards: `https://hashscan.io/${hre.network.name === "hederaTestnet" ? "testnet" : "mainnet"}/contract/${rewardsAddress}`
    }
  };

  // Save deployment info to file
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const filename = `sungrid-${hre.network.name}-${Date.now()}.json`;
  const filepath = path.join(deploymentsDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(deploymentInfo, null, 2));

  // Also save as latest
  const latestPath = path.join(deploymentsDir, `sungrid-${hre.network.name}-latest.json`);
  fs.writeFileSync(latestPath, JSON.stringify(deploymentInfo, null, 2));

  console.log("\n" + "=".repeat(60));
  console.log("📋 DEPLOYMENT SUMMARY");
  console.log("=".repeat(60));
  console.log(JSON.stringify(deploymentInfo, null, 2));

  console.log("\n" + "=".repeat(60));
  console.log("💾 Deployment info saved to:");
  console.log("   - " + filepath);
  console.log("   - " + latestPath);

  console.log("\n" + "=".repeat(60));
  console.log("🔍 VIEW ON EXPLORER:");
  console.log("=".repeat(60));
  console.log("Token Contract:", deploymentInfo.explorer.token);
  console.log("Marketplace Contract:", deploymentInfo.explorer.marketplace);
  console.log("Rewards Contract:", deploymentInfo.explorer.rewards);

  console.log("\n" + "=".repeat(60));
  console.log("📝 NEXT STEPS:");
  console.log("=".repeat(60));
  console.log("1. Test minting energy tokens:");
  console.log(`   npx hardhat run scripts/test-mint.js --network ${hre.network.name}`);
  console.log("\n2. Create a test listing:");
  console.log(`   npx hardhat run scripts/test-listing.js --network ${hre.network.name}`);
  console.log("\n3. Configure IoT device minters:");
  console.log("   - Use authorizeMinter() to add IoT oracle addresses");
  console.log("\n4. Integrate with frontend:");
  console.log("   - Import contract addresses from deployments folder");
  console.log("   - Use ABIs from artifacts/contracts/");

  console.log("\n" + "=".repeat(60));
  console.log("✨ DEPLOYMENT COMPLETE!");
  console.log("=".repeat(60));
  console.log("🌍 SunGrid Africa is now live on Hedera!");
  console.log("☀️  Start turning sunlight into currency for communities.");
  console.log("=".repeat(60) + "\n");
}

main().catch((error) => {
  console.error("\n❌ Deployment failed:");
  console.error(error);
  process.exitCode = 1;
});