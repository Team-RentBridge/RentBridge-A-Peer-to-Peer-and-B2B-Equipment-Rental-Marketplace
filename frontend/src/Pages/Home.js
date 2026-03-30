import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, Zap, Sparkles,
  Users, Star, Clock, Truck, BadgeCheck, Headphones,
  TrendingUp, Globe, Lock, BarChart3, CheckCircle2,
  ChevronRight
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/footer';

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ tag, title, sub }) => (
  <div className="text-center mb-16">
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary-500/30 text-primary-400 text-[10px] font-black tracking-[0.3em] uppercase mb-5">
      {tag}
    </span>
    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-5 leading-tight">
      {title}
    </h2>
    <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
      {sub}
    </p>
  </div>
);

const FEATURES = [
  {
    title: 'Peer-to-Peer Rentals',
    desc: 'Rent tools and equipment directly from verified locals in your community — no middlemen, better rates.',
    icon: Users,
    color: 'text-primary-400',
    bg: 'from-primary-500/20 to-purple-500/10',
  },
  {
    title: 'Secure Escrow Payments',
    desc: 'Funds are held safely in escrow and released only after you confirm successful delivery.',
    icon: ShieldCheck,
    color: 'text-green-400',
    bg: 'from-green-500/20 to-emerald-500/10',
  },
  {
    title: 'B2B Heavy Machinery',
    desc: 'Access cranes, excavators, and construction equipment for large-scale industrial projects.',
    icon: Truck,
    color: 'text-indigo-400',
    bg: 'from-indigo-500/20 to-blue-500/10',
  },
  {
    title: 'Instant Availability',
    desc: "Real-time inventory updates mean no booking conflicts. See what's available right now.",
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'from-yellow-500/20 to-orange-500/10',
  },
  {
    title: 'Verified Listings',
    desc: 'Every listing is reviewed and verified. Detailed specs, photos, and condition reports included.',
    icon: BadgeCheck,
    color: 'text-sky-400',
    bg: 'from-sky-500/20 to-cyan-500/10',
  },
  {
    title: '24/7 Support',
    desc: 'Our dedicated support team is available around the clock to resolve any rental issues instantly.',
    icon: Headphones,
    color: 'text-pink-400',
    bg: 'from-pink-500/20 to-rose-500/10',
  },
  {
    title: 'Analytics Dashboard',
    desc: 'Track your rentals, earnings, and equipment performance with powerful real-time analytics.',
    icon: BarChart3,
    color: 'text-violet-400',
    bg: 'from-violet-500/20 to-purple-500/10',
  },
  {
    title: 'Global Network',
    desc: 'Connect with renters and owners across cities and states through our expanding national network.',
    icon: Globe,
    color: 'text-teal-400',
    bg: 'from-teal-500/20 to-cyan-500/10',
  },
  {
    title: 'Smart Pricing',
    desc: 'AI-powered pricing suggestions help owners maximise earnings while keeping rentals competitive.',
    icon: TrendingUp,
    color: 'text-orange-400',
    bg: 'from-orange-500/20 to-amber-500/10',
  },
];

const WHY_US = [
  {
    title: 'Zero Hidden Fees',
    desc: 'Transparent pricing — what you see is exactly what you pay. No surprise charges ever.',
    icon: Lock,
  },
  {
    title: 'Trusted by Thousands',
    desc: 'Over 15,000 successful rentals completed with a 4.9-star average rating across all listings.',
    icon: Star,
  },
  {
    title: 'Lightning-Fast Booking',
    desc: 'Book equipment in under 2 minutes. Digital contracts, instant confirmations, no paperwork.',
    icon: Clock,
  },
  {
    title: 'Damage Protection',
    desc: 'Built-in damage coverage on every rental gives both owners and renters complete peace of mind.',
    icon: ShieldCheck,
  },
  {
    title: 'Fully Verified Users',
    desc: 'ID verification and review system ensures you always deal with trustworthy parties.',
    icon: CheckCircle2,
  },
  {
    title: 'Flexible Durations',
    desc: 'Hourly, daily, weekly or monthly — rent on your schedule, not ours.',
    icon: TrendingUp,
  },
];

