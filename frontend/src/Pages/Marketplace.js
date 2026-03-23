import Navbar from "../components/layout/Navbar";
import ProductCard from "../components/marketplace/ProductCard";

const dummyProducts = [
  {
    id: 1,
    name: "Camera",
    price: 200,
    type: "peer",
    image:
      "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?w=500",
  },
];

function Marketplace() {
  return (
    <>
      <Navbar />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}

export default Marketplace;