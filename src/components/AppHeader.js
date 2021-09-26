import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import React from "react";

const AppHeader = (props) => {
  const { saveResumeToPdf, toggleDarkMode, mode } = props;

  let modeButton, iconColor;
  if (mode === "light") {
    iconColor = "primary.contrastText";
    modeButton = (
      <IconButton
        aria-label="dark mode"
        sx={{ color: "primary.contrastText" }}
        onClick={toggleDarkMode}
      >
        <DarkModeIcon />
      </IconButton>
    );
  } else {
    iconColor = "default";
    modeButton = (
      <IconButton aria-label="light mode" onClick={toggleDarkMode}>
        <LightModeIcon />
      </IconButton>
    );
  }

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div">
            Resume Creator
          </Typography>
          <Box>
            {modeButton}
            <IconButton
              aria-label="save as pdf"
              sx={{ color: iconColor }}
              onClick={saveResumeToPdf}
            >
              <PictureAsPdfIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default AppHeader;
