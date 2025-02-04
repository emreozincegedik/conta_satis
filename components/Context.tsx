"use client";
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BasketItem } from "@/interfaces/BasketItem";
import items from "@/utils/items.json";
import countries from "@/utils/countries.json";
import { Country } from "@/interfaces/Country";
interface IGlobalContextProps {
  setPostalCode: (postalCode: string) => void;
  postalCode: string;
  setProvince: (province: string) => void;
  province: string;
  setCity: (city: string) => void;
  city: string;
  setAddress2: (address: string) => void;
  address2: string;
  basketPayment: () => number;
  otherCountry: string;
  setOtherCountry: (country: string) => void;
  totalPayment: () => number;
  iframetoken2: string;
  setIframetoken2: (token: string) => void;
  basket: BasketItem[];
  addToBasket: (item: BasketItem) => void;
  totalItemsInBasket: number;
  removeFromBasket: (id: number) => void;
  setBasket: (basket: BasketItem[]) => void;
  toggleColorMode: () => void;
  username: string;
  errorPage: boolean;
  setUsername: (user: string) => void;
  usersurname: string;
  setUsersurname: (user: string) => void;
  setErrorPage: (state: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  address: string;
  setAddress: (address: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  country: Country | null;
  setCountry: (country: Country | null) => void;
  snackbarState: boolean;
  setSnackbarState: (state: boolean) => void;
  snackbarMessage: string;
  setSnackbarMessage: (message: string) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  setPostalCode: () => {},
  postalCode: "",
  setProvince: () => {},
  province: "",
  setCity: () => {},
  city: "",
  setAddress2: () => {},
  address2: "",
  basketPayment: () => 0,
  otherCountry: "",
  setOtherCountry: () => {},
  totalPayment: () => 0,
  iframetoken2: "",
  setIframetoken2: () => {},
  basket: [],
  addToBasket: () => {},
  totalItemsInBasket: 0,
  removeFromBasket: () => {},
  setBasket: () => {},
  toggleColorMode: () => {},
  username: "",
  errorPage: false,
  setUsername: () => {},
  usersurname: "",
  setUsersurname: () => {},
  setErrorPage: () => {},
  email: "",
  setEmail: () => {},
  address: "",
  setAddress: () => {},
  phone: "",
  setPhone: () => {},
  country: null,
  setCountry: () => {},
  snackbarState: false,
  setSnackbarState: () => {},
  snackbarMessage: "",
  setSnackbarMessage: () => {},
});

export const GlobalContextProvider = (props: any) => {
  const [username, setUsername] = useState<string>("");
  const [usersurname, setUsersurname] = useState<string>("");
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [errorPage, setErrorPage] = useState(false);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [country, setCountry] = useState<Country | null>(null);
  const [iframetoken2, setIframetoken2] = useState<string>("");
  const [otherCountry, setOtherCountry] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [snackbarState, setSnackbarState] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>(
    "Successfully added to basket!"
  );
  const toggleColorMode = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };
  const totalPayment = () => {
    var x = basket;
    var amount = 0;
    var user_basket = [];
    for (let i = 0; i < x.length; i++) {
      const basketItem = x[i];
      for (let j = 0; j < items.length; j++) {
        const item = items[j];
        if (basketItem.id == item.id) {
          amount += basketItem.quantity * item.price;
          user_basket.push([item.title, item.price, basketItem.quantity]);
        }
      }
    }
    try {
      for (let i = 0; i < countries.length; i++) {
        const countryX = countries[i];
        if (countryX.label == country?.label) {
          amount += country?.price;
        }
      }
    } catch (error) {
      console.log(error);
    }
    return amount;
  };
  const basketPayment = () => {
    var x = basket;
    var amount = 0;
    var user_basket = [];
    for (let i = 0; i < x.length; i++) {
      const basketItem = x[i];
      for (let j = 0; j < items.length; j++) {
        const item = items[j];
        if (basketItem.id == item.id) {
          amount += basketItem.quantity * item.price;
          user_basket.push([item.title, item.price, basketItem.quantity]);
        }
      }
    }
    return amount;
  };
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
        setPostalCode: setPostalCode,
        postalCode: postalCode,
        setProvince: setProvince,
        province: province,
        setCity: setCity,
        city: city,
        setAddress2: setAddress2,
        address2: address2,
        basketPayment: basketPayment,
        otherCountry: otherCountry,
        setOtherCountry: setOtherCountry,
        totalPayment: totalPayment,
        iframetoken2: iframetoken2,
        setIframetoken2: setIframetoken2,
        totalItemsInBasket: basket.reduce((total, item) => {
          return total + item.quantity;
        }, 0),
        addToBasket: (item: BasketItem) => {
          var existingItem = basket.filter((basketItem, i) => {
            return basketItem.id === item.id;
          });
          if (existingItem.length > 0) {
            var otherItems = basket.filter(
              (basketItem) => basketItem.id !== item.id
            );
            existingItem[0].quantity += item.quantity;
            if (existingItem[0].quantity == 0) {
              setBasket(otherItems);
            } else {
              var newBasket = [...basket];

              setBasket(newBasket);
            }
          } else {
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
        usersurname: usersurname,
        setUsersurname: setUsersurname,
        setErrorPage: setErrorPage,
        errorPage: errorPage,
        email: email,
        setEmail: setEmail,
        address: address,
        setAddress: setAddress,
        phone: phone,
        setPhone: setPhone,
        country: country,
        setCountry: (e) => {
          console.log(e);
          setCountry(e);
        },
        snackbarState: snackbarState,
        setSnackbarState: setSnackbarState,
        snackbarMessage: snackbarMessage,
        setSnackbarMessage: setSnackbarMessage,
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
