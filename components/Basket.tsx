"use client";
import { useGlobalContext } from "./Context";
import items from "@/utils/items.json";
import { Box, Container, Grid, Typography } from "@mui/material";
import { BasketCard } from "./BasketCard";
export const Basket = () => {
  const { basket } = useGlobalContext();
  const findItem: any = (id: number) => {
    return items.filter((item) => item.id === id)[0];
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Your Cart
        </Typography>
        <Box sx={{ mt: 3 }}>
          {basket.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            basket.map((item) => (
              <Grid
                key={item.id}
                item
                xs={10}
                sm={10}
                md={10}
                sx={{ mb: 2 }}
              >
                <BasketCard
                  desc={findItem(item.id).desc}
                  id={findItem(item.id).id}
                  images={findItem(item.id).images}
                  imgPath={findItem(item.id).imgPath}
                  price={findItem(item.id).price}
                  title={findItem(item.id).title}
                />
              </Grid>
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
};
