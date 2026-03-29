import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, DollarSign, Package, FileText, Type, Sparkles, ArrowRight } from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/footer';

const AddEquipment = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image_url: '',
        price: '',
        quantity: '',
        category: 'Construction',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/equipment', formData);
            alert('Equipment added successfully! 🚀');
        } catch (error) {
            console.error(error);
            alert('Failed to add equipment. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all outline-none";
    const labelClasses = "block text-sm font-bold text-white/40 mb-3 uppercase tracking-widest flex items-center gap-2";

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

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className={labelClasses}>
                                            <Type className="w-4 h-4" />
                                            Equipment Name
                                        </label>
                                        <input 
                                            name="name" 
                                            placeholder="e.g. Caterpillar 320 Excavator" 
                                            onChange={handleChange} 
                                            required 
                                            className={inputClasses}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClasses}>
                                            <Package className="w-4 h-4" />
                                            Category
                                        </label>
                                        <select 
                                            name="category" 
                                            onChange={handleChange} 
                                            className={inputClasses + " appearance-none"}
                                        >
                                            <option value="Construction" className="bg-gray-900">Construction</option>
                                            <option value="Tools" className="bg-gray-900">Hand Tools</option>
                                            <option value="Power" className="bg-gray-900">Power Tools</option>
                                            <option value="B2B" className="bg-gray-900">B2B Heavy Machinery</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClasses}>
                                                <DollarSign className="w-4 h-4" />
                                                Price / Day
                                            </label>
                                            <input 
                                                name="price" 
                                                type="number" 
                                                placeholder="0.00" 
                                                onChange={handleChange} 
                                                required 
                                                className={inputClasses}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>
                                                <Package className="w-4 h-4" />
                                                Quantity
                                            </label>
                                            <input 
                                                name="quantity" 
                                                type="number" 
                                                placeholder="1" 
                                                onChange={handleChange} 
                                                required 
                                                className={inputClasses}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className={labelClasses}>
                                            <Upload className="w-4 h-4" />
                                            Image URL
                                        </label>
                                        <input 
                                            name="image_url" 
                                            placeholder="https://..." 
                                            onChange={handleChange} 
                                            className={inputClasses}
                                        />
                                        {formData.image_url && (
                                            <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 h-32">
                                                <img 
                                                    src={formData.image_url} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => e.target.style.display = 'none'}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClasses}>
                                            <FileText className="w-4 h-4" />
                                            Description
                                        </label>
                                        <textarea 
                                            name="description" 
                                            placeholder="Describe features, condition, and terms..." 
                                            onChange={handleChange} 
                                            className={inputClasses + " h-40 resize-none"}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full group bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:hover:bg-primary-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-[0_10px_40px_rgba(139,92,246,0.4)] hover:-translate-y-1 active:scale-95"
                                >
                                    {isSubmitting ? 'Processing...' : 'List Equipment Now'}
                                    {!isSubmitting && <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
                                </button>
                                <p className="text-center text-white/20 text-xs mt-6 uppercase tracking-widest font-bold">
                                    By listing, you agree to our Rental Safety Protocols & Terms.
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddEquipment;
