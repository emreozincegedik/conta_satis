"use client";
import { ProductCard } from "./ProductCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ItemsDetail } from "@/interfaces/ItemsDetail";
export const Items = ({ itemsJson }: any) => {
  return (
    <Container sx={{ py: 6 }} maxWidth="lg">
      <Grid container spacing={6}>
        {itemsJson.map((card: ItemsDetail, i: number) => (
          <Grid item key={i} xs={12} sm={6} md={6} lg={4}>
            <ProductCard
              id={card.id}
              title={card.title}
              desc={card.desc}
              price={card.price}
              imgPath={card.imgPath}
              images={card.images}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
