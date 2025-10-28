require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.19",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                    viaIR: true,
                },
            },
            {
                version: "0.8.20",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                    viaIR: true,
                },
            },
        ],
    },

    networks: {
        hardhat: {
            chainId: 31337,
            gas: 12000000,
            blockGasLimit: 12000000,
            allowUnlimitedContractSize: true,
            timeout: 1800000,
        },

        localhost: {
            url: "http://127.0.0.1:8545",
            chainId: 31337,
            timeout: 60000,
        },

        // Hedera Testnet
        hederaTestnet: {
            url: process.env.HEDERA_RPC_URL || "https://testnet.hashio.io/api",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 296,
            timeout: 60000,
        },

        // Hedera Mainnet
        hederaMainnet: {
            url: process.env.HEDERA_MAINNET_RPC_URL || "https://mainnet.hashio.io/api",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 295,
            timeout: 60000,
        },
    },

    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
        gasPrice: 20,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        showTimeSpent: true,
        showMethodSig: true,
        maxMethodDiff: 10,
    },

    sourcify: {
        enabled: false, // Set to false for Hedera (chain 296 not supported)
    },

    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },

    mocha: {
        timeout: 300000,
        slow: 10000,
        bail: false,
    },
};