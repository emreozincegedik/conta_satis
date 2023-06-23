import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import {
  Grid,
  Typography,
  IconButton,
  CardMedia,
  CardContent,
  Card,
  Box,
} from "@mui/material";
import { ItemsDetail } from "@/interfaces/ItemsDetail";
import { useGlobalContext } from "@/components/Context";

export function BasketCard(item: ItemsDetail) {
  const { addToBasket, basket } = useGlobalContext();

  const itemCount = () => basket.filter((i) => i.id === item.id)[0].quantity;

  return (
    <Card
      sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {item.title}
          </Typography>
          <Grid
            className="information"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Price: ${item.price}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Total: ${itemCount() * item.price}
            </Typography>
          </Grid>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton
            aria-label="previous"
            onClick={() => addToBasket({ id: item.id, quantity: -1 })}
          >
            <RemoveCircleOutline />
          </IconButton>
          <Typography
            variant="h6"
            align="center"
            sx={{
              width: "50px",
            }}
          >
            {itemCount() || 0}
          </Typography>
          <IconButton
            aria-label="add"
            onClick={() => addToBasket({ id: item.id, quantity: 1 })}
          >
            <AddCircleOutline />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151, justifySelf: "flex-end" }}
        image={`${item.imgPath}/${item.images ? item.images[0] : null}`}
        alt={`${item.images ? item.images[0] : null}`}
      />
    </Card>
  );
}
