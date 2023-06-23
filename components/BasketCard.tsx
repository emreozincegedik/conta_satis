import {
  AddCircleOutline,
  RemoveCircleOutline,
  DeleteForeverOutlined,
} from "@mui/icons-material";
import {
  Grid,
  Typography,
  IconButton,
  CardContent,
  Card,
  Box,
} from "@mui/material";
import { ItemsDetail } from "@/interfaces/ItemsDetail";
import { useGlobalContext } from "@/components/Context";
import Image from "next/image";
export function BasketCard(item: ItemsDetail) {
  const { addToBasket, basket } = useGlobalContext();

  const itemCount = () => basket.filter((i) => i.id === item.id)[0].quantity;

  return (
    <Card
      sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
    >
      <Image
        style={{
          justifySelf: "flex-center",
          alignSelf: "center",
          padding: "10px",
        }}
        width={151}
        height={151}
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={`${item.imgPath}/${item.images ? item.images[0] : null}`}
        alt={`${item.images ? item.images[0] : null}`}
      />

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
            color="error"
            sx={{
              transition: "all 0.8s ease",
            }}
          >
            {itemCount() == 1 ? (
              <DeleteForeverOutlined />
            ) : (
              <RemoveCircleOutline />
            )}
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
            color="info"
          >
            <AddCircleOutline />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
