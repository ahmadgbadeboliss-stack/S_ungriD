<<<<<<< HEAD
# Sample Hardhat 3 Beta Project (`mocha` and `ethers`)

This project showcases a Hardhat 3 Beta project using `mocha` for tests and the `ethers` library for Ethereum interactions.

To learn more about the Hardhat 3 Beta, please visit the [Getting Started guide](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3). To share your feedback, join our [Hardhat 3 Beta](https://hardhat.org/hardhat3-beta-telegram-group) Telegram group or [open an issue](https://github.com/NomicFoundation/hardhat/issues/new) in our GitHub issue tracker.

## Project Overview

This example project includes:

- A simple Hardhat configuration file.
- Foundry-compatible Solidity unit tests.
- TypeScript integration tests using `mocha` and ethers.js
- Examples demonstrating how to connect to different types of networks, including locally simulating OP mainnet.

## Usage

### Running Tests

To run all the tests in the project, execute the following command:

```shell
npx hardhat test
```

You can also selectively run the Solidity or `mocha` tests:

```shell
npx hardhat test solidity
npx hardhat test mocha
```

### Make a deployment to Sepolia

This project includes an example Ignition module to deploy the contract. You can deploy this module to a locally simulated chain or to Sepolia.

To run the deployment to a local chain:

```shell
npx hardhat ignition deploy ignition/modules/Counter.ts
```

To run the deployment to Sepolia, you need an account with funds to send the transaction. The provided Hardhat configuration includes a Configuration Variable called `SEPOLIA_PRIVATE_KEY`, which you can use to set the private key of the account you want to use.

You can set the `SEPOLIA_PRIVATE_KEY` variable using the `hardhat-keystore` plugin or by setting it as an environment variable.

To set the `SEPOLIA_PRIVATE_KEY` config variable using `hardhat-keystore`:

```shell
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

After setting the variable, you can run the deployment with the Sepolia network:

```shell
npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```
=======
# 🌞 SunGrid Africa - Solar Energy Marketplace

Africa's first peer-to-peer solar energy marketplace powered by Hedera blockchain technology.

## 🚀 Live Demo

**Production URL**: [https://sungrid.africa](https://sungrid.africa)  
**Staging URL**: [https://staging.sungrid.africa](https://staging.sungrid.africa)

## 🌐 Domain Configuration

### Primary Domain
- **Domain**: `sungrid.africa`
- **Subdomain**: `www.sungrid.africa`
- **SSL**: Let's Encrypt (Auto-renewal)

### Alternative Domains
- `sungridafrica.com`
- `solar-energy-africa.com`
- `renewable-energy-marketplace.com`

## 🏗️ Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Custom domain
vercel domains add sungrid.africa
```

### Option 2: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Custom domain
netlify domains:add sungrid.africa
```

### Option 3: GitHub Pages
```bash
# Build and deploy
npm run build
# Deploy dist/ folder to GitHub Pages
```

## 🔧 Environment Variables

Create `.env.production` file:
```env
VITE_APP_NAME=SunGrid Africa
VITE_APP_DOMAIN=sungrid.africa
VITE_APP_API_URL=https://api.sungrid.africa
VITE_HEDERA_NETWORK=testnet
VITE_CONTRACT_ADDRESS=0x69345fD666Fc2F3965D50b054f4B59AdFf6306ee
```

## 📱 Features

- ✅ **Blockchain Integration** - Hedera Hashgraph smart contracts
- ✅ **Wallet Connection** - MetaMask, HashPack, Blade Wallet
- ✅ **Energy Trading** - P2P solar energy marketplace
- ✅ **Carbon Credits** - Environmental impact tracking
- ✅ **Real-time Stats** - Live blockchain data
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **PWA Ready** - Progressive Web App capabilities

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Blockchain**: Hedera Hashgraph + Ethers.js
- **Deployment**: Vercel/Netlify
- **Domain**: Custom .africa domain

## 🌍 Target Markets

- **Primary**: Nigeria, Kenya, South Africa
- **Secondary**: Ghana, Egypt, Morocco
- **Expansion**: All African countries

## 📊 Analytics

- **Google Analytics**: GA4 tracking
- **Hotjar**: User behavior analysis
- **Mixpanel**: Event tracking
- **Sentry**: Error monitoring

## 🔒 Security

- **SSL/TLS**: A+ rating
- **CSP Headers**: Content Security Policy
- **HSTS**: HTTP Strict Transport Security
- **CORS**: Cross-Origin Resource Sharing

## 📈 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: All green
- **CDN**: Global edge caching
- **Compression**: Gzip/Brotli

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📞 Contact

- **Email**: contact@sungrid.africa
- **Telegram**: @JustWhis
- **WhatsApp**: +234 707 294 0022
- **Office**: Lagos, Nigeria

---

**© 2024 SunGrid Africa. All rights reserved.**
>>>>>>> main
