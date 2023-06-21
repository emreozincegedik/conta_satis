"use client";
import { Button, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
export const NotFound = () => {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
      }}
    >
      <Typography variant="h4" component="h1">
        404 - Page Not Found
      </Typography>
      <Typography variant="subtitle1">
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/")}
        // component={Link}
        // to="/"
        // className={classes.button}
      >
        Go back to Home
      </Button>
    </div>
  );
};
