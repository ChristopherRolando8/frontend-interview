"use client";

import localFont from "next/font/local";
import "./globals.css";
import Navbar from '../components/Navbar';
import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#ffeb3b' : '#000',
          },
          background: {
            default: darkMode ? '#121212' : '#ffeb3b',
            paper: darkMode ? '#1d1d1d' : '#fffaf0',
          },
          text: {
            primary: darkMode ? '#ffffff' : '#000000',
            secondary: darkMode ? '#ffeb3b' : '#333333',
          },
        },
      }),
    [darkMode]
  );

  const handleToggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ position: 'sticky', top: 0, zIndex: 1100 }}>
            <Navbar toggleDarkMode={handleToggleDarkMode} darkMode={darkMode} />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
