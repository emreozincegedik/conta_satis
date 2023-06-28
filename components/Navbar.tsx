"use client";
import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Badge,
  Slide,
  CssBaseline,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home,
  AddShoppingCart,
  WhatsApp,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { Page } from "@/interfaces/NavbarPageType";
import { useGlobalContext } from "@/components/Context";
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
interface Props {
  window?: () => Window;
  children: React.ReactElement;
}
import useScrollTrigger from "@mui/material/useScrollTrigger";
function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
const settings = ["Profile", "Account", "Dashboard", "Logout"];
export const Navbar = (props: any) => {
  const router = useRouter();
  const theme = useTheme();
  const { totalItemsInBasket } = useGlobalContext();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  // const [user, setUser] = React.useState<null | string>(username);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <CssBaseline />
      <Toolbar />
      <HideOnScroll {...props}>
        <AppBar>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                onClick={() => router.push("/")}
                variant="h6"
                noWrap
                component="a"
                href="#"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Home fontSize="large" /> Home
              </Typography>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
              <Box
                sx={{
                  display: {
                    md: 0,
                    xs: 1,
                  },
                }}
              >
                <Tooltip title="Whatsapp">
                  <IconButton
                    sx={{
                      my: 2,
                      color: "green",
                      backgroundColor: "white",
                      transition: "all 0.3s ease",
                      width: {
                        xs: `calc(100% - ${theme.spacing(2) + 1000}px)`, // reduce width by 20px on xs breakpoint
                        md: "100%",
                      },
                    }}
                    onClick={() =>
                      window.open("http://wa.me/905322256457/?text=Hello Sefa")
                    }
                  >
                    <WhatsApp />
                  </IconButton>
                </Tooltip>
              </Box>
              {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
              <Box
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  // fontFamily: "monospace",
                  fontWeight: 700,
                  // letterSpacing: ".3rem",
                  // color: "inherit",
                  textDecoration: "none",
                  pr: 4.5,
                  justifyItems: "center",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  onClick={() => router.push("/")}
                  component="a"
                  href="#"
                  sx={{
                    color: "white",
                  }}
                >
                  <Home fontSize="large" />
                </IconButton>
              </Box>
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
              <IconButton
                sx={{
                  my: 2,
                  color: "white",
                  transition: "all 0.3s ease",
                  ":hover": { color: "black" },
                  // hover: { color: "black" },
                }}
                onClick={() => router.push("/basket")}
              >
                <Badge badgeContent={totalItemsInBasket} color="error">
                  <AddShoppingCart />
                </Badge>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  );
};
