import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Tag, Star } from "lucide-react";

function ProductCard({ product }) {
  const rating = product.avg_rating || 0;
  const totalReviews = product.total_reviews || 0;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative glass-dark rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all duration-500 shadow-2xl"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image_url || "https://images.unsplash.com/photo-1581094288338-2314dddb7ede?auto=format&fit=crop&q=80&w=800"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 glass backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-widest rounded-full">
            {product.category}
          </span>
        </div>

        {/* Rating Badge */}
        {rating > 0 && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 glass backdrop-blur-md border border-white/10 rounded-full">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-white">{rating.toFixed(1)}</span>
            <span className="text-xs text-white/60">({totalReviews})</span>
          </div>
        )}
      </div>

      <div className="p-8">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-primary-400 transition-colors">
          {product.title}
        </h3>
        
        <p className="text-white/40 text-sm mb-6 line-clamp-2 font-medium leading-relaxed italic">
          {product.description || "Premium equipment maintained to the highest standards."}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-black text-white">₹{product.price_per_day}</span>
            <span className="text-white/30 text-xs font-bold uppercase ml-1 tracking-tighter">/ day</span>
          </div>
          
          <Link to={`/product/${product.id}`}>
            <motion.button
              whileHover={{ x: 5 }}
              className="p-3 bg-primary-600 hover:bg-primary-500 rounded-xl text-white shadow-lg shadow-primary-500/20 transition-all group/btn"
            >
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Decorative hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-primary-500/20 to-indigo-500/20 rounded-[2rem] blur-md" />
      </div>
    </motion.div>
  );
}

export default ProductCard;
