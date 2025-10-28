import { Menu, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import WalletConnect from './WalletConnect';
import useWallet from '../hooks/useWallet';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isConnected } = useWallet();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/about', label: 'About' },
    { path: '/impact', label: 'Impact' },
    { path: '/marketplace', label: 'Marketplace' },
  ];

  if (isConnected) {
    navLinks.push({ path: '/dashboard', label: 'Dashboard' });
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sun className="h-8 w-8 text-yellow-400" />
            <span className="text-xl font-bold text-white">SunGrid</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`transition-colors ${location.pathname === link.path ? 'text-yellow-400' : 'text-white/80 hover:text-white'}`}
              >
                {link.label}
              </Link>
            ))}
            <WalletConnect />
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className="block text-white/80 hover:text-white" 
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <WalletConnect />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

