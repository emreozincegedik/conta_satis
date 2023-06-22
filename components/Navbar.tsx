"use client";
import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Home,
  ShoppingCartOutlined,
  AddShoppingCart,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
// import { useContext } from "react";
// import { GlobalContext } from "./globalContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Page } from "@/interfaces/NavbarPageType";
import { useGlobalContext } from "@/components/Context";
import { useContext } from "react";
const pages: Page[] = [
  {
    displayName: "About",
    href: "/about",
    icon: "home",
  },
  {
    displayName: "Contact",
    href: "/contact",
    icon: "home",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
export const Navbar = ({ data }: any) => {
  const router = useRouter();
  // console.log(props);
  //   const { toggleColorMode, username, setUsername, errorPage } =
  //     useContext(GlobalContext);
  React.useEffect(() => {
    // console.log(username);
    async function fetchData() {
      //   if (!errorPage && data.errors) {
      // router.refresh();
      // const res = await fetch("/api/auth/userDetailsNavbar", {
      //   method: "POST",
      //   next: { revalidate: 0 },
      // });
      // const data = await res.json();
      // console.log("wooo");
      // console.log(data);
      // console.log("wooo");
      // if (data.data) {
      //   return setUsername(data.data.username);
      // }
      //   }
    }
    fetchData();
    return () => {};
  }, []);
  const theme = useTheme();
  const { totalItemsInBasket } = useGlobalContext();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  // const [user, setUser] = React.useState<null | string>(username);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            onClick={() => router.push("/")}
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              //   fontFamily: "monospace",
              fontWeight: 700,
              //   letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Home fontSize="large" /> Home
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page: Page, i: number) => (
                <MenuItem key={i}>
                  <Typography
                    align="center"
                    textAlign="center"
                    onClick={() => {
                      router.push(page.href);
                      handleCloseNavMenu();
                    }}
                  >
                    {page.displayName}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            onClick={() => router.push("/")}
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              // fontFamily: "monospace",
              fontWeight: 700,
              // letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Home fontSize="large" />
          </Typography>

          <Box
            justifyContent="space-evenly"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", lg: "flex" },
            }}
          >
            {pages.map((page, i) => (
              <Button
                key={i}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => router.push(page.href)}
              >
                {page.displayName}
              </Button>
            ))}
          </Box>
          {/* <StyledButton onClick={() => setCartOpen(true)}> */}

          <Button
            sx={{ my: 2, color: "white", transition: "all 0.3s ease" }}
            onClick={() => router.push("/basket")}
          >
            <Badge badgeContent={totalItemsInBasket} color="error">
              <AddShoppingCart />
            </Badge>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
