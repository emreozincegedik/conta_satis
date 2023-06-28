"use client";
import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  StepButton,
  Step,
  Stepper,
  Box,
} from "@mui/material";
import { Basket } from "./Basket";
import { PersonalDetail } from "./PersonalDetail";
const steps = ["Basket", "Personal Details", "Payment"];
import { useGlobalContext } from "@/components/Context";
import { useRouter } from "next/navigation";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { Payment } from "./Payment";

export const PaymentLayout = () => {
  const {
    basket,
    totalItemsInBasket,
    country,
    username,
    address,
    email,
    phone,
    setIframetoken2,
    totalPayment,
    basketPayment,
    otherCountry,
  } = useGlobalContext();
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 2;
  };

  //payment button enabled when all steps are completed
  const allStepsCompleted = () => {
    if (
      totalItemsInBasket == 0 ||
      country == null ||
      (otherCountry == "" && country.label == "Other") ||
      username == "" ||
      address == "" ||
      email == "" ||
      phone == ""
    ) {
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    var newActiveStep = activeStep;
    if (isLastStep()) {
      //go to payment
      console.log(basket, country);
      var options = {
        method: "POST",
        // url: "https://www.paytr.com/odeme/api/get-token",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        formData: {
          email: email,
          user_name: username,
          user_address: address,
          user_phone: phone,
          user_basket: basket,
          country: country,
          lang: "en",
          currency: "TL",
          other_country: otherCountry,
        },
      };
      setLoading(true);

      try {
        var res = await fetch("/api/payment", {
          method: "POST",
          body: JSON.stringify(options.formData),
        });
        var data = await res.json();
        console.log(data);
        setIframetoken2(data.token);
        newActiveStep++;
        setActiveStep(newActiveStep);
        setLoading(false);

        // router.push("/payment");
        // console.log(data);
      } catch (error) {
        console.log("oh nooo", error);
      }
      // console.log(country, username, address, email, phone);
      // console.log(allStepsCompleted());
    } else {
      newActiveStep++;
    }
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Container sx={{ py: 6 }} maxWidth="md">
      {/* <Grid container spacing={6}> */}
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton
                color="inherit"
                onClick={handleStep(index)}
                disabled={index == 2}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <div>
          <>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {/* Step {activeStep + 1} of 3 */}
              {activeStep === 0 ? (
                <Basket />
              ) : activeStep == 1 ? (
                <PersonalDetail />
              ) : (
                <Payment />
              )}
            </Typography>
            <Box
              sx={{
                flex: "1",
                flexDirection: "column",
                alignContent: "flex-end",
                justifyContent: "flex-end",
                justifyItems: "flex-end",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  flex: "1",
                  alignSelf: "flex-end",
                }}
              >
                basket: ${basketPayment()}
              </Box>
              <Box
                sx={{
                  flex: "1",
                  alignSelf: "flex-end",
                }}
              >
                shipment: ${country?.price || 0}
              </Box>
              <Box
                sx={{
                  flex: "1",
                  alignSelf: "flex-end",
                }}
              >
                total payment: ${totalPayment()}
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                variant="contained"
                // color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {loading ? (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  // variant="outlined"
                >
                  Processing...
                </LoadingButton>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={
                    (!allStepsCompleted() && activeStep === 1) ||
                    activeStep === 2
                  }
                  sx={{ mr: 1 }}
                >
                  {activeStep === 0
                    ? "Proceed to Personal Details"
                    : activeStep === 1
                    ? allStepsCompleted()
                      ? "Checkout"
                      : "Fill basket and shipment details"
                    : "In payment page"}
                </Button>
              )}
            </Box>
          </>
        </div>
      </Box>
    </Container>
  );
};
