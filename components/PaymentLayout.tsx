"use client";
import * as React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  StepButton,
  Step,
  Stepper,
  Box,
} from "@mui/material";
import { Basket } from "./Basket";
import { PersonalDetail } from "./PersonalDetail";
const steps = ["Basket", "Personal Details"];
import { useGlobalContext } from "@/components/Context";

export const PaymentLayout = () => {
  const {
    basket,
    totalItemsInBasket,
    country,
    username,
    address,
    email,
    phone,
  } = useGlobalContext();

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  //payment button enabled when all steps are completed
  const allStepsCompleted = () => {
    if (
      totalItemsInBasket == 0 ||
      country == "" ||
      country == null ||
      username == "" ||
      address == "" ||
      email == "" ||
      phone == ""
    ) {
      return false;
    }
    return true;
  };

  const handleNext = () => {
    var newActiveStep = activeStep;
    if (isLastStep()) {
      //go to payment
      console.log(country, username, address, email, phone);
      console.log(allStepsCompleted());
    } else {
      newActiveStep++;
    }
    setActiveStep(newActiveStep);
    // const newActiveStep = isLastStep()
    //   ? // It's the last step, but not all steps have been completed,
    //     // find the first step that has been completed
    //     activeStep
    //   : activeStep + 1;
    // setActiveStep(newActiveStep);
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
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {/* Step {activeStep + 1} of 3 */}
              {activeStep === 0 ? <Basket /> : <PersonalDetail />}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleNext}
                disabled={!allStepsCompleted() && activeStep === 1}
                sx={{ mr: 1 }}
              >
                {activeStep === 1
                  ? allStepsCompleted()
                    ? "Go To Payment"
                    : "Fill basket and shipment details"
                  : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        </div>
      </Box>
      {/* </Grid> */}
    </Container>
  );
};
