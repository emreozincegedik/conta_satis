"use client";

import React from "react";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  CssBaseline,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Person,
  WhatsApp,
} from "@mui/icons-material";

const ContactMePage = () => {
  return (
    <Paper
      sx={{
        padding: "4vh",
        minHeight: "95vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <Container component="main" maxWidth="xs" sx={{ textAlign: "center" }}>
        <CssBaseline />
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Me
        </Typography>
        <List sx={{ pl: "2vw" }}>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Sefa Özincegedik" secondary="" />
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ListItemIcon>
              <WhatsApp />
            </ListItemIcon>
            <ListItemText primary="Whatsapp" secondary="+90 532 225 64 57" />
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary="Email" secondary="ozincegedik@gmail.com" />
          </ListItem>
          {/* <ListItem
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ListItemIcon>
              <LocationOn />
            </ListItemIcon>
            <ListItemText
              primary="Address"
              secondary="Menteş mh. 2570 sk Greenland sit C block, floor 4, no:10 Yenişehir/Mersin Turkey"
            />
          </ListItem> */}
        </List>
      </Container>
    </Paper>
  );
};

export default ContactMePage;
