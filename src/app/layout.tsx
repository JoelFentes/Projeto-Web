'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme';
import { AuthProvider } from './context/AuthContext'; // <- adicione isso

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider> 
        <html>
          <body>{children}</body>
        </html>
      </AuthProvider>
    </ThemeProvider>
  );
}
