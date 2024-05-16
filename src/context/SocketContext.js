import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  console.log(authUser, "auto userrr");

  useEffect(() => {
    const decoded = jwtDecode(authUser);
    const userId = decoded.userId;

    console.log(userId, "userId");
    const socket = io("http://localhost:3000", {
      query: {
        userId: userId,
      },
    });

    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
      //   setOnlineUsers("66461b361f068930ef5c6306");// id of current login user .. get from token

      console.log(users);
    });

    return () => socket.close();
  }, [authUser]); //

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
