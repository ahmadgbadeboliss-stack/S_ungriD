import { Search, Shield, Sun, Star, CheckCircle, MapPin } from "lucide-react";
import { useState } from "react";

export default function MarketplacePage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const listings = [
    { id: 1, seller: '0.0.123456', amount: '50 kWh', price: '0.15', location: 'Lagos, Nigeria', rating: 4.8, verified: true },
    { id: 2, seller: '0.0.234567', amount: '100 kWh', price: '0.14', location: 'Nairobi, Kenya', rating: 4.9, verified: true },
    { id: 3, seller: '0.0.345678', amount: '75 kWh', price: '0.16', location: 'Cape Town, SA', rating: 4.7, verified: true },
    { id: 4, seller: '0.0.456789', amount: '200 kWh', price: '0.13', location: 'Accra, Ghana', rating: 4.6, verified: false },
    { id: 5, seller: '0.0.567890', amount: '150 kWh', price: '0.15', location: 'Cairo, Egypt', rating: 4.8, verified: true },
    { id: 6, seller: '0.0.678901', amount: '90 kWh', price: '0.14', location: 'Addis Ababa, Ethiopia', rating: 4.9, verified: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Energy <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Marketplace</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Buy and sell solar energy from verified producers across 
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search by location or seller..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${filter === 'all' ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('verified')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center ${filter === 'verified' ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Verified
                </button>
              </div>
            </div>
          </div>

          {/* Listings */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map(listing => (
              <div key={listing.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Sun className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{listing.seller}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-yellow-400 text-xs">{listing.rating}</span>
                      </div>
                    </div>
                  </div>
                  {listing.verified && (
                    <div className="bg-green-400/20 px-2 py-1 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Amount</span>
                    <span className="text-white font-bold text-lg">{listing.amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Price</span>
                    <span className="text-green-400 font-bold text-lg">{listing.price} SGE/kWh</span>
                  </div>
                  <div className="flex items-center text-white/70 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {listing.location}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-3 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105">
                  Buy Energy
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}