const STATS = [
  { value: '15K+', label: 'Rentals Completed' },
  { value: '8K+', label: 'Verified Listings' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '120+', label: 'Cities Covered' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Browse & Discover',
    desc: 'Search our curated marketplace for any equipment — from power tools to heavy machinery.',
  },
  {
    step: '02',
    title: 'Book Instantly',
    desc: 'Choose your rental dates, sign the digital agreement, and pay securely through escrow.',
  },
  {
    step: '03',
    title: 'Get It Delivered',
    desc: "Equipment is delivered to your site or picked up at the owner's location — hassle-free.",
  },
  {
    step: '04',
    title: 'Return & Review',
    desc: 'Return on time, release payment from escrow, and leave a review to build community trust.',
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white relative">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
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
              The world's first premium marketplace for elite equipment sharing.{' '}
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

        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] right-[5%] w-64 h-64 glass-dark rounded-[3rem] border border-white/10 -z-10 opacity-20 hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[20%] left-[5%] w-48 h-48 glass-dark rounded-full border border-white/10 -z-10 opacity-10 hidden lg:block"
        />
      </section>

      {/* ── Stats Bar ────────────────────────────────── */}
      <section className="py-10 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-black gradient-text mb-2">{s.value}</p>
                  <p className="text-white/40 text-sm font-semibold tracking-widest uppercase">{s.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ────────────────────────────── */}
      <section className="py-28 relative z-10">
        <div className="container mx-auto px-6">
          <FadeUp>
            <SectionHeader
              tag="⚡ Platform Features"
              title={<>Everything you need,{' '}<span className="gradient-text">nothing you don't.</span></>}
              sub="RentBridge combines the power of community, technology, and trust to create the smartest equipment rental experience on the market."
            />
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-dark p-8 rounded-[2rem] border border-white/5 hover:border-primary-500/25 transition-all group cursor-default"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${f.color}`}>
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h3>
                <p className="text-white/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section className="py-28 relative z-10">
        <div className="container mx-auto px-6">
          <FadeUp>
            <SectionHeader
              tag="🚀 How It Works"
              title={<>Up and running{' '}<span className="gradient-text">in minutes.</span></>}
              sub="Four simple steps separate you from the equipment you need. No lengthy forms, no waiting rooms."
            />
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent z-0" />

            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative z-10 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary-600/20 border border-primary-500/40 flex items-center justify-center mx-auto mb-6 text-primary-400 font-black text-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/40 leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ───────────────────────────────────── */}
      <section className="py-28 relative z-10">
        <div className="container mx-auto px-6">
          <FadeUp>
            <SectionHeader
              tag="💎 Why RentBridge"
              title={<>The smarter way{' '}<span className="gradient-text">to rent equipment.</span></>}
              sub="We didn't just build another rental platform — we rebuilt the entire experience from the ground up with safety, speed and simplicity at its core."
            />
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {WHY_US.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="glass-dark p-8 rounded-[2rem] border border-white/5 hover:border-primary-500/25 transition-all group flex gap-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/15 flex items-center justify-center shrink-0 text-primary-400 group-hover:scale-110 transition-transform">
                  <w.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{w.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ──────────────────────────────── */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-dark rounded-[2.5rem] border border-white/5 p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-indigo-500/10 rounded-[2.5rem] pointer-events-none" />

            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <blockquote className="text-2xl md:text-3xl font-semibold text-white/80 italic max-w-3xl mx-auto leading-relaxed mb-8">
              "RentBridge saved us ₹4.2 lakhs on equipment costs in our last construction project. The escrow system gave us complete confidence to deal with strangers."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-indigo-500 flex items-center justify-center font-black text-white text-lg">
                R
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Rajesh Mehta</p>
                <p className="text-white/40 text-sm">Site Engineer, BuildCore Pvt. Ltd.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────── */}
      <section className="py-28 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(79,70,229,0.15) 50%, rgba(139,92,246,0.1) 100%)',
              border: '1px solid rgba(139,92,246,0.3)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-indigo-500/5" />
            <div className="relative z-10 px-10 py-20 md:py-28 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-6xl mb-6"
              >
                🚀
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-tight">
                Ready to Transform<br />
                <span className="gradient-text">How You Work?</span>
              </h2>
              <p className="text-white/50 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
                Join thousands of businesses and individuals who trust RentBridge for all their equipment needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <button
                  onClick={() => navigate('/register')}
                  className="group bg-primary-600 hover:bg-primary-500 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-[0_20px_50px_rgba(139,92,246,0.4)] hover:-translate-y-1 active:scale-95"
                >
                  Start Renting Today
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="glass border border-white/15 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all hover:-translate-y-1 active:scale-95"
                >
                  List Your Equipment
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
