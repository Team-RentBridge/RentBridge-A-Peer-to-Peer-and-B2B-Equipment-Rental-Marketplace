import React, { useState } from 'react';
import './App.css';

// --- MOCK DATA WITH IMAGES ---
const mockEquipment = [
  { 
    id: 1, 
    name: 'Heavy Duty Excavator', 
    category: 'B2B', 
    pricePerDay: 5000, 
    type: 'Machinery',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 2, 
    name: 'Bosch Power Drill', 
    category: 'B2C', 
    pricePerDay: 200, 
    type: 'Tools',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 3, 
    name: 'Sony A7III Camera', 
    category: 'B2C', 
    pricePerDay: 1500, 
    type: 'Electronics',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 4, 
    name: 'Industrial Concrete Mixer', 
    category: 'B2B', 
    pricePerDay: 2500, 
    type: 'Machinery',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 5, 
    name: 'DJI Mavic Drone Pro', 
    category: 'B2C', 
    pricePerDay: 1200, 
    type: 'Electronics',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=400&q=80'
  },
];

const ProductCard = ({ item }) => (
  <div className="product-card">
    <img src={item.image} alt={item.name} className="product-image" />
    
    <div className="card-header">
      <h3 className="product-name">{item.name}</h3>
      <span className={`badge ${item.category.toLowerCase()}`}>
        {item.category}
      </span>
    </div>
    
    <p className="product-details">Equipment Type: {item.type}</p>
    
    <div className="price-container">
      <div className="price">
        ₹{item.pricePerDay} <span>/ day</span>
      </div>
      <button className="book-btn">Book Now</button>
    </div>
  </div>
);

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = mockEquipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">RentBridge</h1>
        <p className="subtitle">Peer-to-Peer & B2B Equipment Rentals</p>
      </header>

      <div className="controls-container">
        <input 
          type="text" 
          placeholder="Search for tools, electronics, or machinery..." 
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select 
          className="category-select"
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="B2C">B2C (Common Users)</option>
          <option value="B2B">B2B (Heavy Machinery)</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <ProductCard key={item.id} item={item} />
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%', color: '#94a3b8' }}>
            No equipment found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;