import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login/login";
import { Register } from "../pages/Register/register";
import { Home } from "../pages/Home/home";
import { Cart } from "../pages/Cart/cart";
import { Wishlist } from "../pages/Wishlist/wishlist";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
};