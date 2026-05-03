import { AppRouter } from "./routes/route";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

export const App = () => {
  return (
    <AuthProvider>
    <WishlistProvider>
    <CartProvider>
      <AppRouter />
    </CartProvider>
    </WishlistProvider>
    </AuthProvider>
  );
};