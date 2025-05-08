'use client'; 

import { ThemeProvider, CssBaseline } from '@mui/material'; 
import theme from '../theme'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <html>
        <body>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
