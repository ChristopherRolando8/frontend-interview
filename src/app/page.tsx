"use client";

import React, { useState, useMemo, useEffect } from 'react';
import debounce from 'lodash/debounce';
import {
  Box, Container, TextField, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Tabs, Tab, IconButton, Skeleton,
} from '@mui/material';
import { useRetryFetch } from '../hooks/useRetryFetch';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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

const categories = [
  { label: 'All', value: '' },
  { label: 'DeFi', value: 'decentralized-finance-defi' },
  { label: 'NFT', value: 'non-fungible-tokens-nft' },
  { label: 'Layer 1', value: 'layer-1' },
];

const CryptoTracker = () => {
  const [displayedCryptos, setDisplayedCryptos] = useState<Crypto[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ [key: string]: string | number }>({});
  const [sortCriteria, setSortCriteria] = useState<keyof Crypto>('market_cap_rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const itemsPerPage = 10;

  const { data: cryptos, error, loading } = useRetryFetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false${selectedCategory !== '' ? `&category=${selectedCategory}` : ''}`
  );

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (cryptos && Array.isArray(cryptos)) {
      setDisplayedCryptos((cryptos as Crypto[]).slice(0, itemsPerPage));
    }
  }, [cryptos]);

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchQuery(query);
      }, 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleFilter = (criteria: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [criteria]: value }));
  };

  const handleSort = (criteria: keyof Crypto) => {
    setSortCriteria(criteria);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const addToFavorites = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav !== id));
  };

  useEffect(() => {
    if (cryptos && Array.isArray(cryptos)) {
      const filteredCryptos = (cryptos as Crypto[])
        .filter((crypto) => {
          return (
            crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            Object.entries(filters).every(([key, value]) =>
              // @ts-ignore
              crypto[key] === value
            )
          );
        })
        .sort((a, b) => {
          if (favorites.includes(a.id) && !favorites.includes(b.id)) return -1;
          if (!favorites.includes(a.id) && favorites.includes(b.id)) return 1;
          if (sortOrder === 'asc') {
            return a[sortCriteria] < b[sortCriteria] ? -1 : 1;
          } else {
            return a[sortCriteria] > b[sortCriteria] ? -1 : 1;
          }
        });
      setDisplayedCryptos(filteredCryptos.slice(0, currentPage * itemsPerPage));
    }
  }, [cryptos, searchQuery, filters, sortCriteria, sortOrder, currentPage, favorites]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
    setCurrentPage(1);
  };

  return (
    <Container maxWidth="lg" style={{ padding: '20px', minHeight: '100vh' }}>
      <Box sx={{ my: 4 }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          aria-label="crypto categories"
          sx={{ mb: 2 }}
        >
          {categories.map((category) => (
            <Tab
              key={category.value}
              label={category.label}
              value={category.value}
            />
          ))}
        </Tabs>
        <TextField
          fullWidth
          label="Search Cryptocurrencies"
          variant="outlined"
          onChange={handleSearch}
          sx={{ mb: 2 }}
        />
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
                {Array.from({ length: itemsPerPage }).map((_, rowIndex) => (
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
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <p>{error}</p>
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>
                    Name
                    <IconButton onClick={() => handleSort('name')}>
                      {sortCriteria === 'name' && sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Current Price</TableCell>
                  <TableCell>
                    Market Cap
                    <IconButton onClick={() => handleSort('market_cap')}>
                      {sortCriteria === 'market_cap' && sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    24h Volume
                    <IconButton onClick={() => handleSort('total_volume')}>
                      {sortCriteria === 'total_volume' && sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>High (24h)</TableCell>
                  <TableCell>Low (24h)</TableCell>
                  <TableCell>Change (24h)</TableCell>
                  <TableCell>
                    Circulating Supply
                    <IconButton onClick={() => handleSort('circulating_supply')}>
                      {sortCriteria === 'circulating_supply' && sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>Favorites</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedCryptos.map((crypto, index) => (
                  <TableRow key={crypto.market_cap_rank}>
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
                    <TableCell>{crypto.high_24h !== null ? `$${crypto.high_24h.toLocaleString()}` : 'N/A'}</TableCell>
                    <TableCell>{crypto.low_24h !== null ? `$${crypto.low_24h.toLocaleString()}` : 'N/A'}</TableCell>
                    <TableCell>{crypto.price_change_percentage_24h?.toFixed(2)}%</TableCell>
                    <TableCell>{crypto.circulating_supply.toLocaleString()}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          if (favorites.includes(crypto.id)) {
                            removeFromFavorites(crypto.id);
                          } else {
                            addToFavorites(crypto.id);
                          }
                        }}
                      >
                        {favorites.includes(crypto.id) ? <StarIcon style={{ color:'f0e68c' }} /> : <StarBorderIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" onClick={handleLoadMore} disabled={displayedCryptos.length >= cryptos?.length}>
            Load More
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CryptoTracker;
