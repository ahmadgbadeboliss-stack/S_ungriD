import { Sun, Mail, MessageCircle, Phone } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            About <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">SunGrid </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Pioneering 's renewable energy revolution through blockchain technology.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-white/80 mb-6">
                To democratize access to clean energy across  by creating a transparent, efficient, and sustainable marketplace powered by Hedera blockchain technology.
              </p>
              <p className="text-lg text-white/80 mb-8">
                We believe every n should have access to reliable, clean energy, and we're building the infrastructure to make that vision a reality.
              </p>
            </div>
            <div>
              <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl p-8 border border-yellow-400/30">
                <Sun className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Vision 2030</h3>
                <p className="text-white/80 text-center">Power 1 million n homes with clean, renewable energy by 2030.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400/10 to-orange-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-xl text-white/90 mb-12">Ready to join 's clean energy revolution?</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <Mail className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-white/80 mb-4">oluwabusayomi103@gmail.com</p>
              <a href="mailto:oluwabusayomi103@gmail.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">Send Message →</a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <MessageCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Telegram</h3>
              <p className="text-white/80 mb-4">@JustWhis</p>
              <a href="https://t.me/JustWhis" className="text-green-400 hover:text-green-300 transition-colors">Start Chat →</a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <Phone className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-white/80 mb-4">+234 707 294 0022</p>
              <a href="https://wa.me/2347072940022" className="text-blue-400 hover:text-blue-300 transition-colors">Call Now →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}