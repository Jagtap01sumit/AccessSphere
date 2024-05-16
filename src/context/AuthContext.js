import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
// Use a library like jwt-decode for decoding JWT tokens

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjM2NzQ1MjRjYmRlZWU1OTFjZDg2NGIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTU4NzA1MTgsImV4cCI6MTcxNTk1NjkxOH0.yZGAHkvL0Jo4C4C1hG-i4ZgD9cCUIozOuuRXYLwOreY"
  );

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjM2NzQ1MjRjYmRlZWU1OTFjZDg2NGIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTU4NzA1MTgsImV4cCI6MTcxNTk1NjkxOH0.yZGAHkvL0Jo4C4C1hG-i4ZgD9cCUIozOuuRXYLwOreYDY";
    console.log(token, "token");
    if (token) {
      setAuthUser(token);
    }
  }, []);
  console.log(authUser, "authooo");
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
