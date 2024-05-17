import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
// Use a library like jwt-decode for decoding JWT tokens

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const token = Cookies.get("token");

  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("data")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
