import { alpha } from '@mui/material/styles';

const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

export const neutral = {
  50: '#F8F9FA',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  500: '#6C737F',
  600: '#4D5761',
  700: '#2F3746',
  800: '#1C2536',
  900: '#111927',
};

export const blue = withAlphas({
  light: '#73A8C2',
  main: '#5193B3',
  dark: '38667D',
  contrastText: '#FFFFFF',
});

export const yellow = withAlphas({
  light: '#F9DCAF',
  main: '#F8D49B',
  dark: '#AD946C',
  contrastText: '#FFFFFF',
});

export const success = withAlphas({
  light: '#6FBF73',
  main: '#4caf50',
  dark: '357A38',
  contrastText: '#FFFFFF',
});

export const info = withAlphas({
  light: '#81CFCF',
  main: '#62c4c3',
  dark: '#448988',
  contrastText: '#FFFFFF',
});

export const warning = withAlphas({
  light: '#ffb74d',
  main: '#ff9800',
  dark: '#f57c00',
  contrastText: '#FFFFFF',
});

export const error = withAlphas({
  light: '#F6685E',
  main: '#f44336',
  dark: 'AA2E25',
  contrastText: '#FFFFFF',
});
