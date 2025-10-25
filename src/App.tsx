import { 
  Sun, 
  Zap, 
  Shield, 
  Globe, 
  TrendingUp, 
  Users, 
  Leaf, 
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  MessageCircle,
  Wallet,
  BarChart3,
  Lightbulb,
  Battery,
  Wind,
  DollarSign
} from 'lucide-react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Wallet Connect Component
function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // Check if wallet is already connected on component mount
  useState(() => {
    const savedWallet = localStorage.getItem('walletAddress');
    if (savedWallet) {
      setIsConnected(true);
      setWalletAddress(savedWallet);
    }
  });

  const connectWallet = () => {
    // Navigate to wallet login page
    window.location.href = '/wallet-login';
  };

  const disconnectWallet = () => {
    localStorage.removeItem('walletAddress');
    setIsConnected(false);
    setWalletAddress('');
  };

  return (
    <div className="flex items-center space-x-4">
      {isConnected ? (
        <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">{walletAddress}</span>
          <button 
            onClick={disconnectWallet}
            className="ml-2 text-green-400 hover:text-green-300 transition-colors"
            title="Disconnect Wallet"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button 
          onClick={connectWallet}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105"
        >
          <Wallet className="h-4 w-4" />
          <span>Connect Wallet</span>
        </button>
      )}
    </div>
  );
}

