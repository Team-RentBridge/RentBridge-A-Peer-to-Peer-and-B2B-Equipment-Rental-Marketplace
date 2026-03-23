import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🌐 GLOBAL CSS (important for calendar)
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// 📄 PAGES
import Home from "./Pages/Home";
import Marketplace from "./Pages/Marketplace";
import ProductDetails from "./Pages/ProductDetails";
import Profile from "./Pages/Profile";
import AdminDashboard from "./Pages/AdminDashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌍 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🛒 USER ROUTES */}
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />

        {/* 🛠 ADMIN ROUTE */}
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;