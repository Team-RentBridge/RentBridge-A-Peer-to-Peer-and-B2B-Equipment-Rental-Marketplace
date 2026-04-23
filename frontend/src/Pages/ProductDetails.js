import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Calendar, ShieldCheck, Zap, ArrowLeft, ShoppingCart, CreditCard, Star } from "lucide-react";
import API from "../api/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";
import ReviewForm from "../components/dashboard/ReviewForm";
import ReviewsDisplay from "../components/dashboard/ReviewsDisplay";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [ownerRating, setOwnerRating] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    API.get(`/equipment/${id}`)
      .then((res) => {
        setProduct(res.data);
        // Fetch owner rating
        if (res.data.owner_id) {
          API.get(`/reviews/owner/${res.data.owner_id}`)
            .then(ratingRes => setOwnerRating(ratingRes.data))
            .catch(err => console.error("Failed to load owner rating:", err));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = async () => {
    if (!user) return navigate("/login");
    if (!product.is_for_sale && (!startDate || !endDate)) return alert("Please select dates");

    setBookingLoading(true);
    try {
      // For purchases, we use today's date to satisfy the bookings table NOT NULL constraint
      const today = new Date().toISOString().split('T')[0];
      await API.post("/bookings/create", {
        equipment_id: id,
        start_date: product.is_for_sale ? today : startDate,
        end_date: product.is_for_sale ? today : endDate,
        quantity: quantity,
      });
      alert(product.is_for_sale ? "Purchase Successful! Check your Dashboard." : "Booking Successful! Check your Dashboard.");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || (product.is_for_sale ? "Purchase failed" : "Booking failed"));
    } finally {
      setBookingLoading(false);
    }
  };

  const addToCart = () => {
    if (!user) return navigate("/login");
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Added to cart! 🛒");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!product) return <div className="min-h-screen flex items-center justify-center text-white/40">Product not found</div>;

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Marketplace
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Product Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
          >
            <div className="glass-dark rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
              <img
                src={product.image_url || "https://images.unsplash.com/photo-1581094288338-2314dddb7ede?auto=format&fit=crop&q=80&w=1200"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            {/* Badges Overlay */}
            <div className="absolute top-8 left-8 flex gap-3">
              <span className="px-4 py-2 glass backdrop-blur-md border border-white/10 text-xs font-black uppercase tracking-widest rounded-full">
                {product.category}
              </span>
              <span className="px-4 py-2 bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Verified Owner
              </span>
            </div>
          </motion.div>

          {/* Product Info & Booking Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <h1 className="text-5xl font-black tracking-tight mb-6 leading-tight">
                {product.title}
              </h1>
              <p className="text-xl text-white/40 leading-relaxed font-medium italic">
                {product.description || "Premium equipment maintained to the highest industry standards. Perfect for high-demand projects."}
              </p>

              {/* Owner Rating */}
              {ownerRating && (
                <div className="mt-6 flex items-center gap-4 p-4 glass-dark rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(ownerRating.avg_rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-white/70">
                    <span className="font-bold text-white">{ownerRating.avg_rating > 0 ? ownerRating.avg_rating.toFixed(1) : 'New'}</span>
                    <span> · {ownerRating.total_reviews} {ownerRating.total_reviews === 1 ? 'rating' : 'ratings'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Price & Penalty Display */}
            <div className={`grid ${product.is_for_sale ? 'grid-cols-1' : 'grid-cols-2'} gap-8 p-8 glass-dark rounded-[2.5rem] border border-white/5`}>
              <div>
                <span className="block text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-2">
                  {product.is_for_sale ? 'Sale Price' : 'Daily Rate'}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">₹{product.is_for_sale ? product.buy_price : product.price_per_day}</span>
                  {!product.is_for_sale && <span className="text-white/40 text-sm font-bold uppercase">/ day</span>}
                </div>
              </div>
              {!product.is_for_sale && (
                <div>
                  <span className="block text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-2">Late Penalty</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-red-400">₹{product.penalty_per_day || '1000'}</span>
                    <span className="text-white/40 text-sm font-bold uppercase">/ day</span>
                  </div>
                </div>
              )}
            </div>

            {/* Booking Form */}
            <div className="glass-dark rounded-[2.5rem] p-10 border border-white/10 space-y-8 relative overflow-hidden">
              <div className="flex items-center gap-3 text-primary-400 font-black uppercase tracking-widest text-xs mb-4">
                {product.is_for_sale ? (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Purchase Details
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    Rental Period
                  </>
                )}
              </div>

              {!product.is_for_sale && (
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 ml-1 uppercase tracking-wider">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all appearance-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 ml-1 uppercase tracking-wider">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all appearance-none"
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2 mt-4">
                  <label className="text-xs font-bold text-white/40 ml-1 uppercase tracking-wider">Quantity (Available: {product.quantity})</label>
                  <input
                    type="number"
                    min="1"
                    max={product.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all appearance-none"
                  />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className={`flex-1 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 disabled:opacity-50 ${product.is_for_sale ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20' : 'bg-primary-600 hover:bg-primary-500 shadow-primary-500/20'}`}
                >
                  <CreditCard className="w-6 h-6" />
                  {bookingLoading ? "Processing..." : (product.is_for_sale ? "Buy Now" : "Rent Now")}
                </button>
                <button
                  onClick={addToCart}
                  className="glass border border-white/10 hover:bg-white/10 text-white py-5 px-8 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </button>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>

        {/* Rating & Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid lg:grid-cols-3 gap-12"
        >
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black text-white mb-8">Customer Reviews</h2>
            <ReviewsDisplay equipment_id={id} user={user} />
          </div>

          <div>
            {user && user.role !== 'admin' && (
              <>
                <h2 className="text-2xl font-black text-white mb-6">Leave a Review</h2>
                <ReviewForm equipment_id={id} onSubmitSuccess={() => window.location.reload()} />
              </>
            )}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetails;
