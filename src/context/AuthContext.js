import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const token = Cookies.get("token");
  console.log(token, "toki");
  const [authUser, setAuthUser] = useState(token || null);

  useEffect(() => {
    console.log(token, "token");
    if (token) {
      setAuthUser(token);
    } else {
      window.location.href("/auth");
    }
  }, [token]);

  console.log(authUser, "authooo");
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
