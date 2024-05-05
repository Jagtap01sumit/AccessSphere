"use client";
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Container,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { MainContext } from "../../context/MainContext";
import { toast } from "react-hot-toast";

export default function Login({ setselectedForm, handleLogin }) {
  const { loginEmail, setLoginEmail } = useContext(MainContext);

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email.").required("Email is required."),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email } = data;
    console.log(email);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log(data, res);
      if (res.ok) {
        console.log(data);
        console.log(email);
        setLoginEmail(email);
        toast.success(data.message);
        setselectedForm("passVerification");
        reset();
      } else {
        const errorMessage = data.error || "An error occurred.";
        toast.error(errorMessage);
        return;
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      toast.error("User Not found");
    }
  };
  return (
    <Container>
      <Box>
        <Typography variant="h1" className="fw-semibold text-dark">
          Log In
        </Typography>
        <Box mt={6}>
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box>
                  <InputLabel className="fw-medium mb-2">
                    Your email address
                  </InputLabel>
                  <TextField
                    type="email"
                    variant="outlined"
                    label="work@gmail.com"
                    name="email"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" className="btn--color" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box mt={2} className="d-flex justify-content-between">
          <Button onClick={() => setselectedForm("reg")}>
            Create new account ?
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
