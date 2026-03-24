import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/marketplace/ProductCard";

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    API.get("/equipment").then(res => setProducts(res.data));
  }, []);

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategory === "" || p.category === selectedCategory)
  );

  const categories = ["Electronics", "Books", "Furniture", "Bikes", "Daily Needs"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showSearch={true} searchValue={search} onSearchChange={setSearch} />

      <div className="container mx-auto px-4 py-6">
        {/* Location */}
        <div className="mb-4">
          <p className="text-gray-600">📍 Mathura, Uttar Pradesh</p>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-lg ${selectedCategory === "" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg ${selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Marketplace;