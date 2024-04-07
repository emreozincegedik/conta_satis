"use client";
import React from "react";
import { makeStyles } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Test from "@/components/Test";

const useStyles = {
  phoneInputContainer: {
    display: "flex",
    alignItems: "center",
  },
  countrySelect: {
    minWidth: 150,
    marginLeft: "1px",
  },
};

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  // Add more country options as needed
];

export default function Page() {
  const [phone, setPhone] = React.useState("");
  const [country, setCountry] = React.useState("");

  const handlePhoneChange = (event: any) => {
    setPhone(event.target.value);
  };

  const handleCountryChange = (event: any) => {
    setCountry(event.target.value);
  };

  return (
    <div style={useStyles.phoneInputContainer}>
      <h1>How did you get here this is a test page!</h1>
    </div>
  );
}
