import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative mt-20 pt-20 pb-10 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white mb-6 inline-block">
              RentBridge<span className="text-primary-500">.</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
              The premium marketplace for peer-to-peer and B2B equipment sharing. 
              Build anything, anywhere.
            </p>
            <div className="flex gap-4">
              {[FaGithub, FaTwitter, FaLinkedin, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, color: '#8b5cf6' }}
                  className="p-2.5 glass rounded-xl text-white/40 transition-colors border border-white/5 hover:border-primary-500/30"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Platform</h4>
            <ul className="space-y-4">
              {['Marketplace', 'Rent Out', 'B2B Bulk', 'Trust & Safety'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-bold flex items-center group">
                    {item}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Contact', 'Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-bold flex items-center group">
                    {item}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Stay Updated</h4>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary-600 hover:bg-primary-500 text-white px-4 rounded-xl text-xs font-black transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
            © 2024 RentBridge AI. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-white/10 text-[10px] font-black uppercase tracking-[0.3em]">
              Designed for the future
            </span>
          </div>
        </div>
      </div>

      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-primary-600/10 rounded-full blur-[120px]" />
      </div>
    </footer>
  );
};

export default Footer;
