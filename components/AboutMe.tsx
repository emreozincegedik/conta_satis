"use client";
import { Typography, Paper, makeStyles } from "@mui/material";

const landingPageStyles = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
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

const AboutMePage = () => {
  return (
    <>
      <div style={{ ...landingPageStyles.root, flexDirection: "column" }}>
        <Typography variant="h2" component="h1" style={landingPageStyles.title}>
          About Me
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          style={landingPageStyles.description}
        >
          Hi, I&apos;m Sefa Özincegedik! I am a passionate pump cup enthusiast
          based in Turkey.
        </Typography>
        <Typography
          variant="body1"
          style={landingPageStyles.description}
          paragraph
        >
          Throughout my journey, I have gained valuable experience in [specific
          areas of expertise or achievements].
        </Typography>
        {/* <Typography
        variant="body1"
        style={landingPageStyles.description}
        paragraph
      >
        In my free time, I love [hobbies/activities] and [other interests].
      </Typography> */}
        <Typography
          variant="body1"
          style={landingPageStyles.description}
          paragraph
        >
          Connect with me on [social media platforms] to stay updated with my
          latest projects and adventures!
        </Typography>
      </div>
    </>
  );
};

export default AboutMePage;
