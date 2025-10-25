import { Users, Sun } from "lucide-react";
import StatCard from "../components/StatCard";

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Our <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">Impact</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Transforming 's energy landscape through blockchain and renewable energy.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <StatCard value="15,000+" label="Homes Powered" description="Clean energy access" color="yellow" />
            <StatCard value="2.3M" label="kWh Generated" description="Renewable energy" color="green" />
            <StatCard value="850" label="Tons CO₂ Saved" description="Carbon offset" color="blue" />
            <StatCard value="25+" label="Countries" description="Across " color="purple" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Sarah Mwangi</h3>
                  <p className="text-white/70">Community Leader, Kenya</p>
                </div>
              </div>
              <p className="text-white/80 italic">
                "SunGrid  helped our village access clean energy for the first time. We can now power our school and clinic reliably."
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <Sun className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Ahmad Devs</h3>
                  <p className="text-white/70">Solar Farm Owner, Nigeria</p>
                </div>
              </div>
              <p className="text-white/80 italic">
                "Through SunGrid , I've been able to monetize my solar farm's excess energy. The platform has revolutionized my business."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
