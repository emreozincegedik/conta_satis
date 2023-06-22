"use client";
import { useState } from "react";
import { useGlobalContext } from "./Context";
import { BasketItem } from "./BasketItem";
import { ItemsDetail } from "@/interfaces/ItemsDetail";
import items from "@/utils/items.json";
export const Basket = () => {
  const { basket } = useGlobalContext();
  // console.log(basket);
  const findItem: any = (id: number) => {
    return items.filter((item) => item.id === id)[0];
  };
  // console.log(items);
  // console.log(findItem(1));
  return (
    <>
      <h2>Your Cart</h2>
      {basket.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        basket.map((item) => (
          <BasketItem
            key={item.id}
            desc={findItem(item.id).desc}
            id={findItem(item.id).id}
            images={findItem(item.id).images}
            imgPath={findItem(item.id).imgPath}
            price={findItem(item.id).price}
            title={findItem(item.id).title}
          />
        ))
      )}

      {/* <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2> */}
    </>
  );
};
