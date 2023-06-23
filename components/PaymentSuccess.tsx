"use client";
import { Typography, Paper } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const PaymentSuccess = () => {
  return (
    <Paper style={{ padding: "24px", textAlign: "center" }}>
      <CheckCircle style={{ fontSize: 80, color: "green" }} />
      <Typography variant="h4" component="h1" gutterBottom>
        Payment Successful
      </Typography>
      <Typography variant="body1" paragraph>
        Thank you for your payment. Your transaction was successful.
      </Typography>
      <Typography variant="body1">
        An email with your receipt has been sent to your registered email
        address.
      </Typography>
    </Paper>
  );
};

export default PaymentSuccess;
