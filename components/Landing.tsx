"use client";
import { Typography } from "@mui/material";

const landingPageStyles = {
  root: {
    display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "30vh",
    backgroundColor: "#3f51b5",
    color: "#fff",
    padding: "24px",
  },
  title: {
    marginBottom: "16px",
  },
  description: {
    marginBottom: "32px",
  },
  button: {
    marginTop: "16px",
  },
};

export const Landing = () => {
  return (
    <div style={{ ...landingPageStyles.root, flexDirection: "column" }}>
      <Typography variant="h2" component="h1" style={landingPageStyles.title}>
        Welcome to Sefaudi Store!
      </Typography>
      <Typography variant="h3" component="h1" style={landingPageStyles.title}>
        Best place to buy pump cups
      </Typography>
      <Typography
        variant="h6"
        component="p"
        style={landingPageStyles.description}
      >
        Upgrade your pressure item with our high-quality leather pump cups.
      </Typography>
    </div>
  );
};
