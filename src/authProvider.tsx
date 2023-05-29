import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./types";
import { AuthContextType } from "./types";


export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
});
const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<LoginForm | null>(null);

  const navigate = useNavigate();

  const handleLogin = (data: LoginForm) => {
    try {
      setUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Invalid token", error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
