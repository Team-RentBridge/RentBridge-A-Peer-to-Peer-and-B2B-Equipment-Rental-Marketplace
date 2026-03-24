import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">RentBridge</h2>
            <p className="text-sm text-gray-400">© 2024 RentBridge. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;