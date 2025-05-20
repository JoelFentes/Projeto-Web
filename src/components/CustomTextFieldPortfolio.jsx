import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme, customcolor }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '& fieldset': {
      borderColor: customcolor?.border || theme.palette.grey[400],
      borderWidth: 2,
    },
    '&:hover fieldset': {
      borderColor: customcolor?.hover || theme.palette.text.primary,
    },
    '&.Mui-focused fieldset': {
      borderColor: customcolor?.focus || theme.palette.secondary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: customcolor?.label || theme.palette.grey[600],
    top: '3px',
    fontSize:'0.875rem',
    '&.Mui-focused': {
      color: customcolor?.focus || theme.palette.secondary.main,
      fontWeight: 'light',

    },
  },
}));

const CustomTextField = ({ customColor, ...props }) => {
  return <StyledTextField customcolor={customColor} {...props} />;
};

export default CustomTextField;