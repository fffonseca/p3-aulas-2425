import { createContext, useContext, useState } from "react";
import AuthService from "../services/auth.service";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Provider do contexto
export const AuthProvider = ({ children }) => {
  //const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    const data = await AuthService.login(email, password);
    //setUser(data.user);
    setToken(data.AccessToken);
  };

  const logout = () => {
    //setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};