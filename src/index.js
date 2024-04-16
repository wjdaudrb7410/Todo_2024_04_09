import React from "react";
import ReactDOM from "react-dom/client";
import { Me } from "./pages/Home/Home";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { Router } from "./Router";
import { HelmetProvider } from "react-helmet-async";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <HelmetProvider>
        <Router />
      </HelmetProvider>
    </ChakraProvider>
  </React.StrictMode>
);
