"use client";
import React from "react";
import { Button } from "@mui/material";
import { useGlobalContext } from "@/components/Context";
import Image from "next/image";
import { BasketItem as BasketItemDetail } from "@/interfaces/BasketItem";
import { ItemsDetail } from "@/interfaces/ItemsDetail";
export const BasketItem = (item: ItemsDetail) => {
  // console.log(item);
  const { addToBasket, basket } = useGlobalContext();
  const itemCount = () => basket.filter((i) => i.id === item.id)[0].quantity;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <div style={{ width: "40%" }}>
        <h4 style={{ marginBottom: "5px" }}>{item.title}</h4>
        <div
          className="information"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "5px",
          }}
        >
          <p>Price: ${item.price}</p>
          <p>Total: ${itemCount() * item.price}</p>
        </div>
        <div
          className="buttons"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "5px",
          }}
        >
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToBasket({ id: item.id, quantity: -1 })}
          >
            -
          </Button>
          <p>{itemCount() || 0}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToBasket({ id: item.id, quantity: 1 })}
          >
            +
          </Button>
        </div>
      </div>
      <Image
        src={`${item.imgPath}/${item.images ? item.images[0] : null}`}
        width={100}
        height={100}
        alt={item.title}
      />
    </div>
  );
};
