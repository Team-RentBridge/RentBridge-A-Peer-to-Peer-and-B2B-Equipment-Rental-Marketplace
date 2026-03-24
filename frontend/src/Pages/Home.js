import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">RentBridge</h1>
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Rent, Buy, or Sell Anything, Anytime
          </h1>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Now
          </button>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RentBridge?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold mb-2">Peer-to-Peer Rentals</h3>
              <p className="text-gray-600">Rent directly from individuals in your community</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="font-semibold mb-2">Verified Business Listings</h3>
              <p className="text-gray-600">Trusted businesses with guaranteed quality</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-semibold mb-2">Flexible Rent Periods</h3>
              <p className="text-gray-600">Choose rental durations that fit your needs</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold mb-2">Secure Payments & Tracking</h3>
              <p className="text-gray-600">Safe transactions with real-time status updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Easy Renting</h3>
              <p className="text-gray-600 mb-4">
                Rent anything from peers or businesses with just a few clicks. Browse categories, select dates, and confirm your rental.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Quick search and filter options</li>
                <li>• Real-time availability checking</li>
                <li>• Instant booking confirmation</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Fast Buying/Selling</h3>
              <p className="text-gray-600 mb-4">
                Just like any e-commerce marketplace. List your items for sale or purchase what you need instantly.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Simple listing process</li>
                <li>• Secure payment processing</li>
                <li>• Buyer and seller protection</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Smart Calendars & Pricing</h3>
              <p className="text-gray-600 mb-4">
                Auto-calculated rent based on your selected dates. See pricing instantly as you choose your rental period.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Dynamic price calculation</li>
                <li>• Calendar integration</li>
                <li>• Transparent pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">About RentBridge</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            RentBridge is your go-to platform for peer-to-peer and business-to-business equipment rentals.
            Whether you're a student looking for affordable study materials, a professional needing tools for a project,
            or a business seeking reliable equipment, RentBridge connects you with the right items at the right time.
            We're committed to making renting easy, affordable, and flexible for everyone.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign up now to start renting
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;