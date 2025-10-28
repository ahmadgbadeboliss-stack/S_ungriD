const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
const { VerificationStatus } = require("@ethereum-sourcify/lib-sourcify");

async function main() {
    console.log("🔍 SunGrid Sourcify Verification");
    console.log("=".repeat(60));

    // Load deployment info
    const deploymentsDir = path.join(__dirname, "..", "deployments");
    const latestDeployment = path.join(deploymentsDir, "sungrid-hederaTestnet-latest.json");

    if (!fs.existsSync(latestDeployment)) {
        console.log("❌ No deployment found. Please deploy contracts first.");
        return;
    }

    const deployment = JSON.parse(fs.readFileSync(latestDeployment, "utf8"));

    console.log("📋 Contract Information:");
    console.log("=".repeat(60));

    Object.entries(deployment.contracts).forEach(([name, contract]) => {
        console.log(`\n📦 ${name}:`);
        console.log(`   Address: ${contract.address}`);
        console.log(`   Hashscan: https://hashscan.io/testnet/contract/${contract.address}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("🌐 SOURCIFY VERIFICATION STEPS:");
    console.log("=".repeat(60));

    console.log("\n1. 📍 Visit Hedera's Sourcify Instance:");
    console.log("   🔗 https://verify.hashscan.io/");

    console.log("\n2. 📦 For each contract, you'll need:");
    console.log("   - Contract Address");
    console.log("   - Source Code (from contracts/Sungrid.sol)");
    console.log("   - Metadata JSON (from artifacts/)");

    // Create Sourcify verification package
    const sourcifyDir = path.join(__dirname, "..", "sourcify");
    if (!fs.existsSync(sourcifyDir)) {
        fs.mkdirSync(sourcifyDir, { recursive: true });
    }

    // Copy source code
    const sourceCode = fs.readFileSync(path.join(__dirname, "..", "contracts", "Sungrid.sol"), "utf8");
    fs.writeFileSync(path.join(sourcifyDir, "Sungrid.sol"), sourceCode);

    // Find and copy metadata files
    const artifactsDir = path.join(__dirname, "..", "artifacts", "contracts");
    const metadataFiles = [];

    function findMetadataFiles(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                findMetadataFiles(filePath);
            } else if (file === "metadata.json") {
                metadataFiles.push(filePath);
            }
        }
    }

    findMetadataFiles(artifactsDir);

    console.log("\n📄 Metadata files found:");
    metadataFiles.forEach((file, index) => {
        const relativePath = path.relative(process.cwd(), file);
        console.log(`   ${index + 1}. ${relativePath}`);

        // Copy metadata to sourcify directory
        const fileName = path.basename(file);
        const destPath = path.join(sourcifyDir, `metadata-${index + 1}.json`);
        fs.copyFileSync(file, destPath);
    });

    // Create verification instructions
    const verificationInstructions = {
        network: "hederaTestnet",
        chainId: 296,
        sourcifyUrl: "https://verify.hashscan.io/",
        contracts: deployment.contracts,
        files: {
            sourceCode: "Sungrid.sol",
            metadata: metadataFiles.map((file, index) => `metadata-${index + 1}.json`)
        },
        steps: [
            "1. Visit https://verify.hashscan.io/",
            "2. Enter contract address",
            "3. Upload source code (Sungrid.sol)",
            "4. Upload metadata JSON files",
            "5. Select Hedera Testnet",
            "6. Submit for verification"
        ]
    };

    fs.writeFileSync(
        path.join(sourcifyDir, "verification-instructions.json"),
        JSON.stringify(verificationInstructions, null, 2)
    );

    console.log("\n" + "=".repeat(60));
    console.log("📦 SOURCIFY PACKAGE CREATED:");
    console.log("=".repeat(60));
    console.log(`📁 Location: ${sourcifyDir}`);
    console.log("📄 Files created:");
    console.log("   - Sungrid.sol (source code)");
    metadataFiles.forEach((_, index) => {
        console.log(`   - metadata-${index + 1}.json`);
    });
    console.log("   - verification-instructions.json");

    console.log("\n" + "=".repeat(60));
    console.log("🚀 MANUAL VERIFICATION STEPS:");
    console.log("=".repeat(60));

    console.log("\n1. 🌐 Go to Hedera's Sourcify:");
    console.log("   https://verify.hashscan.io/");

    console.log("\n2. 📋 For each contract:");
    console.log("   a) Enter contract address");
    console.log("   b) Upload Sungrid.sol source code");
    console.log("   c) Upload corresponding metadata.json");
    console.log("   d) Select 'Hedera Testnet'");
    console.log("   e) Click 'Verify'");

    console.log("\n3. 📄 Contract Addresses:");
    Object.entries(deployment.contracts).forEach(([name, contract]) => {
        console.log(`   ${name}: ${contract.address}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("✨ SOURCIFY VERIFICATION READY!");
    console.log("=".repeat(60));
    console.log("🌍 Your contracts will be verified on Hedera's Sourcify instance");
    console.log("🔍 After verification, they'll appear as verified on Hashscan");
    console.log("=".repeat(60));
}

main().catch((error) => {
    console.error("\n❌ Sourcify setup failed:");
    console.error(error);
    process.exitCode = 1;
});
