"use client";
import * as React from "react";
import {
  Autocomplete,
  Container,
  Typography,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import { useGlobalContext } from "@/components/Context";
type Country = {
  label: string;
  price: number;
};
export const PersonalDetail = () => {
  const {
    username,
    setUsername,
    address,
    setAddress,
    country,
    setCountry,
    email,
    setEmail,
    phone,
    setPhone,
  } = useGlobalContext();
  const t = (e: any) => {
    console.log("click");
    console.log(e);
    setCountry(e);
  };
  const [countryValue, setCountryValue] = React.useState("");
  const countries = ["Turkey", "Germany", "France", "Italy", "Spain"];
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          //   marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Shipment Details
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Name and Surname"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Phone"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="address"
                label="Address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onInputChange={(event, newInputValue) => {
                  setCountryValue(newInputValue);
                }}
                inputValue={countryValue}
                options={countries}
                value={country}
                onChange={(event: any, newValue: string | null) => {
                  setCountry(newValue);
                }}
                renderInput={(params: any) => (
                  <TextField {...params} label="Country" />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
