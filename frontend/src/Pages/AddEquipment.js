import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/footer';
import AddEquipmentForm from '../components/dashboard/AddEquipmentForm';

const AddEquipment = () => {
    return (
        <div className="min-h-screen text-white relative">
            <Navbar />
            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/30 text-primary-400 text-xs font-bold mb-6 tracking-widest uppercase">
                            <Sparkles className="w-3 h-3 fill-primary-400" />
                            List Your Gear
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
                            Rent Out Your <br />
                            <span className="gradient-text">Equipment</span>
                        </h1>
                        <p className="text-xl text-white/40 font-medium">
                            Turn your idle assets into a steady stream of passive income.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-dark rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 blur-[100px] -z-10" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -z-10" />
                        
                        <AddEquipmentForm />
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddEquipment;
