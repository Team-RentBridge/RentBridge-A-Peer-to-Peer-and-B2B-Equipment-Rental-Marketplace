import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, CreditCard } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price_per_day * item.quantity), 0);
  };

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      
      <main className="container mx-auto px-6">
        <header className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight flex items-center gap-4"
          >
            <ShoppingBag className="text-primary-500 w-10 h-10" />
            Your Rental Cart
          </motion.h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-12 items-start mb-20">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-dark p-6 rounded-[2rem] border border-white/5 flex items-center gap-6 group"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
                    <img 
                      src={item.image_url || "https://images.unsplash.com/photo-1581094288338-2314dddb7ede?auto=format&fit=crop&q=80&w=200"} 
                      className="w-full h-full object-cover" 
                      alt={item.title} 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">{item.title}</h3>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{item.category}</p>
                  </div>

                  <div className="flex items-center gap-4 bg-white/5 rounded-xl p-1 border border-white/10">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-black">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <div className="text-xl font-black text-white">₹{item.price_per_day * item.quantity}</div>
                    <div className="text-white/30 text-[10px] font-bold uppercase">Total</div>
                  </div>

                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-white/20 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {cartItems.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 glass-dark rounded-[3rem] border border-dashed border-white/10"
              >
                <ShoppingBag className="w-16 h-16 text-white/10 mx-auto mb-6" />
                <p className="text-white/40 font-medium italic text-lg">Your cart is empty. Start exploring the marketplace!</p>
                <button 
                  onClick={() => navigate('/marketplace')}
                  className="mt-8 bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-xl font-bold transition-all"
                >
                  Browse Marketplace
                </button>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark p-10 rounded-[2.5rem] border border-white/10 sticky top-32"
          >
            <h2 className="text-2xl font-black mb-8 tracking-tight">Order Summary</h2>
            
            <div className="space-y-4 mb-8 pb-8 border-b border-white/5">
              <div className="flex justify-between text-white/40 font-medium">
                <span>Subtotal</span>
                <span>₹{getTotalAmount()}</span>
              </div>
              <div className="flex justify-between text-white/40 font-medium">
                <span>Platform Fee</span>
                <span>₹99</span>
              </div>
              <div className="flex justify-between text-white/40 font-medium">
                <span>Security Deposit</span>
                <span>₹1000</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-10">
              <div className="text-xs font-black text-white/30 uppercase tracking-widest">Total Amount</div>
              <div className="text-4xl font-black text-white">₹{getTotalAmount() + 1099}</div>
            </div>

            <button
              disabled={cartItems.length === 0}
              className="w-full bg-primary-600 hover:bg-primary-500 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary-500/20 active:scale-95 disabled:opacity-50"
            >
              <CreditCard className="w-6 h-6" />
              Checkout Now
            </button>
            
            <p className="text-center text-[10px] text-white/20 font-black uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
              <Trash2 className="w-3 h-3" />
              Secure Encrypted Payment
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
