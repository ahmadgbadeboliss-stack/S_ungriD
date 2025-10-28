import { Sun, Globe, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

// Footer Component
export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sun className="h-8 w-8 text-yellow-400" />
              <span className="text-xl font-bold text-white">SunGrid </span>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              the first peer-to-peer solar energy marketplace powered by Hedera Hashgraph.
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
              <li><Link to="/marketplace" className="text-white/70 hover:text-white transition-colors">Marketplace</Link></li>
              <li><Link to="/features" className="text-white/70 hover:text-white transition-colors">Features</Link></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">API Docs</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Developer Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Community</a></li>
              <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            © 2024 SunGrid . All rights reserved.
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