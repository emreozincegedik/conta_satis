"use client";
import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BasketItem } from "@/interfaces/Basket";
interface IGlobalContextProps {
  basket: BasketItem[];
  addToBasket: (item: BasketItem) => void;
  removeFromBasket: (id: number) => void;
  setBasket: (basket: BasketItem[]) => void;
  toggleColorMode: () => void;
  username: string;
  errorPage: boolean;
  setUsername: (user: string) => void;
  setErrorPage: (state: boolean) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  basket: [],
  addToBasket: () => {},
  removeFromBasket: () => {},
  setBasket: () => {},
  toggleColorMode: () => {},
  username: "",
  errorPage: false,
  setUsername: () => {},
  setErrorPage: () => {},
});

export const GlobalContextProvider = (props: any) => {
  const [username, setUsername] = useState<string>("");
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [errorPage, setErrorPage] = useState(false);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const toggleColorMode = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };
  useEffect(() => {
    if (props.data) {
      console.log(props.data);
      // setUsername(props.username);
      if (props.data.status !== 500) {
        return setUsername(props.data.data.me.username);
      }
    }
  }, [props.data]);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: "#1976d2",
          },
        },
      }),
    [themeMode]
  );
  return (
    <GlobalContext.Provider
      value={{
        addToBasket: (item: BasketItem) => {
          var existingItem = basket.filter(
            (basketItem) => basketItem.id === item.id
          );
          if (existingItem.length > 0) {
            var otherItems = basket.filter(
              (basketItem) => basketItem.id !== item.id
            );
            existingItem[0].quantity += item.quantity;
            console.log([existingItem[0], ...otherItems]);
            setBasket([existingItem[0], ...otherItems]);
          } else {
            console.log([...basket, item]);
            setBasket([...basket, item]);
          }
        },
        removeFromBasket: (id: number) => {
          const newBasket = basket.filter((item) => item.id !== id);
          setBasket(newBasket);
        },
        basket: basket,
        setBasket: setBasket,
        toggleColorMode: toggleColorMode,
        username: username,
        setUsername: setUsername,
        setErrorPage: setErrorPage,
        errorPage: errorPage,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};
import { useContext } from "react";
export const useGlobalContext = () => useContext(GlobalContext);
