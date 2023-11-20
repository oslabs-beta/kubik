import React from 'react';
import Button from '@mui/material/Button';

const CommonButton = ({ children, color, disabled, size, sx, variant }) => {
  return (
    <Button
      color={color}
      disabled={disabled}
      size={size}
      sx={sx}
      variant={variant}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
