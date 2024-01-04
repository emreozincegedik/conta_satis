"use client";

import { Alert, Snackbar } from "@mui/material";
import { useGlobalContext } from "./Context";

export const SnackbarMsg = () => {
  const { snackbarState, setSnackbarState, snackbarMessage } =
    useGlobalContext();
  return (
    <Snackbar
      open={snackbarState}
      autoHideDuration={6000}
      onClose={() => setSnackbarState(false)}
    >
      <Alert
        onClose={() => setSnackbarState(false)}
        severity="success"
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};
