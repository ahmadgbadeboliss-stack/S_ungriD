import { Wallet, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useWallet from "../hooks/useWallet";
// import { useToast } from "../contexts/ToastContext";

export default function WalletConnect() {
  const { isConnected, walletAddress, disconnect } = useWallet();
//   const { showToast } = useToast();
  const navigate = useNavigate();

  const connectWallet = () => {
    navigate('/wallet-login');
  };

  const handleDisconnect = () => {
    disconnect();
    // showToast({
    //   type: 'info',
    //   title: 'Wallet Disconnected',
    //   message: 'You have been disconnected from your wallet'
    // });
  };

  return (
    <div className="flex items-center space-x-4">
      {isConnected ? (
        <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
          <button 
            onClick={handleDisconnect}
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

