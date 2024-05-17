"use client";
import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Register from "../../components/forms/Register";
import Login from "../../components/forms/Login";
import toast from "react-hot-toast";
import PassVerify from "../../components/forms/PassVerify";

export default function Page() {
  const [selectedForm, setselectedForm] = useState("reg");

  return (
    <section className="h-full flex justify-center items-center my-5">
      <Container maxWidth="xxl" className=" ">
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={11}>
            <Box py={2}>
              <Grid container spacing={8} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Box className="flex justify-center align-items-center ">
                    <img
                      // src="/images/auth.svg"
                      src="/images/programmer-gif.gif"
                      className="img-fluid placeHolderImage d-none d-sm-block"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    {selectedForm === "login" ? (
                      <Login setselectedForm={setselectedForm} />
                    ) : selectedForm === "reg" ? (
                      <Register setselectedForm={setselectedForm} />
                    ) : selectedForm === "passVerification" ? (
                      <PassVerify setselectedForm={setselectedForm} />
                    ) : null}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
