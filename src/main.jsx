import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "./context/ThemeContext";

import App from "./App";
import "./index.css";

import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
  <BrowserRouter>
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>

          <Toaster
            position="top-right"
            reverseOrder={false}
          />

          <App />

        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  </BrowserRouter>
</React.StrictMode>
);
