import { Zap, Shield, Globe, BarChart3, Users, Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";

export default function FeaturesPage() {
  const features = [
    {
      icon: Zap,
      title: "Instant Trading",
      description: "Trade solar energy tokens instantly with near-zero fees",
      color: "from-yellow-400 to-orange-500",
      features: ["Sub-second finality", "Near-zero fees", "24/7 availability"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with carbon-negative consensus",
      color: "from-green-400 to-emerald-500",
      features: ["Military-grade encryption", "Carbon-negative", "Regulatory compliant"]
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with solar farms across  and beyond",
      color: "from-blue-400 to-cyan-500",
      features: ["Multi-currency support", "Cross-border trading", "25+ countries"]
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Real-time energy production data and market analytics",
      color: "from-purple-400 to-pink-500",
      features: ["Real-time data", "AI predictions", "Market insights"]
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a growing community of renewable energy producers",
      color: "from-red-400 to-orange-500",
      features: ["Community governance", "Reward programs", "Social features"]
    },
    {
      icon: Leaf,
      title: "Carbon Neutral",
      description: "Track and verify your carbon footprint reduction",
      color: "from-emerald-400 to-green-500",
      features: ["Carbon tracking", "Climate impact", "Sustainability reports"]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Platform <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">Features</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Discover the powerful features that make SunGrid  the leading solar energy marketplace.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} delay={idx * 100} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Experience These Features?</h2>
          <p className="text-xl text-white/90 mb-8">Join thousands of users already benefiting from our platform.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/wallet-login" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/marketplace" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
              Explore Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}