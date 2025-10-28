import { useState, useEffect } from 'react';
import { Battery, DollarSign, Leaf, TrendingUp, RefreshCw } from 'lucide-react';
import useContracts from '../hooks/useContracts';

interface SmartContractStatsProps {
  className?: string;
}

export default function SmartContractStats({ className = '' }: SmartContractStatsProps) {
  const { 
    isConnected, 
    userStats, 
    loading, 
    error, 
    connectWallet, 
    updateUserStats
  } = useContracts();
  
  const [carbonOffset, setCarbonOffset] = useState<string>('0');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isConnected && userStats) {
      // Calculate carbon offset from user stats
      const offset = parseFloat(userStats.carbonCredits) * 0.5; // 0.5 tons per credit
      setCarbonOffset(offset.toFixed(2));
    }
  }, [isConnected, userStats]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Simulate energy production update
      await updateUserStats(1.5); // 1.5 kWh
    } catch (error) {
      console.error('Failed to refresh stats:', error);
    } finally {
      setRefreshing(false);
    }
  };

  if (!isConnected) {
    return (
      <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 ${className}`}>
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-4">Smart Contract Stats</h3>
          <p className="text-white/70 mb-6">Connect your wallet to view blockchain data</p>
          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 ${className}`}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading blockchain data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 ${className}`}>
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-4">Smart Contract Stats</h3>
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Blockchain Stats</h3>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white/80 text-sm font-semibold">Energy Produced</h4>
            <Battery className="h-4 w-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {userStats?.totalEnergyProduced || '0'} kWh
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white/80 text-sm font-semibold">Energy Traded</h4>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">
            {userStats?.totalEnergyTraded || '0'} kWh
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white/80 text-sm font-semibold">Carbon Credits</h4>
            <Leaf className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            {userStats?.carbonCredits || '0'} CC
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white/80 text-sm font-semibold">Eco Points</h4>
            <DollarSign className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {userStats?.ecoPoints || '0'} EP
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg border border-emerald-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-semibold">Carbon Offset</h4>
            <p className="text-white/70 text-sm">Environmental impact</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-400">{carbonOffset}T</div>
            <p className="text-white/70 text-sm">CO₂ Saved</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-white/60 text-xs">
          Data from Hedera Testnet • Contract: 0x69345fD666Fc2F3965D50b054f4B59AdFf6306ee
        </p>
      </div>
    </div>
  );
}
