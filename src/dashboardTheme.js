import { createTheme } from '@mui/material/styles';

export const dashboardTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          fontWeight: 600,
          borderRadius: 8.5,
          textTransform: 'none',
          '&.MuiButton-contained': {
            backgroundColor: '#5193B3',
            '&:hover': {
              backgroundColor: '#c0c4c7',
            },
          },
          '&.MuiButton-outlined': {
            color: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '1.7rem',
        },
      },
    },
  },
  palette: {
    main: '#5193B3',
  },
  secondary: {
    main: '#F8D49B',
  },
  error: {
    main: '#F44336',
  },
  info: {
    main: '#62C4C3',
  },
  typography: {
    h1: {
      fontSize: '1.6rem',
      fontWeight: 600,
      color: '#fff',
      letterSpacing: '0.5px',
      textTransform: 'capitalize',
    },
  },
});
