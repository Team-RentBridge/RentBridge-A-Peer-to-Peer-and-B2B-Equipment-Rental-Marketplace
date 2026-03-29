import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/footer';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white relative">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/30 text-primary-400 text-[10px] font-black mb-8 tracking-[0.3em] uppercase"
            >
              <Zap className="w-3 h-3 fill-primary-400" />
              The Future of Equipment Rental
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85]"
            >
              Rent Anything. <br />
              <span className="gradient-text drop-shadow-[0_0_50px_rgba(139,92,246,0.3)]">Build Everything.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/40 mb-12 font-medium leading-relaxed max-w-2xl mx-auto italic"
            >
              The world's first premium marketplace for elite equipment sharing. 
              Secure, seamless, and powered by trust.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <button
                onClick={() => navigate('/marketplace')}
                className="group bg-primary-600 hover:bg-primary-500 text-white px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all shadow-[0_20px_50px_rgba(139,92,246,0.3)] hover:-translate-y-1 active:scale-95"
              >
                Explore Fleet
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/register')}
                className="glass border border-white/10 hover:bg-white/10 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
              >
                Get Started
                <Sparkles className="w-5 h-5 text-primary-400" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[5%] w-64 h-64 glass-dark rounded-[3rem] border border-white/10 -z-10 opacity-20 hidden lg:block"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] left-[5%] w-48 h-48 glass-dark rounded-full border border-white/10 -z-10 opacity-10 hidden lg:block"
        />
      </section>

      {/* Features Grid */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Peer-to-Peer', 
                desc: 'Rent tools directly from verified locals in your community.',
                icon: Zap,
                color: 'text-primary-400'
              },
              { 
                title: 'Secure Escrow', 
                desc: 'Payments are held safely until you confirm delivery.',
                icon: ShieldCheck,
                color: 'text-green-400'
              },
              { 
                title: 'B2B Machinery', 
                desc: 'Access heavy construction equipment for large projects.',
                icon: Sparkles,
                color: 'text-indigo-400'
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-dark p-10 rounded-[2.5rem] border border-white/5 hover:border-primary-500/30 transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
