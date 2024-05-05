import React from "react";
import MyCard from "../../components/card/Card";
import { Grid } from "@mui/material";

export default function Dashboard() {
  return (
    <div>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <MyCard />
        </Grid>
      </Grid>
    </div>
  );
}
