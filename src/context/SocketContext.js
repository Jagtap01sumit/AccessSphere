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

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      query: {
        userId: authUser,
      },
    });

    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
      //   setOnlineUsers("66461b361f068930ef5c6306");// id of current login user .. get from saved id in localstorage

      console.log(users);
    });

    return () => socket.close();
  }, []); //

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
