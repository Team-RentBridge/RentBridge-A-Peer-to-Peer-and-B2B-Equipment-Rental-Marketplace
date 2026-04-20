import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Upload, DollarSign, Package, FileText, Type, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../api/api';

const AddEquipmentForm = ({ onSuccess }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        price_per_day: '',
        penalty_per_day: '',
        quantity: '',
        category: 'Construction',
        available_from: '',
        available_to: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!user) {
            navigate('/login');
            return;
        }

        setIsSubmitting(true);
        try {
            await API.post('/equipment/add', {
                ...formData,
                price_per_day: parseFloat(formData.price_per_day),
                penalty_per_day: parseFloat(formData.penalty_per_day) || 0,
                quantity: parseInt(formData.quantity) || 1,
            });
            setSuccess('Equipment listed successfully! 🚀');
            if (onSuccess) {
                setTimeout(onSuccess, 1500);
            } else {
                setTimeout(() => navigate('/dashboard'), 1500);
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.response?.data?.error || 'Failed to add equipment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all outline-none";
    const labelClasses = "block text-sm font-bold text-white/40 mb-3 uppercase tracking-widest flex items-center gap-2";

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
                <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl px-6 py-4">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}
            {success && (
                <div className="mb-6 flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl px-6 py-4">
                    <span className="text-sm font-bold">{success}</span>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    <div>
                        <label className={labelClasses}>
                            <Type className="w-4 h-4" />
                            Equipment Name
                        </label>
                        <input
                            name="title"
                            value={formData.title}
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
                            value={formData.category}
                            onChange={handleChange}
                            className={inputClasses + " appearance-none"}
                        >
                            <option value="Construction" className="bg-gray-900">Construction</option>
                            <option value="Tools" className="bg-gray-900">Hand Tools</option>
                            <option value="Power" className="bg-gray-900">Power Tools</option>
                            <option value="Electronics" className="bg-gray-900">Electronics</option>
                            <option value="Outdoor" className="bg-gray-900">Outdoor</option>
                            <option value="Bikes" className="bg-gray-900">Bikes</option>
                            <option value="Water Sports" className="bg-gray-900">Water Sports</option>
                            <option value="B2B" className="bg-gray-900">B2B Heavy Machinery</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClasses}>
                                <DollarSign className="w-4 h-4" />
                                Price / Day (₹)
                            </label>
                            <input
                                name="price_per_day"
                                type="number"
                                min="1"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.price_per_day}
                                onChange={handleChange}
                                required
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>
                                <AlertCircle className="w-4 h-4" />
                                Late Penalty (₹)
                            </label>
                            <input
                                name="penalty_per_day"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.penalty_per_day}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClasses}>
                            <Package className="w-4 h-4" />
                            Quantity
                        </label>
                        <input
                            name="quantity"
                            type="number"
                            min="1"
                            placeholder="1"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            className={inputClasses}
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div>
                        <label className={labelClasses}>
                            <Upload className="w-4 h-4" />
                            Image URL
                        </label>
                        <input
                            name="image_url"
                            value={formData.image_url}
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
                            value={formData.description}
                            placeholder="Describe features, condition, and terms..."
                            onChange={handleChange}
                            className={inputClasses + " h-32 resize-none"}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClasses}>Available From</label>
                            <input
                                name="available_from"
                                type="date"
                                value={formData.available_from}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Available To</label>
                            <input
                                name="available_to"
                                type="date"
                                value={formData.available_to}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>
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
    );
};

export default AddEquipmentForm;
