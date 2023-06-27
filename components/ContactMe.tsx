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
import { Phone, Email, LocationOn } from "@mui/icons-material";

const ContactMePage = () => {
  return (
    <Paper style={{ padding: "24px" }}>
      <Container component="main" maxWidth="xs" sx={{ pt: 8, pb: 8 }}>
        <CssBaseline />
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Me
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText primary="Phone" secondary="+90 539 412 14 66" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary="Email" secondary="ozincegedik@gmail.com" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocationOn />
            </ListItemIcon>
            <ListItemText
              primary="Address"
              secondary="Menteş mh. 2570 sk Greenland sit C block, floor 4, no:10 Yenişehir/Mersin Turkey"
            />
          </ListItem>
        </List>
      </Container>
    </Paper>
  );
};

export default ContactMePage;
