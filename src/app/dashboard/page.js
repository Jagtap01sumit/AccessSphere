"use client";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import MyCard from "../../components/card/Card";
import { Grid, TextField, Container, Box, Typography } from "@mui/material";
import Image from "next/image";
import { useSocketContext } from "../../context/socketcontext";
export default function Home() {
  const [userData, setUserData] = useState([]);
  const [filterEmail, setFilterEmail] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [socket, setSocket] = useState(null);
  const { onlineUsers } = useSocketContext();
  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_IO_URL;
    console.log(socketUrl);
    const newSocket = io(socketUrl);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("dataFromServer", (data) => {
      setUserData(data);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);
  console.log(onlineUsers, "ffdfh");
  const isOnline = userData.includes("66461b361f068930ef5c6306");
  console.log(isOnline, "heyy");

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleFilterChange = (e) => {
    setFilterEmail(e.target.value);
  };

  const handleTimeFilterChange = (e) => {
    setFilterTime(e.target.value);
  };

  return (
    <div>
      {/* <p>USERID: {socket?.id}</p> */}
      <Box className="flex justify-center align-items-center m-5 ">
        <Image
          width={90}
          height={90}
          src="/images/pngwing.com.png"
          className="img-fluid d-none d-sm-block"
        />
      </Box>
      <Typography variant="h1" gutterBottom className="text-center mt-4">
        Manage Access and Devices
      </Typography>
      <Grid
        spacing={3}
        item
        xs={12}
        md={6}
        className="flex justify-between mx-8"
      >
        <TextField
          label="Filter by Email"
          variant="outlined"
          value={filterEmail}
          onChange={handleFilterChange}
          className="mb-4 sm:mx-2 md:mx-0"
        />
        <TextField
          label="Filter by Time"
          variant="outlined"
          type="datetime-local"
          value={filterTime}
          onChange={handleTimeFilterChange}
          className="mb-4 sm:mx-2 md:mx-0"
        />
      </Grid>
      <Container>
        <Grid container spacing={3}>
          {userData
            ?.filter((user) =>
              user.email.toLowerCase().includes(filterEmail.toLowerCase())
            )
            .map((user) => (
              <Grid key={user._id} item xs={12} sm={12} md={4}>
                <MyCard
                  user={user}
                  id={user._id}
                  isOnline={onlineUsers.includes(user._id)}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}
