import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Don't expand if clicking on buttons
    if (e.target.tagName === 'BUTTON') return;
    setIsExpanded(!isExpanded);
  };

  const addToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      image_url: product.image_url,
      price_per_day: product.price_per_day,
      quantity: quantity,
      type: 'buy' // or 'rent' based on selection
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = existingCart.findIndex(item => item.id === product.id);

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Added to cart!');
    setIsExpanded(false);
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${
          isExpanded ? 'fixed inset-4 z-50 max-w-2xl mx-auto' : 'hover:shadow-lg'
        }`}
        onClick={handleCardClick}
      >
        <div className="relative">
          <img
            src={product.image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={product.title}
            className="w-full h-48 object-cover"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'; }}
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
            {product.owner_id ? 'Peer' : 'Business'}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-green-600 font-semibold">₹{product.price_per_day}/day</p>
              <p className="text-gray-500 text-sm">Buy: ₹{product.price_per_day * 30}</p>
              <p className="text-sm text-gray-600">Available: {product.quantity || 0} units</p>
            </div>
          </div>

          {!isExpanded && (
            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          )}

          {isExpanded && (
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Rent Options</h4>
                <div className="space-y-2">
                  <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Take this item for rent
                  </button>
                  <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                    Give this item for rent
                  </button>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Quantity</h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="px-3">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button className="flex-1 bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
                  Buy
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); if (product.quantity > 0) navigate(`/product/${product.id}`); else alert('Out of stock'); }}
                  className={`flex-1 py-2 rounded ${product.quantity > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                >
                  {product.quantity > 0 ? 'Rent' : 'Out of Stock'}
                </button>
                <button
                  onClick={addToCart}
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default ProductCard;