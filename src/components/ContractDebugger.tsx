import { useState } from 'react';
import useContracts from '../hooks/useContracts';

export default function ContractDebugger() {
  const { 
    isConnected, 
    userStats, 
    loading, 
    error, 
    connectWallet, 
    contracts 
  } = useContracts();
  
  const [debugInfo, setDebugInfo] = useState<string>('');

  const testContractConnection = async () => {
    setDebugInfo('Testing contract connection...\n');
    
    try {
      // Test 1: Check if window.ethereum exists
      if (typeof window.ethereum === 'undefined') {
        setDebugInfo(prev => prev + '❌ MetaMask not detected\n');
        return;
      }
      setDebugInfo(prev => prev + '✅ MetaMask detected\n');

      // Test 2: Check contract addresses
      setDebugInfo(prev => prev + `📋 Contract Addresses:\n`);
      setDebugInfo(prev => prev + `- Rewards: ${contracts.SunGridRewards.address}\n`);
      setDebugInfo(prev => prev + `- Token: ${contracts.SunGridEnergyToken.address}\n`);
      setDebugInfo(prev => prev + `- Marketplace: ${contracts.SunGridMarketplace.address}\n`);

      // Test 3: Check network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setDebugInfo(prev => prev + `🌐 Current Chain ID: ${chainId}\n`);
      setDebugInfo(prev => prev + `🎯 Expected Chain ID: 296 (Hedera Testnet)\n`);

      if (chainId !== '0x128') { // 296 in hex
        setDebugInfo(prev => prev + '⚠️ Wrong network! Please switch to Hedera Testnet\n');
      } else {
        setDebugInfo(prev => prev + '✅ Correct network (Hedera Testnet)\n');
      }

      // Test 4: Try to connect wallet
      setDebugInfo(prev => prev + '🔗 Attempting wallet connection...\n');
      const result = await connectWallet();
      
      if (result.success) {
        setDebugInfo(prev => prev + `✅ Wallet connected: ${result.address}\n`);
      } else {
        setDebugInfo(prev => prev + `❌ Wallet connection failed: ${result.error}\n`);
      }

    } catch (error: any) {
      setDebugInfo(prev => prev + `❌ Error: ${error.message}\n`);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
      <h3 className="text-xl font-bold text-white mb-4">🔧 Contract Debugger</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Connection Status</h4>
            <p className={`text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {isConnected ? '✅ Connected' : '❌ Disconnected'}
            </p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Loading State</h4>
            <p className={`text-sm ${loading ? 'text-yellow-400' : 'text-gray-400'}`}>
              {loading ? '⏳ Loading...' : '✅ Ready'}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <h4 className="text-red-400 font-semibold mb-2">Error Details</h4>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {userStats && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="text-green-400 font-semibold mb-2">User Stats (from contract)</h4>
            <div className="text-green-300 text-sm space-y-1">
              <p>Energy Produced: {userStats.totalEnergyProduced} kWh</p>
              <p>Energy Traded: {userStats.totalEnergyTraded} kWh</p>
              <p>Carbon Credits: {userStats.carbonCredits}</p>
              <p>Eco Points: {userStats.ecoPoints}</p>
            </div>
          </div>
        )}

        <button
          onClick={testContractConnection}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          🧪 Test Contract Connection
        </button>

        {debugInfo && (
          <div className="bg-black/50 border border-white/20 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Debug Output</h4>
            <pre className="text-green-400 text-xs whitespace-pre-wrap font-mono">
              {debugInfo}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}


