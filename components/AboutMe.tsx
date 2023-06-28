"use client";
// import React from "react";
import { Typography, Container, Box } from "@mui/material";

const styles = {
  root: {
    minHeight: "95vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "#f5f5f5",
  },
  content: {
    // maxWidth: "800px",
    textAlign: "center",
  },
  title: {
    marginBottom: "24px",
    color: "#3f51b5",
    fontWeight: "bold",
    fontSize: "40px",
  },
  description: {
    marginBottom: "16px",
    fontSize: "18px",
  },
};

const AboutMePage = () => {
  return (
    <div style={styles.root}>
      <Container>
        <Box sx={styles.content}>
          <Typography variant="h4" component="h1" sx={styles.title}>
            About Me & Explanations
          </Typography>
          <Typography variant="body1" sx={styles.description}>
            Hi, I&apos;m Sefa Özincegedik, a master of hand-made leather pump
            cup production, residing in Turkey. I am a collector of pressure
            stoves and have a vast collection covering dozens of pressure
            stoves, lanterns, and blowtorches. I have extensive knowledge about
            their operation and maintenance.
          </Typography>
          <Typography variant="body1" sx={styles.description} paragraph>
            Over the past 20 years, hundreds of satisfied customers worldwide
            have chosen my products for their stoves, lanterns, and blowtorches.
          </Typography>
          <Typography variant="body1" sx={styles.description} paragraph>
            Here, I sell pump cup leathers that are made by myself. They offer
            long life, super elasticity, perfect fitness, and excellent sealing.
            The material used in the production of these items is high-quality
            real leather. Installing these leather washers takes just a few
            minutes using common everyday household tools. Don&apos;t waste your
            time and money on poor-quality alternatives!
          </Typography>
          <Typography variant="body1" sx={styles.description} paragraph>
            All items you purchase will be shipped as &quot;international
            registered postage&quot; and you will receive a tracking barcode
            number for your convenience. You can expect delivery to your
            address, and you&apos;ll be required to provide a signature upon
            receipt.
          </Typography>
          <Typography variant="body1" sx={styles.description} paragraph>
            Deliveries are typically made within 2 business days following
            payment.
          </Typography>
          <Typography variant="body1" sx={styles.description} paragraph>
            If you have any questions or suggestions, I would be delighted to
            hear from you.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default AboutMePage;
