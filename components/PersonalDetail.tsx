"use client";
import { useState } from "react";
import {
  Autocomplete,
  Container,
  Typography,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import { useGlobalContext } from "@/components/Context";
import { Country } from "@/interfaces/Country";
import countriesJson from "@/utils/countries.json";
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
    otherCountry,
    setOtherCountry,
  } = useGlobalContext();
  const [countryValue, setCountryValue] = useState("");
  const countries: Country[] = countriesJson;

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
        <Box component="form" noValidate sx={{ mt: 3 }}>
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
                getOptionLabel={(option) => option.label}
                value={country}
                onChange={(event: any, newValue: Country | null) => {
                  console.log(event.target);
                  setCountry(newValue);
                }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.label} (${option.price})
                  </Box>
                )}
                renderInput={(params: any) => (
                  <TextField {...params} label="Country" />
                )}
              />
            </Grid>
            {country && country.label === "Other" && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="otherCountry"
                  label="Country"
                  id="otherCountry"
                  onChange={(e) => setOtherCountry(e.target.value)}
                  value={otherCountry}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
