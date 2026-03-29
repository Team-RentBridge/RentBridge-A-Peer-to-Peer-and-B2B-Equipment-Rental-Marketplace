import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { AnimatePresence } from "framer-motion";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Marketplace from "./Pages/Marketplace";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Dashboard from "./Pages/Dashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import RentSection from "./Pages/RentSection";
import AddEquipment from "./Pages/AddEquipment";
import PageTransition from "./components/common/PageTransition";
import Navbar from "./components/layout/Navbar";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user && user.role === 'admin' ? children : <Navigate to="/dashboard" />;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/marketplace" element={
          <PageTransition><Marketplace /></PageTransition>
        } />
        <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
        <Route path="/cart" element={<PrivateRoute><PageTransition><Cart /></PageTransition></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><PageTransition><Dashboard /></PageTransition></PrivateRoute>} />
        <Route path="/rent" element={<PrivateRoute><PageTransition><RentSection /></PageTransition></PrivateRoute>} />
        <Route path="/admin" element={
          <AdminRoute>
            <PageTransition><AdminDashboard /></PageTransition>
          </AdminRoute>
        } />
        <Route path="/add-equipment" element={<PrivateRoute><PageTransition><AddEquipment /></PageTransition></PrivateRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="mesh-gradient" />
        <div className="noise-bg" />
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
