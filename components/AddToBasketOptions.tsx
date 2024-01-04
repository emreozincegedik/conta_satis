"use client";

import { AddCircle, AddShoppingCart, RemoveCircle } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { useGlobalContext } from "./Context";
import { useState } from "react";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

interface Props {
  id: number;
}
export const AddToBasketOptions = ({ id }: Props) => {
  const { addToBasket, basket, setSnackbarState } = useGlobalContext();
  const isInBasket = () => {
    return basket.some((item) => item.id === id);
  };
  const [quantity, setQuantity] = useState(1);
  return (
    <Typography
      variant="h6"
      component="h2"
      sx={{ display: "flex", flexDirection: "row" }}
    >
      <Button
        sx={{
          marginBottom: "0.65em",
          marginTop: "1.15em",
          marginRight: "0.5em",
          color: "red",
        }}
        disabled={quantity <= 1 ? true : false}
        onClick={() => {
          if (quantity <= 1) {
            return;
          }
          setQuantity(quantity - 1);
        }}
        variant="text"
      >
        <RemoveCircle />
      </Button>
      <TextField
        margin="normal"
        required
        type="number"
        label="Quantity"
        name="quantity"
        autoComplete="quantity"
        sx={{
          // flex: 1,
          justifyContent: "center",
          justifyItems: "center",
          justifySelf: "center",
          alignSelf: "center",
        }}
        InputLabelProps={{
          shrink: true,
        }}
        autoFocus
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value, "asd", parseInt(e.target.value));
          setQuantity(parseInt(e.target.value));
        }}
        value={quantity}
      />
      <Button
        sx={{
          marginBottom: "0.65em",
          marginTop: "1.15em",
          marginRight: "0.5em",
        }}
        variant="text"
        onClick={() => {
          setQuantity(quantity + 1);
        }}
      >
        <AddCircle />
      </Button>
      <Button
        variant="contained"
        sx={{
          marginBottom: "0.65em",
          marginTop: "1.15em",
          marginLeft: "0.5em",
        }}
        disabled={quantity < 1 || Number.isNaN(quantity) ? true : false}
        onClick={() => {
          console.log("here item id: ", id, quantity);
          setSnackbarState(true);
          setQuantity(0);
          addToBasket({ id, quantity });
        }}
      >
        {isInBasket() ? <AddCircle /> : <AddShoppingCart />}
      </Button>
    </Typography>
  );
};
