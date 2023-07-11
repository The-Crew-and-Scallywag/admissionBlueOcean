import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ token });
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const res = await axios.post("/api/login", {
        username,
        password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      setAuth({ token });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth({});
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
