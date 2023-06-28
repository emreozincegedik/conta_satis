"use client";
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
import { Phone, Email, LocationOn, Person } from "@mui/icons-material";

const ContactMePage = () => {
  return (
    <Paper
      sx={{
        padding: "4vh",
        minHeight: "95vh",
        paddingTop: "48px",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // background: "#f5f5f5",
      }}
    >
      <Container component="main" maxWidth="xs" sx={{ pt: 8, pb: 8 }}>
        <CssBaseline />
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Me
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Person />
            </ListItemIcon>

            <ListItemText primary="Sefa Özincegedik" secondary="" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>

            <ListItemText
              primary="Phone (Whatsapp)"
              secondary="+90 532 225 64 57"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary="Email" secondary="ozincegedik@gmail.com" />
          </ListItem>
          {/* <ListItem>
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
