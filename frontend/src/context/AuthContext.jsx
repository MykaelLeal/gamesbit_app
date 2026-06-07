import { createContext, useEffect, useState } from "react";
import api from "../service/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storageUser = localStorage.getItem("@Auth:user");
    const storageToken = localStorage.getItem("@Auth:token");

    if (storageUser && storageToken) {
      setUser(JSON.parse(storageUser));

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storageToken}`;
    }
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem(
        "@Auth:token",
        token
      );

      localStorage.setItem(
        "@Auth:user",
        JSON.stringify(user)
      );

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      setUser(user);

      return true;

    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const register = async ({
    name,
    cpf,
    email,
    password,
  }) => {
    try {
      await api.post("/user/", {
        name,
        cpf,
        username:
          email.split("@")[0],
        email,
        password,
        avatar: "",
      });

      return true;

    } catch (error) {
      console.error(error);

      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem(
      "@Auth:user"
    );

    localStorage.removeItem(
      "@Auth:token"
    );

    delete api.defaults.headers.common[
      "Authorization"
    ];

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        register,
        signOut,
        signed: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};