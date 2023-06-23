"use client";
import { Fab } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
export const FloatingWhatsapp = () => {
  return (
    <Fab
      sx={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 1000,
        color: "green",
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "white",
        },
      }}
      aria-label="add"
      onClick={() => window.open("http://wa.me/905322256457/?text=Hello Sefa")}
    >
      <WhatsAppIcon />
    </Fab>
  );
};
