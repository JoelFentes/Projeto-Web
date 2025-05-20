'use client';

import { FormControl, InputLabel, Input } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface CustomTextFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  variant?: 'standard' | 'filled' | 'outlined';
  autoComplete?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  fullWidth?: boolean;
}

export default function CustomTextField({
  id,
  label,
  type = 'text',
  variant = 'standard',
  placeholder,
  required = false,
  fullWidth = true,
  value,
  onChange,
}: CustomTextFieldProps) {
  const theme = useTheme();

  return (
    <FormControl
      variant={variant}
      fullWidth={fullWidth}
      required={required}
      sx={{ my: 2 }}
    >
      <InputLabel
        shrink
        htmlFor={id}
        sx={{ color: theme.palette.secondary.main, fontWeight: 'light' }}
      >
        {label}
      </InputLabel>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}         
        onChange={onChange}   
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 300,
          color: theme.palette.text.primary,
        }}
      />
    </FormControl>
  );
}

