"use client";

import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Skeleton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useRetryFetch } from '@/hooks/useRetryFetch';
import Image from 'next/image';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  high_24h: number | null;
  low_24h: number | null;
  price_change_percentage_24h: number;
  circulating_supply: number;
  market_cap_rank: number;
}

const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Crypto[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoriteIds(storedFavorites);
  }, []);

  const apiUrl =
    favoriteIds.length > 0
      ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favoriteIds.join(',')}`
      : '';

  const { data, error, loading } = useRetryFetch(apiUrl, 3);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setFavorites(data as Crypto[]);
    }
  }, [data]);

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    const updatedFavoriteIds = updatedFavorites.map((crypto) => crypto.id);
    setFavoriteIds(updatedFavoriteIds);
    localStorage.setItem('favorites', JSON.stringify(updatedFavoriteIds));
  };

  return (
    <Container maxWidth="lg" style={{ padding: '20px', minHeight: '100vh' }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Favorites
        </Typography>
        {loading ? (
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {Array.from({ length: 12 }).map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton variant="text" />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Array.from({ length: 12 }).map((_, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton variant="rectangular" height={40} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : error ? (
          <Typography variant="body1">Failed to load favorite cryptocurrencies: {error}</Typography>
        ) : favorites.length === 0 ? (
          <Typography variant="body1">You have no favorite cryptocurrencies yet.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Current Price</TableCell>
                  <TableCell>Market Cap</TableCell>
                  <TableCell>24h Volume</TableCell>
                  <TableCell>High (24h)</TableCell>
                  <TableCell>Low (24h)</TableCell>
                  <TableCell>Change (24h)</TableCell>
                  <TableCell>Circulating Supply</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {favorites.map((crypto, index) => (
                  <TableRow key={crypto.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Image
                        src={crypto.image}
                        alt={crypto.name}
                        width={24}
                        height={24}
                        quality={50}
                      />
                    </TableCell>
                    <TableCell>{crypto.name}</TableCell>
                    <TableCell>{crypto.symbol.toUpperCase()}</TableCell>
                    <TableCell>${crypto.current_price.toLocaleString()}</TableCell>
                    <TableCell>${crypto.market_cap.toLocaleString()}</TableCell>
                    <TableCell>${crypto.total_volume.toLocaleString()}</TableCell>
                    <TableCell>
                      {crypto.high_24h !== null ? `$${crypto.high_24h.toLocaleString()}` : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {crypto.low_24h !== null ? `$${crypto.low_24h.toLocaleString()}` : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {crypto.price_change_percentage_24h !== null
                        ? `${crypto.price_change_percentage_24h.toFixed(2)}%`
                        : 'N/A'}
                    </TableCell>
                    <TableCell>{crypto.circulating_supply.toLocaleString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeFromFavorites(crypto.id)} style={{ color: 'f0e68c' }}>
                        <StarIcon sx={{ color: '#ffeb3b' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default FavoritesPage;
