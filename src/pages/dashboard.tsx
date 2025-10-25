import { Home, TrendingUp, BarChart3, Activity, Wallet, Battery, DollarSign, Zap, Sun, ArrowRight } from "lucide-react";
import { useState } from "react";
import useWallet from "../hooks/useWallet";
import SmartContractStats from "../components/SmartContractStats";

export default function DashboardPage() {
  const { walletAddress } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'trading', label: 'Trading', icon: TrendingUp },
    { id: 'portfolio', label: 'Portfolio', icon: BarChart3 },
    { id: 'history', label: 'History', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-white/70">Welcome back! Manage your solar energy portfolio</p>
          </div>

          {/* Wallet Status */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
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

          {/* Smart Contract Stats */}
          <div className="mb-8">
            <SmartContractStats />
          </div>

          {/* Additional Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white/80 font-semibold">Energy Balance</h3>
                <Battery className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">2.5 kWh</div>
              <p className="text-white/70 text-sm">Available for trading</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white/80 font-semibold">SGE Tokens</h3>
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">1,250</div>
              <p className="text-white/70 text-sm">Solar Grid Energy tokens</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white/80 font-semibold">Total Trades</h3>
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-2">47</div>
              <p className="text-white/70 text-sm">Successful transactions</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2 mb-8 flex space-x-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-yellow-400 text-black' 
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'trading' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Buy Energy</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">Amount (kWh)</label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">Price per kWh</label>
                    <input type="text" value="0.15 SGE" readOnly className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white/70" />
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-3 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center">
                    <Zap className="h-5 w-5 mr-2" />
                    Buy Energy
                  </button>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Sell Energy</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">Amount (kWh)</label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">Your Price (SGE per kWh)</label>
                    <input
                      type="text"
                      placeholder="0.15"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    />
                  </div>
                  <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-3 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center">
                    <Sun className="h-5 w-5 mr-2" />
                    Sell Energy
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Transaction History</h3>
              <div className="space-y-4">
                {[
                  { type: 'buy', amount: '5.2 kWh', value: '0.78 SGE', time: '2 hours ago', status: 'completed' },
                  { type: 'sell', amount: '3.1 kWh', value: '0.47 SGE', time: '1 day ago', status: 'completed' },
                  { type: 'buy', amount: '10.0 kWh', value: '1.50 SGE', time: '3 days ago', status: 'completed' },
                ].map((tx, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 ${tx.type === 'buy' ? 'bg-green-400/20' : 'bg-yellow-400/20'} rounded-full flex items-center justify-center`}>
                        {tx.type === 'buy' ? <ArrowRight className="h-5 w-5 text-green-400" /> : <Sun className="h-5 w-5 text-yellow-400" />}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{tx.type === 'buy' ? 'Bought' : 'Sold'} {tx.amount}</p>
                        <p className="text-white/70 text-sm">{tx.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`${tx.type === 'buy' ? 'text-green-400' : 'text-yellow-400'} font-semibold`}>
                        {tx.type === 'buy' ? '+' : '-'}{tx.value}
                      </p>
                      <p className="text-white/70 text-sm capitalize">{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}