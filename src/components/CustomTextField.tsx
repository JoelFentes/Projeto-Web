'use client';

import { FormControl, InputLabel, Input } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface CustomTextFieldProps {
  id: string;
  label: string;
  type?: string;
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
  required = false,
  fullWidth = true,
  value,
  onChange,
}: CustomTextFieldProps) {
  const theme = useTheme();

  return (
    <FormControl
      variant="standard"
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
        value={value}         // <== ADICIONE ISSO
        onChange={onChange}   // <== E ISSO
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 300,
          color: theme.palette.text.primary,
        }}
      />
    </FormControl>
  );
}

