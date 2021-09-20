import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";

const myTheme = createTheme({
  palette: {
    mode: "light",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
