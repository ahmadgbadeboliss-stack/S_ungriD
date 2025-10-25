import { Shield, ArrowRight, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import StatCard from "../components/StatCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 mb-6">
              <Shield className="h-5 w-5 text-yellow-400 mr-3" />
              <span className="text-yellow-400 text-sm font-semibold">Enterprise-Grade Hedera Hashgraph Network</span>
              <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
               The premier
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Solar Energy Marketplace
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Generate, tokenize, and trade clean energy with complete transparency on the Hedera blockchain.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/wallet-login" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/25 transition-all transform hover:scale-105 flex items-center">
              Start Trading Energy
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/marketplace" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
              Explore Marketplace
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <StatCard value="500+" label="Solar Farms" />
            <StatCard value="2.5MW" label="Energy Generated" />
            <StatCard value="1,200+" label="Active Users" />
            <StatCard value="99.9%" label="Uptime" />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose SunGrid ?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Built on Hedera's enterprise-grade blockchain for maximum security, speed, and sustainability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Zap}
              title="Instant Trading"
              description="Trade solar energy tokens instantly with near-zero fees"
              color="from-yellow-400 to-orange-500"
              features={["Sub-second finality", "Near-zero fees", "24/7 availability"]}
              delay={0}
            />
            <FeatureCard
              icon={Shield}
              title="Enterprise Security"
              description="Bank-grade security with carbon-negative consensus"
              color="from-green-400 to-emerald-500"
              features={["Military-grade encryption", "Carbon-negative", "Regulatory compliant"]}
              delay={100}
            />
            <FeatureCard
              icon={Globe}
              title="Global Reach"
              description="Connect with solar farms across  and beyond"
              color="from-blue-400 to-cyan-500"
              features={["Multi-currency support", "Cross-border trading", "25+ countries"]}
              delay={200}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
