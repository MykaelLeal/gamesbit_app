import { AppRouter } from "./routes";
import { AuthProvider } from "./context/authContext";

export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};