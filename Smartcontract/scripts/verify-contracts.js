const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    console.log("🔍 SunGrid Contract Verification Guide");
    console.log("=".repeat(60));

    // Load deployment info
    const deploymentsDir = path.join(__dirname, "..", "deployments");
    const latestDeployment = path.join(deploymentsDir, "sungrid-hederaTestnet-latest.json");

    if (!fs.existsSync(latestDeployment)) {
        console.log("❌ No deployment found. Please deploy contracts first.");
        return;
    }

    const deployment = JSON.parse(fs.readFileSync(latestDeployment, "utf8"));

    console.log("📋 Contract Information for Verification:");
    console.log("=".repeat(60));

    Object.entries(deployment.contracts).forEach(([name, contract]) => {
        console.log(`\n📦 ${name}:`);
        console.log(`   Address: ${contract.address}`);
        console.log(`   Explorer: ${deployment.explorer[name.toLowerCase().replace(/([A-Z])/g, '_').toLowerCase()]}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("📝 MANUAL VERIFICATION STEPS:");
    console.log("=".repeat(60));

    console.log("\n1. 🌐 Visit Hashscan Testnet Explorer:");
    console.log("   https://hashscan.io/testnet");

    console.log("\n2. 📋 For each contract, you'll need to provide:");
    console.log("   - Contract Address");
    console.log("   - Contract Name");
    console.log("   - Compiler Version: 0.8.19");
    console.log("   - Optimization: Enabled (200 runs)");
    console.log("   - Source Code (from contracts/Sungrid.sol)");

    console.log("\n3. 📄 Source Code Information:");
    console.log("   - Main Contract File: contracts/Sungrid.sol");
    console.log("   - License: MIT");
    console.log("   - Solidity Version: ^0.8.19");

    console.log("\n4. 🔧 Constructor Arguments:");
    console.log("   SunGridEnergyToken: No constructor arguments");
    console.log("   SunGridMarketplace: [tokenAddress]");
    console.log("   SunGridRewards: [tokenAddress, marketplaceAddress]");

    // Create verification package
    const verificationDir = path.join(__dirname, "..", "verification");
    if (!fs.existsSync(verificationDir)) {
        fs.mkdirSync(verificationDir, { recursive: true });
    }

    // Copy source code for verification
    const sourceCode = fs.readFileSync(path.join(__dirname, "..", "contracts", "Sungrid.sol"), "utf8");
    fs.writeFileSync(path.join(verificationDir, "Sungrid.sol"), sourceCode);

    // Create verification info file
    const verificationInfo = {
        network: "hederaTestnet",
        chainId: 296,
        compiler: {
            version: "0.8.19",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                },
                viaIR: true
            }
        },
        contracts: deployment.contracts,
        sourceCode: {
            file: "Sungrid.sol",
            license: "MIT",
            solidityVersion: "^0.8.19"
        },
        constructorArgs: {
            SunGridEnergyToken: [],
            SunGridMarketplace: [deployment.contracts.SunGridEnergyToken.address],
            SunGridRewards: [
                deployment.contracts.SunGridEnergyToken.address,
                deployment.contracts.SunGridMarketplace.address
            ]
        }
    };

    fs.writeFileSync(
        path.join(verificationDir, "verification-info.json"),
        JSON.stringify(verificationInfo, null, 2)
    );

    console.log("\n" + "=".repeat(60));
    console.log("📦 VERIFICATION PACKAGE CREATED:");
    console.log("=".repeat(60));
    console.log(`📁 Location: ${verificationDir}`);
    console.log("📄 Files created:");
    console.log("   - Sungrid.sol (source code)");
    console.log("   - verification-info.json (contract details)");

    console.log("\n" + "=".repeat(60));
    console.log("🚀 NEXT STEPS:");
    console.log("=".repeat(60));
    console.log("1. Visit each contract on Hashscan testnet");
    console.log("2. Click 'Verify Contract' button");
    console.log("3. Upload the source code from verification/Sungrid.sol");
    console.log("4. Enter the constructor arguments from verification-info.json");
    console.log("5. Set compiler version to 0.8.19 with optimization enabled");

    console.log("\n" + "=".repeat(60));
    console.log("✨ VERIFICATION GUIDE COMPLETE!");
    console.log("=".repeat(60));
}

main().catch((error) => {
    console.error("\n❌ Verification setup failed:");
    console.error(error);
    process.exitCode = 1;
});

