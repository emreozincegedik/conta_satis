"use client";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";

export default function loading() {
  const items = [1, 2];
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={item}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardActionArea>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={0}
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <Skeleton />
                  </Typography>
                  <Typography>
                    <Skeleton />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
