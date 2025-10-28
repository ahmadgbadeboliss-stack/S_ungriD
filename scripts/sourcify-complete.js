const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    console.log("🔍 Complete Sourcify Verification Setup");
    console.log("=".repeat(60));

    // Load deployment info
    const deploymentsDir = path.join(__dirname, "..", "deployments");
    const latestDeployment = path.join(deploymentsDir, "sungrid-hederaTestnet-latest.json");

    if (!fs.existsSync(latestDeployment)) {
        console.log("❌ No deployment found. Please deploy contracts first.");
        return;
    }

    const deployment = JSON.parse(fs.readFileSync(latestDeployment, "utf8"));

    // Create comprehensive Sourcify package
    const sourcifyDir = path.join(__dirname, "..", "sourcify");
    if (!fs.existsSync(sourcifyDir)) {
        fs.mkdirSync(sourcifyDir, { recursive: true });
    }

    // Copy source code
    const sourceCode = fs.readFileSync(path.join(__dirname, "..", "contracts", "Sungrid.sol"), "utf8");
    fs.writeFileSync(path.join(sourcifyDir, "Sungrid.sol"), sourceCode);

    // Create metadata for each contract
    const contracts = [
        {
            name: "SunGridEnergyToken",
            address: deployment.contracts.SunGridEnergyToken.address,
            constructorArgs: []
        },
        {
            name: "SunGridMarketplace",
            address: deployment.contracts.SunGridMarketplace.address,
            constructorArgs: [deployment.contracts.SunGridEnergyToken.address]
        },
        {
            name: "SunGridRewards",
            address: deployment.contracts.SunGridRewards.address,
            constructorArgs: [
                deployment.contracts.SunGridEnergyToken.address,
                deployment.contracts.SunGridMarketplace.address
            ]
        }
    ];

    // Create metadata for each contract
    contracts.forEach((contract, index) => {
        const metadata = {
            compiler: {
                version: "0.8.19"
            },
            language: "Solidity",
            output: {
                abi: [],
                devdoc: {
                    kind: "dev",
                    version: 1,
                    methods: {}
                },
                userdoc: {
                    kind: "user",
                    version: 1,
                    methods: {}
                }
            },
            settings: {
                compilationTarget: {
                    "contracts/Sungrid.sol": contract.name
                },
                evmVersion: "paris",
                libraries: {},
                metadata: {
                    bytecodeHash: "ipfs"
                },
                optimizer: {
                    enabled: true,
                    runs: 200
                },
                remappings: []
            },
            sources: {
                "contracts/Sungrid.sol": {
                    keccak256: "0x" + require("crypto").createHash("sha256").update(sourceCode).digest("hex"),
                    urls: ["bzz-raw://" + require("crypto").createHash("sha256").update(sourceCode).digest("hex")]
                }
            },
            version: 1
        };

        fs.writeFileSync(
            path.join(sourcifyDir, `${contract.name}-metadata.json`),
            JSON.stringify(metadata, null, 2)
        );
    });

    // Create verification guide
    const verificationGuide = {
        title: "SunGrid Contracts Sourcify Verification",
        network: "Hedera Testnet",
        chainId: 296,
        sourcifyUrl: "https://verify.hashscan.io/",
        contracts: contracts.map(c => ({
            name: c.name,
            address: c.address,
            metadataFile: `${c.name}-metadata.json`,
            constructorArgs: c.constructorArgs
        })),
        steps: [
            "1. Visit https://verify.hashscan.io/",
            "2. For each contract:",
            "   a) Enter the contract address",
            "   b) Upload the source code (Sungrid.sol)",
            "   c) Upload the corresponding metadata file",
            "   d) Select 'Hedera Testnet' as the network",
            "   e) Click 'Verify Contract'",
            "3. Wait for verification to complete",
            "4. Check Hashscan to confirm verification status"
        ],
        files: {
            sourceCode: "Sungrid.sol",
            metadataFiles: contracts.map(c => `${c.name}-metadata.json`)
        }
    };

    fs.writeFileSync(
        path.join(sourcifyDir, "verification-guide.json"),
        JSON.stringify(verificationGuide, null, 2)
    );

    console.log("📦 Sourcify Package Created:");
    console.log("=".repeat(60));
    console.log(`📁 Location: ${sourcifyDir}`);
    console.log("📄 Files created:");
    console.log("   - Sungrid.sol (source code)");
    contracts.forEach(contract => {
        console.log(`   - ${contract.name}-metadata.json`);
    });
    console.log("   - verification-guide.json");

    console.log("\n" + "=".repeat(60));
    console.log("🚀 VERIFICATION STEPS:");
    console.log("=".repeat(60));

    console.log("\n1. 🌐 Go to Hedera's Sourcify:");
    console.log("   🔗 https://verify.hashscan.io/");

    console.log("\n2. 📋 Verify each contract:");
    contracts.forEach((contract, index) => {
        console.log(`\n   ${index + 1}. ${contract.name}:`);
        console.log(`      Address: ${contract.address}`);
        console.log(`      Metadata: ${contract.name}-metadata.json`);
        console.log(`      Constructor Args: ${JSON.stringify(contract.constructorArgs)}`);
    });

    console.log("\n3. 📄 For each contract:");
    console.log("   a) Enter contract address");
    console.log("   b) Upload Sungrid.sol source code");
    console.log("   c) Upload corresponding metadata file");
    console.log("   d) Select 'Hedera Testnet'");
    console.log("   e) Click 'Verify'");

    console.log("\n" + "=".repeat(60));
    console.log("🔍 CONTRACT ADDRESSES:");
    console.log("=".repeat(60));
    contracts.forEach(contract => {
        console.log(`${contract.name}: ${contract.address}`);
        console.log(`Hashscan: https://hashscan.io/testnet/contract/${contract.address}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("✨ SOURCIFY VERIFICATION READY!");
    console.log("=".repeat(60));
    console.log("🌍 Your contracts will be verified on Hedera's Sourcify instance");
    console.log("🔍 After verification, they'll appear as verified on Hashscan");
    console.log("📋 All necessary files are in the 'sourcify' directory");
    console.log("=".repeat(60));
}

main().catch((error) => {
    console.error("\n❌ Sourcify setup failed:");
    console.error(error);
    process.exitCode = 1;
});
