import { useEffect, useState, useRef } from "react";
import API from "../api/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";
import ProductCard from "../components/marketplace/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // Sorting & Pagination State
  const [sortOption, setSortOption] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const sortRef = useRef(null);

  useEffect(() => {
    API.get("/equipment").then(res => setProducts(res.data));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sortRef]);

  // 1. Filter
  let processed = products.filter(p =>
    (p.title?.toLowerCase() || "").includes(search.toLowerCase()) &&
    (selectedCategory === "" || p.category === selectedCategory)
  );

  // 2. Sort
  if (sortOption === "price_asc") {
    processed.sort((a, b) => parseFloat(a.price_per_day) - parseFloat(b.price_per_day));
  } else if (sortOption === "price_desc") {
    processed.sort((a, b) => parseFloat(b.price_per_day) - parseFloat(a.price_per_day));
  } else if (sortOption === "name_asc") {
    processed.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "name_desc") {
    processed.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortOption === "qty_asc") {
    processed.sort((a, b) => a.quantity - b.quantity);
  } else if (sortOption === "qty_desc") {
    processed.sort((a, b) => b.quantity - a.quantity);
  }

  // 3. Paginate
  const totalPages = Math.max(1, Math.ceil(processed.length / itemsPerPage));
  const paginatedData = processed.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortOption, selectedCategory]);

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
          
          <div className="flex gap-4 w-full md:w-auto relative">
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
            
            {/* Sort Dropdown Component */}
            <div className="relative" ref={sortRef}>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`p-3.5 glass rounded-2xl border transition-all ${isSortOpen ? 'border-primary-500 bg-primary-500/10' : 'border-white/10 hover:border-primary-500/30'}`}
              >
                <SlidersHorizontal className={`w-6 h-6 transition-colors ${isSortOpen ? 'text-primary-400' : 'text-white/70'}`} />
              </button>
              
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-56 glass-dark border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl"
                  >
                    <div className="p-2 space-y-1">
                      <p className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white/30">Sort Options</p>
                      {[
                        { label: "Default", value: "" },
                        { label: "Name (A-Z)", value: "name_asc" },
                        { label: "Name (Z-A)", value: "name_desc" },
                        { label: "Price (Low to High)", value: "price_asc" },
                        { label: "Price (High to Low)", value: "price_desc" },
                        { label: "Quantity (Highest)", value: "qty_desc" },
                        { label: "Quantity (Lowest)", value: "qty_asc" }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => { setSortOption(option.value); setIsSortOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${sortOption === option.value ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16 min-h-[500px]">
          {paginatedData.map((product, idx) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
          
          {paginatedData.length === 0 && (
            <div className="col-span-full py-32 text-center">
              <div className="text-white/20 font-black text-2xl mb-2">No equipment found</div>
              <p className="text-white/40">Try adjusting your search or filter settings.</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center gap-2 mb-20 p-2 glass rounded-2xl border border-white/5 inline-flex mx-auto"
          >
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <div className="flex gap-1 px-4">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                // Show first, last, current, and +-1 pages (Ellipsis logic)
                if (
                  pageNum === 1 || 
                  pageNum === totalPages || 
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${currentPage === pageNum ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 2 || 
                  pageNum === currentPage + 2
                ) {
                  return <span key={pageNum} className="w-10 h-10 flex items-center justify-center text-white/30 font-black tracking-widest">...</span>;
                }
                return null;
              })}
            </div>
            
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Marketplace;