// Navigation Component
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sun className="h-8 w-8 text-yellow-400" />
            <span className="text-xl font-bold text-white">SunGrid Africa</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-yellow-400' : 'text-white/80 hover:text-white'}`}>
              Home
            </Link>
            <Link to="/about" className={`transition-colors ${location.pathname === '/about' ? 'text-yellow-400' : 'text-white/80 hover:text-white'}`}>
              About
            </Link>
            <Link to="/features" className={`transition-colors ${location.pathname === '/features' ? 'text-yellow-400' : 'text-white/80 hover:text-white'}`}>
              Features
            </Link>
            <Link to="/impact" className={`transition-colors ${location.pathname === '/impact' ? 'text-yellow-400' : 'text-white/80 hover:text-white'}`}>
              Impact
            </Link>
            <WalletConnect />
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-4">
            <Link to="/" className="block text-white/80 hover:text-white" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block text-white/80 hover:text-white" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/features" className="block text-white/80 hover:text-white" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link to="/impact" className="block text-white/80 hover:text-white" onClick={() => setIsMenuOpen(false)}>Impact</Link>
            <div className="pt-4">
              <WalletConnect />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Home Page Component
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 mb-6">
              <Shield className="h-5 w-5 text-yellow-400 mr-3" />
              <span className="text-yellow-400 text-sm font-semibold">Enterprise-Grade Hedera Hashgraph Network</span>
              <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-shadow-lg">
              Africa's First
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Solar Energy Marketplace
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Generate, tokenize, and trade clean energy with complete transparency on the Hedera blockchain. 
              Enterprise-grade security, carbon-negative consensus, and regulatory compliance for Africa's energy future.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up">
            <Link to="/wallet-login" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/25 transition-all transform hover:scale-105 flex items-center pulse-glow">
              Start Trading Energy
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/about" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
              Learn More
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up">
            <div className="text-center hover-lift">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-white/80">Solar Farms</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">2.5MW</div>
              <div className="text-white/80">Energy Generated</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">1,200+</div>
              <div className="text-white/80">Active Users</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">99.9%</div>
              <div className="text-white/80">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow">
              Why Choose SunGrid Africa?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Built on Hedera's enterprise-grade blockchain for maximum security, speed, and sustainability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-left">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Instant Energy Trading</h3>
              <p className="text-white/80">
                Trade solar energy tokens instantly with near-zero transaction fees on Hedera's fast consensus.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-up">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Enterprise Security</h3>
              <p className="text-white/80">
                Bank-grade security with carbon-negative consensus, protecting your energy assets.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-right">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Global Reach</h3>
              <p className="text-white/80">
                Connect with solar farms across Africa and trade energy tokens globally.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-left">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Smart Analytics</h3>
              <p className="text-white/80">
                Real-time energy production data and market analytics for optimal trading decisions.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-up">
              <div className="bg-gradient-to-r from-red-400 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Community Driven</h3>
              <p className="text-white/80">
                Join a growing community of renewable energy producers and consumers across Africa.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-right">
              <div className="bg-gradient-to-r from-emerald-400 to-green-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Carbon Neutral</h3>
              <p className="text-white/80">
                Track and verify your carbon footprint reduction with transparent blockchain records.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-left">
              <div className="bg-gradient-to-r from-indigo-400 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Battery className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Energy Storage</h3>
              <p className="text-white/80">
                Advanced battery storage solutions for consistent energy supply and grid stability.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-up">
              <div className="bg-gradient-to-r from-teal-400 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Wind className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Hybrid Systems</h3>
              <p className="text-white/80">
                Solar-wind hybrid systems for maximum energy generation and reliability.
              </p>
            </div>

            {/* Feature 9 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-right">
              <div className="bg-gradient-to-r from-rose-400 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Fair Pricing</h3>
              <p className="text-white/80">
                Transparent, market-driven pricing with automatic price discovery mechanisms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Impact Section */}
      <section id="impact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400/10 to-orange-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow">
              Our Impact on Africa
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Transforming energy access across the continent through blockchain technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center hover-lift animate-fade-in-left">
              <div className="text-5xl font-bold text-yellow-400 mb-4">15,000+</div>
              <div className="text-xl text-white mb-2">Homes Powered</div>
              <div className="text-white/80">Clean energy access for rural communities</div>
            </div>
            <div className="text-center hover-lift animate-fade-in-up">
              <div className="text-5xl font-bold text-yellow-400 mb-4">2.3M</div>
              <div className="text-xl text-white mb-2">kWh Generated</div>
              <div className="text-white/80">Renewable energy production tracked</div>
            </div>
            <div className="text-center hover-lift animate-fade-in-right">
              <div className="text-5xl font-bold text-yellow-400 mb-4">850</div>
              <div className="text-xl text-white mb-2">Tons CO₂ Saved</div>
              <div className="text-white/80">Carbon emissions prevented</div>
            </div>
          </div>

          {/* Additional Impact Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="text-center hover-lift animate-fade-in-left">
              <div className="text-3xl font-bold text-green-400 mb-2">25+</div>
              <div className="text-white/80">Countries</div>
            </div>
            <div className="text-center hover-lift animate-fade-in-up">
              <div className="text-3xl font-bold text-green-400 mb-2">$2.5M</div>
              <div className="text-white/80">Value Traded</div>
            </div>
            <div className="text-center hover-lift animate-fade-in-up">
              <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
              <div className="text-white/80">Satisfaction</div>
            </div>
            <div className="text-center hover-lift animate-fade-in-right">
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-white/80">Support</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover-lift">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="animate-fade-in-left">
                <h3 className="text-2xl font-bold text-white mb-4">Real Stories, Real Impact</h3>
                <p className="text-white/80 mb-6">
                  "SunGrid Africa helped our village access clean energy for the first time. 
                  We can now power our school and clinic reliably."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Sarah Mwangi</div>
                    <div className="text-white/70">Community Leader, Kenya</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-xl p-6 animate-fade-in-right">
                <div className="text-center">
                  <Sun className="h-16 w-16 text-yellow-400 mx-auto mb-4 float" />
                  <div className="text-2xl font-bold text-white mb-2">Join the Revolution</div>
                  <div className="text-white/80 mb-6">Be part of Africa's clean energy future</div>
            <Link to="/wallet-login" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-400/25 transition-all">
              Get Started Today
            </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow">
            Ready to Power Africa's Future?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of energy producers and consumers already using SunGrid Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/wallet-login" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/25 transition-all transform hover:scale-105 flex items-center pulse-glow">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
              View Documentation
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-white/70">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span>Regulatory Compliant</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span>Carbon Negative</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// About Page Component
function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-shadow-lg">
            About
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              SunGrid Africa
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Pioneering Africa's renewable energy revolution through blockchain technology.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-4xl font-bold text-white mb-6 text-shadow">Our Mission</h2>
              <p className="text-lg text-white/80 mb-6">
                To democratize access to clean energy across Africa by creating a transparent, 
                efficient, and sustainable marketplace powered by Hedera blockchain technology.
              </p>
              <p className="text-lg text-white/80 mb-8">
                We believe that every African should have access to reliable, clean energy, 
                and we're building the infrastructure to make that vision a reality.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-yellow-400/20 px-4 py-2 rounded-full border border-yellow-400/30">
                  <span className="text-yellow-400 font-semibold">Transparency</span>
                </div>
                <div className="bg-green-400/20 px-4 py-2 rounded-full border border-green-400/30">
                  <span className="text-green-400 font-semibold">Sustainability</span>
                </div>
                <div className="bg-blue-400/20 px-4 py-2 rounded-full border border-blue-400/30">
                  <span className="text-blue-400 font-semibold">Innovation</span>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-right">
              <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl p-8 border border-yellow-400/30">
                <Sun className="h-16 w-16 text-yellow-400 mx-auto mb-6 float" />
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Vision 2030</h3>
                <p className="text-white/80 text-center">
                  Power 1 million African homes with clean, renewable energy by 2030.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400/10 to-orange-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-6 text-shadow">Meet Our Team</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Passionate innovators driving Africa's clean energy transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-left">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Oluwabusayomi</h3>
              <p className="text-yellow-400 text-center mb-4">Founder & CEO</p>
              <p className="text-white/80 text-center mb-6">
                Blockchain expert with 8+ years in renewable energy and distributed systems.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="mailto:oluwabusayomi103@gmail.com" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mail className="h-5 w-5 text-white" />
                </a>
                <a href="https://t.me/JustWhis" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <MessageCircle className="h-5 w-5 text-white" />
                </a>
                <a href="tel:+2347072940022" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Phone className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-up">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Dr. Robert</h3>
              <p className="text-green-400 text-center mb-4">CTO</p>
              <p className="text-white/80 text-center mb-6">
                Renewable energy systems expert with PhD in Electrical Engineering from MIT.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="mailto:robert.mwangi@sungrid.africa" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mail className="h-5 w-5 text-white" />
                </a>
                <a href="https://t.me/JustWhis" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <MessageCircle className="h-5 w-5 text-white" />
                </a>
                <a href="tel:+2347072940022" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Phone className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-right">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Ahmad Devs</h3>
              <p className="text-blue-400 text-center mb-4">Head of Operations</p>
              <p className="text-white/80 text-center mb-6">
                Former Shell executive with 15+ years in African energy markets and infrastructure.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="mailto:ahmad.hassan@sungrid.africa" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mail className="h-5 w-5 text-white" />
                </a>
                <a href="https://t.me/JustWhis" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <MessageCircle className="h-5 w-5 text-white" />
                </a>
                <a href="tel:+2347072940022" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Phone className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-4xl font-bold text-white mb-6 text-shadow">Get In Touch</h2>
          <p className="text-xl text-white/90 mb-12">
            Ready to join Africa's clean energy revolution? Let's connect!
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-left">
              <Mail className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-white/80 mb-4">oluwabusayomi103@gmail.com</p>
              <p className="text-white/60 text-sm mb-4">For business inquiries, partnerships, and technical support</p>
              <a href="mailto:oluwabusayomi103@gmail.com" className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center justify-center">
                <Mail className="h-4 w-4 mr-2" />
                Send Message →
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-up">
              <MessageCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Telegram</h3>
              <p className="text-white/80 mb-4">@JustWhis</p>
              <p className="text-white/60 text-sm mb-4">Quick responses and community updates</p>
              <a href="https://t.me/JustWhis" className="text-green-400 hover:text-green-300 transition-colors flex items-center justify-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Chat →
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-right">
              <Phone className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-white/80 mb-4">+234 707 294 0022</p>
              <p className="text-white/60 text-sm mb-4">Direct voice and video calls</p>
              <a href="https://wa.me/2347072940022" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" />
                Call Now →
              </a>
            </div>
          </div>

          {/* Additional Contact Methods */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 rounded-2xl p-8 hover-lift">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Globe className="h-6 w-6 text-yellow-400 mr-3" />
                Office Location
              </h3>
              <p className="text-white/80 mb-2">Lagos, Nigeria</p>
              <p className="text-white/60 text-sm">Africa's tech hub for blockchain innovation</p>
            </div>

            <div className="bg-gradient-to-r from-green-400/10 to-emerald-500/10 border border-green-400/30 rounded-2xl p-8 hover-lift">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 text-green-400 mr-3" />
                Business Hours
              </h3>
              <p className="text-white/80 mb-2">24/7 Support</p>
              <p className="text-white/60 text-sm">Always available for our energy community</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-8 border border-yellow-400/30">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-white/80 mb-6">
              Join thousands of energy producers and consumers already using SunGrid Africa.
            </p>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/25 transition-all transform hover:scale-105 flex items-center mx-auto">
              Connect Your Wallet
              <Wallet className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sun className="h-8 w-8 text-yellow-400" />
              <span className="text-xl font-bold text-white">SunGrid Africa</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Africa's first peer-to-peer solar energy marketplace. 
              Powered by Hedera Hashgraph for secure, fast, and sustainable energy trading.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">API Docs</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Developer Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            © 2024 SunGrid Africa. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Wallet Login Page Component (OpenSea Style)
function WalletLoginPage() {
  const [selectedWallet, setSelectedWallet] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const wallets = [
    {
      id: 'hashpack',
      name: 'HashPack',
      description: 'Most popular Hedera wallet',
      icon: '🔗',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'blade',
      name: 'Blade Wallet',
      description: 'Secure Hedera wallet',
      icon: '⚔️',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Connect via MetaMask',
      icon: '🦊',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'manual',
      name: 'Manual Entry',
      description: 'Enter wallet address manually',
      icon: '✏️',
      color: 'from-gray-500 to-slate-600'
    }
  ];

  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId);
    setError('');
  };

  const handleConnect = async () => {
    if (!selectedWallet) {
      setError('Please select a wallet');
      return;
    }
    
    setIsConnecting(true);
    setError('');
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      // Store wallet info in localStorage
      localStorage.setItem('walletType', selectedWallet);
      localStorage.setItem('walletAddress', selectedWallet === 'manual' ? '0.0.123456' : '0.0.789012');
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Wallet className="h-10 w-10 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Connect Your Wallet</h1>
            <p className="text-white/80 text-lg">Choose your preferred wallet to start trading solar energy</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleWalletSelect(wallet.id)}
                className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                  selectedWallet === wallet.id
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${wallet.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {wallet.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-bold text-lg">{wallet.name}</h3>
                    <p className="text-white/70 text-sm">{wallet.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          <button
            onClick={handleConnect}
            disabled={isConnecting || !selectedWallet}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/25 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isConnecting ? (
              <>
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mr-3"></div>
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="h-6 w-6 mr-3" />
                Connect Wallet
              </>
            )}
          </button>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-white/70 text-sm mb-4">
                By connecting your wallet, you agree to our Terms of Service and Privacy Policy
              </p>
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Terms</a>
                <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Privacy</a>
                <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Help</a>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm flex items-center justify-center">
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Features Page Component
function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-shadow-lg">
            Platform
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Features
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the powerful features that make SunGrid Africa the leading solar energy marketplace.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-left">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Instant Energy Trading</h3>
              <p className="text-white/80 mb-6">
                Trade solar energy tokens instantly with near-zero transaction fees on Hedera's fast consensus. 
                Complete transactions in seconds, not minutes.
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Sub-second finality</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Near-zero fees</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>24/7 availability</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-up">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise Security</h3>
              <p className="text-white/80 mb-6">
                Bank-grade security with carbon-negative consensus, protecting your energy assets with 
                military-grade encryption and distributed ledger technology.
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Military-grade encryption</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Carbon-negative consensus</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Regulatory compliance</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-right">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Global Reach</h3>
              <p className="text-white/80 mb-6">
                Connect with solar farms across Africa and trade energy tokens globally. 
                Our platform supports multiple currencies and international regulations.
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Multi-currency support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Cross-border trading</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>International compliance</span>
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-left">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Analytics</h3>
              <p className="text-white/80 mb-6">
                Real-time energy production data and market analytics for optimal trading decisions. 
                AI-powered insights and predictive modeling.
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Real-time data</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>AI predictions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Market insights</span>
                </li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-up">
              <div className="bg-gradient-to-r from-red-400 to-orange-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Community Driven</h3>
              <p className="text-white/80 mb-6">
                Join a growing community of renewable energy producers and consumers across Africa. 
                Collaborative governance and community rewards.
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Community governance</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Reward programs</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Social features</span>
                </li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-right">
              <div className="bg-gradient-to-r from-emerald-400 to-green-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Carbon Neutral</h3>
              <p className="text-white/80 mb-6">
                Track and verify your carbon footprint reduction with transparent blockchain records. 
                Contribute to global climate goals with every transaction.
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Carbon tracking</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Climate impact</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span>Sustainability reports</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users already benefiting from our advanced platform features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/wallet-login" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/25 transition-all transform hover:scale-105 flex items-center pulse-glow">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/about" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Impact Page Component
function ImpactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-shadow-lg">
            Our
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Impact
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transforming Africa's energy landscape through blockchain technology and renewable energy.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow">
              Numbers That Matter
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Real impact across Africa through sustainable energy solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center hover-lift animate-fade-in-left">
              <div className="text-6xl font-bold text-yellow-400 mb-4">15,000+</div>
              <div className="text-2xl text-white mb-2">Homes Powered</div>
              <div className="text-white/80">Clean energy access for rural communities</div>
            </div>
            <div className="text-center hover-lift animate-fade-in-up">
              <div className="text-6xl font-bold text-green-400 mb-4">2.3M</div>
              <div className="text-2xl text-white mb-2">kWh Generated</div>
              <div className="text-white/80">Renewable energy production tracked</div>
            </div>
            <div className="text-center hover-lift animate-fade-in-up">
              <div className="text-6xl font-bold text-blue-400 mb-4">850</div>
              <div className="text-2xl text-white mb-2">Tons CO₂ Saved</div>
              <div className="text-white/80">Carbon emissions prevented</div>
            </div>
            <div className="text-center hover-lift animate-fade-in-right">
              <div className="text-6xl font-bold text-purple-400 mb-4">25+</div>
              <div className="text-2xl text-white mb-2">Countries</div>
              <div className="text-white/80">Active across Africa</div>
            </div>
          </div>

          {/* Additional Impact Metrics */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-left">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-4">$2.5M</div>
                <div className="text-xl text-white mb-2">Value Traded</div>
                <div className="text-white/80">Total energy transactions</div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-up">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-4">98%</div>
                <div className="text-xl text-white mb-2">Satisfaction Rate</div>
                <div className="text-white/80">User satisfaction score</div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-right">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-4">24/7</div>
                <div className="text-xl text-white mb-2">Support</div>
                <div className="text-white/80">Always available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400/10 to-orange-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow">
              Success Stories
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Real stories from communities transformed by clean energy access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-left">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Sarah Mwangi</h3>
                  <p className="text-white/70">Community Leader, Kenya</p>
                </div>
              </div>
              <p className="text-white/80 mb-6 italic">
                "SunGrid Africa helped our village access clean energy for the first time. 
                We can now power our school and clinic reliably. Our children can study at night, 
                and we have proper medical care."
              </p>
              <div className="flex items-center text-green-400">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-semibold">Impact: 200+ families powered</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover-lift animate-fade-in-right">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <Sun className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Ahmad Devs</h3>
                  <p className="text-white/70">Solar Farm Owner, Nigeria</p>
                </div>
              </div>
              <p className="text-white/80 mb-6 italic">
                "Through SunGrid Africa, I've been able to monetize my solar farm's excess energy. 
                The platform's transparency and instant payments have revolutionized my business model."
              </p>
              <div className="flex items-center text-green-400">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-semibold">Impact: 50kW capacity added</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow">
            Be Part of the Impact
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of energy producers and consumers making a real difference across Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/wallet-login" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/25 transition-all transform hover:scale-105 flex items-center pulse-glow">
              Start Making Impact
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/about" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Trading Dashboard Component
function TradingDashboard() {
  const [walletAddress] = useState(localStorage.getItem('walletAddress') || '');
  const [energyBalance] = useState('2.5 kWh');
  const [tokens] = useState('1,250 SGE');
  const [isTrading, setIsTrading] = useState(false);

  const handleTrade = () => {
    setIsTrading(true);
    setTimeout(() => {
      setIsTrading(false);
      // Simulate trade completion
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow">
              Energy Trading Dashboard
            </h1>
            <p className="text-xl text-white/80">
              Welcome back! Manage your solar energy portfolio
            </p>
          </div>

          {/* Wallet Status */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Connected Wallet</h3>
                  <p className="text-white/70 text-sm">{walletAddress}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Connected</span>
              </div>
            </div>
          </div>

          {/* Trading Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover-lift animate-fade-in-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Energy Balance</h3>
                <Battery className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">{energyBalance}</div>
              <p className="text-white/70 text-sm">Available for trading</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover-lift animate-fade-in-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">SGE Tokens</h3>
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">{tokens}</div>
              <p className="text-white/70 text-sm">Solar Grid Energy tokens</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover-lift animate-fade-in-right">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Total Trades</h3>
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-2">47</div>
              <p className="text-white/70 text-sm">Successful transactions</p>
            </div>
          </div>

          {/* Trading Interface */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 animate-fade-in-left">
              <h3 className="text-2xl font-bold text-white mb-6">Buy Energy</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Amount (kWh)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Price per kWh
                  </label>
                  <input
                    type="text"
                    value="0.15 SGE"
                    readOnly
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white/70"
                  />
                </div>
                <button
                  onClick={handleTrade}
                  disabled={isTrading}
                  className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-green-400/25 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isTrading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Buy Energy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 animate-fade-in-right">
              <h3 className="text-2xl font-bold text-white mb-6">Sell Energy</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Amount (kWh)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Your Price (SGE per kWh)
                  </label>
                  <input
                    type="text"
                    placeholder="0.15"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
                  />
                </div>
                <button
                  onClick={handleTrade}
                  disabled={isTrading}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-yellow-400/25 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isTrading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sun className="h-5 w-5 mr-2" />
                      Sell Energy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-white mb-6">Recent Transactions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-400/20 rounded-full flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Bought 5.2 kWh</p>
                    <p className="text-white/70 text-sm">2 hours ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">+0.78 SGE</p>
                  <p className="text-white/70 text-sm">0.15 SGE/kWh</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center">
                    <Sun className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Sold 3.1 kWh</p>
                    <p className="text-white/70 text-sm">1 day ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 font-semibold">+0.47 SGE</p>
                  <p className="text-white/70 text-sm">0.15 SGE/kWh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/wallet-login" element={<WalletLoginPage />} />
          <Route path="/dashboard" element={<TradingDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;