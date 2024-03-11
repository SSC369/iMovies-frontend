import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import ThemeProvider from "./providers/themeProvider";
import { ThemeContextProvider } from "./context/themeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ThemeContextProvider>
);
