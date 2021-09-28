import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Link,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import React from "react";
import { useMediaQuery } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const AppHeader = (props) => {
  const { saveResumeToPdf, toggleDarkMode, mode } = props;
  const isLarge = useMediaQuery("(min-width:600px)");

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
          <Box>
            <Typography variant="h6" component="div">
              Resume Creator
            </Typography>
            <Typography variant="caption" component="div">
              by Craig McLean
            </Typography>
          </Box>
          <Box>
            {modeButton}
            <IconButton
              aria-label="save as pdf"
              sx={{ color: iconColor }}
              onClick={() => saveResumeToPdf(isLarge)}
            >
              <PictureAsPdfIcon />
            </IconButton>
            <IconButton aria-label="save as pdf" sx={{ color: iconColor }}>
              <Link
                href="https://github.com/craigmclean39/cv-project-top"
                underline="none"
                sx={{ color: iconColor }}
              >
                <GitHubIcon />
              </Link>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default AppHeader;
