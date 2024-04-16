import React from "react";
import ReactDOM from "react-dom/client";
import { Me } from "./pages/Home/Home";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { Router } from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router />
    </ChakraProvider>
  </React.StrictMode>
);
