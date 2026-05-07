import { AppRouter } from "./routes/route";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrdersProvider } from "./context/OrdersContext";

export const App = () => {
  return (
    <AuthProvider>
    <WishlistProvider>
    <CartProvider>
    <OrdersProvider>
      <AppRouter />
    </OrdersProvider>
    </CartProvider>
    </WishlistProvider>
    </AuthProvider>
  );
};