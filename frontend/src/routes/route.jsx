import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login/login";
import { Register } from "../pages/Register/register";
import { Home } from "../pages/Home/home";
import { Cart } from "../pages/Cart/cart";
import { Wishlist } from "../pages/Wishlist/wishlist";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";
import { Checkout } from "../pages/Checkout/Checkout";
import { Products } from "../pages/Products/Products";
import { MyOrders } from "../pages/MyOrders/MyOrders";
import { Profile } from "../pages/Profile/Profile";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/:platform/:category" element={<Products />} />  
        <Route path="/orders" element={<MyOrders />} />  
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};