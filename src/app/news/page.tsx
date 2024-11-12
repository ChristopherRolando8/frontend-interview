"use client";

import React, { useEffect, useState } from 'react';
import { useRetryFetch } from '@/hooks/useRetryFetch';
import {
  Box, Typography, List, ListItem, ListItemText, Link, Skeleton,
} from '@mui/material';

interface NewsItem {
  title: string;
  link: string;
}

export default function NewsPage() {
  const apiUrl = '/api/crypto-news'; // Use the internal API endpoint
  const { data, error, loading } = useRetryFetch(apiUrl, 3);

  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    if (data && !error) {
      // Assuming data is the array of news items
      const posts = data as NewsItem[];
      setNews(posts);
    }
  }, [data, error]);

  return (
    <Box sx={{ padding: '40px', minHeight: '100vh' }}>
      <Typography variant="h3" component="h1" sx={{ marginBottom: '20px' }}>
        Crypto News
      </Typography>
      {loading ? (
        <List>
          {Array.from({ length: 5 }).map((_, index) => (
            <ListItem key={index} sx={{ marginBottom: '10px' }}>
              <Skeleton variant="text" width="80%" height={30} />
            </ListItem>
          ))}
        </List>
      ) : error ? (
        <Typography variant="h6" sx={{ color: 'red', textAlign: 'center' }}>
          Failed to load news: {error}
        </Typography>
      ) : (
        <List>
          {news.map((item, index) => (
            <ListItem key={index} sx={{ marginBottom: '10px' }}>
              <ListItemText
                primary={
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    {item.title}
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
