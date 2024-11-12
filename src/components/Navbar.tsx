// /src/components/Navbar.tsx
"use client";

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface NavbarProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

export default function Navbar({ toggleDarkMode, darkMode }: NavbarProps) {
  return (
    <AppBar position="static" style={{ backgroundColor: darkMode ? '#000' : '#ffeb3b' }}>
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Typography variant="h6" style={{ color: darkMode ? '#ffeb3b' : '#000', fontWeight: 'bold' }}>
            CryptoTracker
          </Typography>
        </Box>
        <Link href="/" passHref>
          <Button color="inherit" style={{ color: darkMode ? '#ffeb3b' : '#000' }}>Home</Button>
        </Link>
        <Link href="/favorites" passHref>
          <Button color="inherit" style={{ color: darkMode ? '#ffeb3b' : '#000' }}>Favorites</Button>
        </Link>
        <Link href="/news" passHref>
          <Button color="inherit" style={{ color: darkMode ? '#ffeb3b' : '#000' }}>News</Button>
        </Link>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="mode"
          onClick={toggleDarkMode}
        >
          {darkMode ? <Brightness7Icon style={{ color: '#ffeb3b' }} /> : <Brightness4Icon style={{ color: 'black' }} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
