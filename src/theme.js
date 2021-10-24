import { createTheme } from '@mui/material';

export default function generateTheme(resColor) {
  let newTheme = createTheme({
    palette: {
      primary: {
        main: resColor[500],
      },
      info: {
        main: resColor[700],
      },
    },

    typography: {
      h1: {
        fontSize: '3rem',
        '@media (min-width:600px)': {
          fontSize: '6rem',
        },
      },
      h2: {
        fontSize: '1.875rem',
        '@media (min-width:600px)': {
          fontSize: '3.75rem',
        },
      },
      h3: {
        fontSize: '1.5rem',
        '@media (min-width:600px)': {
          fontSize: '3rem',
        },
      },
      h4: {
        fontSize: '1.0625rem',
        '@media (min-width:600px)': {
          fontSize: '2.125rem',
        },
      },
      h5: {
        fontSize: '0.75rem',
        '@media (min-width:600px)': {
          fontSize: '1.5rem',
        },
      },
      h6: {
        fontSize: '0.625rem',
        '@media (min-width:600px)': {
          fontSize: '1.25rem',
        },
      },
      subtitle1: {
        fontSize: '0.5rem',
        '@media (min-width:600px)': {
          fontSize: '1rem',
        },
      },
      subtitle2: {
        fontSize: '0.4375rem',
        '@media (min-width:600px)': {
          fontSize: '.875rem',
        },
      },
      body1: {
        fontSize: '0.5rem',
        '@media (min-width:600px)': {
          fontSize: '1rem',
        },
      },
      body2: {
        fontSize: '0.4375rem',
        '@media (min-width:600px)': {
          fontSize: '.875rem',
        },
      },
      button: {
        fontSize: '0.4375rem',
        '@media (min-width:600px)': {
          fontSize: '.875rem',
        },
      },
      caption: {
        fontSize: '0.375rem',
        '@media (min-width:600px)': {
          fontSize: '.75rem',
        },
      },
      overline: {
        fontSize: '0.375rem',
        '@media (min-width:600px)': {
          fontSize: '.75rem',
        },
      },
    },

    spacing: 8,
    '@media (min-width:600px)': {
      spacing: 4,
    },
  });

  return newTheme;
}
