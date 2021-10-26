import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Link,
  Avatar,
  Button,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import React from 'react';
import { useMediaQuery } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const AppHeader = (props) => {
  const {
    saveResumeToPdf,
    toggleDarkMode,
    mode,
    signIn,
    signOut,
    signedIn,
    profilePicUrl,
    userName,
  } = props;
  const isLarge = useMediaQuery('(min-width:600px)');

  let modeButton, iconColor, buttonColor;
  if (mode === 'light') {
    iconColor = 'primary.contrastText';
    buttonColor = 'white';
    modeButton = (
      <IconButton
        aria-label='dark mode'
        sx={{ color: 'primary.contrastText' }}
        onClick={toggleDarkMode}>
        <DarkModeIcon />
      </IconButton>
    );
  } else {
    iconColor = 'default';
    buttonColor = 'primary';
    modeButton = (
      <IconButton aria-label='light mode' onClick={toggleDarkMode}>
        <LightModeIcon />
      </IconButton>
    );
  }

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Box>
            <Typography variant='h6' component='div'>
              Resume Creator
            </Typography>
            <Typography variant='caption' component='div'>
              by Craig McLean
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
            }}>
            <Box>
              {modeButton}
              <IconButton
                aria-label='save as pdf'
                sx={{ color: iconColor }}
                onClick={() => saveResumeToPdf(isLarge)}>
                <PictureAsPdfIcon />
              </IconButton>
              <IconButton aria-label='save as pdf' sx={{ color: iconColor }}>
                <Link
                  href='https://github.com/craigmclean39/cv-project-top'
                  underline='none'
                  sx={{ color: iconColor }}>
                  <GitHubIcon />
                </Link>
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={signedIn ? signOut : signIn}>
              <Button sx={{ mx: 1, color: buttonColor }}>
                {signedIn ? 'Logout' : 'Sign In'}
              </Button>
              <Avatar
                sx={{
                  width: '36px',
                  height: '36px',
                }}
                alt={userName}
                src={profilePicUrl}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default AppHeader;
