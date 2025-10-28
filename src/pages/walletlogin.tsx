import { Wallet, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useWallet from "../hooks/useWallet";
// import { useToast } from "../contexts/ToastContext";

export default function WalletLoginPage() {
  const [selectedWallet, setSelectedWallet] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const { connect } = useWallet();
//   const { showToast } = useToast();
  const navigate = useNavigate();

  const wallets = [
    { id: 'hashpack', name: 'HashPack', description: 'Most popular Hedera wallet', icon: '🔗', color: 'from-blue-500 to-purple-600' },
    { id: 'blade', name: 'Blade Wallet', description: 'Secure Hedera wallet', icon: '⚔️', color: 'from-green-500 to-emerald-600' },
    { id: 'metamask', name: 'MetaMask', description: 'Connect via MetaMask', icon: '🦊', color: 'from-orange-500 to-red-600' },
    { id: 'manual', name: 'Manual Entry', description: 'Enter wallet address manually', icon: '✏️', color: 'from-gray-500 to-slate-600' },
  ];

  const handleConnect = () => {
    if (!selectedWallet) {
      setError('Please select a wallet');
    //   showToast({
    //     type: 'error',
    //     title: 'Wallet Selection Required',
    //     message: 'Please select a wallet to continue'
    //   });
      return;
    }
    
    setIsConnecting(true);
    setError('');
    
    // showToast({
    //   type: 'info',
    //   title: 'Connecting Wallet',
    //   message: 'Please wait while we connect your wallet...'
    // });
    
    setTimeout(() => {
      const mockAddress = selectedWallet === 'manual' ? '0.0.123456' : '0.0.789012';
      connect(mockAddress, selectedWallet);
      setIsConnecting(false);
      
    //   showToast({
    //     type: 'success',
    //     title: 'Wallet Connected Successfully!',
    //     message: `Connected with ${selectedWallet} wallet`
    //   });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
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
                onClick={() => setSelectedWallet(wallet.id)}
                className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                  selectedWallet === wallet.id ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/20 bg-white/5 hover:bg-white/10'
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
              <Link to="/" className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm flex items-center justify-center">
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}