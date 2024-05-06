"use client";
import React, { useEffect, useState } from "react";
import MyCard from "../../components/card/Card";
import { Grid, TextField, Container, Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [filterEmail, setFilterEmail] = useState("");
  const [filterTime, setFilterTime] = useState("");

  // useEffect(() => {
    // const token = getCookie("token");
    //TODO: Verify the token at server side

    // if (!token) {
      // window.location.href = "/auth";
    // }
  // }, []);
  const getCookie = () => {};

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/data/dashboard");
        if (response.ok) {
          const data = await response.json();
          setUserData(data.userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, []);

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
      <Box className="flex justify-center align-items-center m-5">
        <Image
          width={90}
          height={90}
          src="/images/pngwing.com.png"
          className="img-fluid  d-none d-sm-block "
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
            .filter((user) =>
              user.email.toLowerCase().includes(filterEmail.toLowerCase())
            )
            .map((user) => (
              <Grid key={user._id} item xs={12} sm={12} md={4}>
                <MyCard user={user} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}
