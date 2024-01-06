import React from "react";
import { Container, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import itemsJson from "@/utils/items.json";
import Image from "next/image";
import { AddToBasketOptions } from "@/components/AddToBasketOptions";
import { Css } from "@mui/icons-material";
import { Carousel } from "@/components/Carousel";
import { ItemDropdown } from "@/components/ItemDropdown";

export default function Page({ params }: { params: { id: string } }) {
  const item = itemsJson.find((item) => item.id.toString() === params.id);

  return (
    <Container sx={{ py: 6 }}>
      <h1>{item?.title}</h1> <ItemDropdown id={item?.id} />
      <br />
      <CssBaseline />
      <Grid container spacing={6}>
        {/* Image on the left */}
        <Grid item xs={12} md={4}>
          <Carousel images={item?.images} imgPath={item?.imgPath} />
          {/* <Image
            style={{
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              width: "100%",
              height: "auto",
            }}
            src={`${item.imgPath}/${item.images ? item.images[0] : null}`}
            alt="Item"
            width="0"
            height="0"
            sizes="100vw"
          /> */}
        </Grid>

        {/* Name, description, etc. on the right */}
        <Grid item xs={12} md={8}>
          <Paper
            style={{ padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
          >
            <Typography
              variant="h4"
              style={{ marginBottom: "15px", color: "#333" }}
            >
              About This Item
            </Typography>
            <Typography variant="subtitle1" paragraph style={{ color: "#666" }}>
              {item?.desc}
            </Typography>
            <Typography variant="h5" style={{ color: "#000" }}>
              ${item?.price}
            </Typography>

            <AddToBasketOptions id={item?.id || 1} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}