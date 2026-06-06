import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Login } from "../pages/Login/login";
import { Register } from "../pages/Register/register";
import { Home } from "../pages/Home/home";
import { Cart } from "../pages/Cart/cart";
import { Wishlist } from "../pages/Wishlist/wishlist";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";
import { Products } from "../pages/Products/Products";
import { Checkout } from "../pages/Checkout/Checkout";
import { MyOrders } from "../pages/MyOrders/MyOrders";
import { Profile } from "../pages/Profile/Profile";

import { Dashboard } from "../pages/Admin/Dashboard";
import { ProductsAdmin } from "../pages/Admin/ProductsAdmin";
import { UsersAdmin } from "../pages/Admin/UsersAdmin";
import { OrdersAdmin } from "../pages/Admin/OrdersAdmin";

import { PrivateRoute } from "./privateRoutes";
import { AdminRoute } from "./AdminRoute";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>

        {/* públicas */}
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/products/:platform/:category"
          element={<Products />}
        />

        {/* privadas */}
        <Route element={<PrivateRoute />}>

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/orders"
            element={<MyOrders />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

       {/* admin */}
      <Route element={<AdminRoute />}>

        <Route
          path="/admin"
          element={<Dashboard />}
        />

        <Route
          path="/admin/products"
          element={<ProductsAdmin />}
        />

        <Route
          path="/admin/users"
          element={<UsersAdmin />}
        />

        <Route
          path="/admin/orders"
          element={<OrdersAdmin />}
        />

      </Route>

      </Routes>
    </Router>
  );
};