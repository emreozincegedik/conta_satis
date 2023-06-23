"use client";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Fade, TextField } from "@mui/material";
import { Carousel } from "@/components/Carousel";
import { ItemsDetail } from "@/interfaces/ItemsDetail";
import { AddShoppingCart } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useGlobalContext } from "@/components/Context";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const ProductCard = ({
  id,
  title,
  desc,
  price,
  images,
  imgPath,
}: ItemsDetail) => {
  const { addToBasket } = useGlobalContext();
  const [quantity, setQuantity] = useState(0);
  const [addToCartDisabled, setAddToCartDisabled] = useState(true);
  const handleChangeCount = (value: number) => {
    setQuantity(value);
    if (value > 0) {
      setAddToCartDisabled(false);
    } else {
      setAddToCartDisabled(true);
    }
  };
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Carousel images={images} imgPath={imgPath} />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ flexGrow: !expanded ? 1 : 0 }}
        >
          {title || "Random title"}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Typography>
        <Fade in={expanded} unmountOnExit style={{ flexGrow: 1 }}>
          <CardContent>{desc}</CardContent>
        </Fade>
        <Typography gutterBottom variant="h5" component="h2">
          ${price || "99.99"}
        </Typography>

        <Typography>
          <Typography
            variant="h6"
            component="h2"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              //   id="emai"
              label="Quantity"
              name="quantity"
              autoComplete="quantity"
              //   autoFocus
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeCount(parseInt(e.target.value))
              }
            />
            <Button
              variant="contained"
              sx={{
                marginBottom: "0.65em",
                marginTop: "1.15em",
                marginLeft: "0.5em",
              }}
              disabled={addToCartDisabled}
              onClick={() => {
                // console.log("here item id: ", id, quantity);
                addToBasket({ id, quantity });
              }}
            >
              <AddShoppingCart />
            </Button>
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};
