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