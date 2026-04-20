import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";
import ProductCard from "../components/marketplace/ProductCard";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    API.get("/equipment").then(res => setProducts(res.data));
  }, []);

  const filtered = products.filter(p =>
    (p.title?.toLowerCase() || "").includes(search.toLowerCase()) &&
    (selectedCategory === "" || p.category === selectedCategory)
  );

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      
      <main className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 pt-32"
        >
          <h1 className="text-4xl font-black tracking-tight">Marketplace</h1>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary-400 transition-colors" />
              <input
                type="text"
                placeholder="Search equipment..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
              />
            </div>
            <button className="p-3.5 glass rounded-2xl border border-white/10 hover:border-primary-500/30 transition-all">
              <SlidersHorizontal className="w-6 h-6 text-white/70" />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {filtered.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Marketplace;
