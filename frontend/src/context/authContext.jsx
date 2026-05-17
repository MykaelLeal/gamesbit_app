import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storageUser = localStorage.getItem("@Auth:user");

    if (storageUser) {
      setUser(JSON.parse(storageUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "@Auth:user",
        JSON.stringify(user)
      );
    }
  }, [user]);

  const signIn = ({ email, password }) => {
    const users =
      JSON.parse(localStorage.getItem("@Auth:users")) || [];

    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!foundUser) return null;

    const loggedUser = {
      ...foundUser,
      role:
        email === "admin@gamesbit.com" &&
        password === "admin123"
          ? "admin"
          : foundUser.role || "user",
    };

    setUser(loggedUser);

    return loggedUser;
  };

  const register = ({ name, email, password }) => {
    const users =
      JSON.parse(localStorage.getItem("@Auth:users")) || [];

    const emailExists = users.find(
      (user) => user.email === email
    );

    if (emailExists) {
      return false;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role: "user",
      avatar: "",
    };

    users.push(newUser);

    localStorage.setItem(
      "@Auth:users",
      JSON.stringify(users)
    );

    return true;
  };

  const signOut = () => {
    localStorage.removeItem("@Auth:user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signed: !!user,
        signIn,
        register,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};