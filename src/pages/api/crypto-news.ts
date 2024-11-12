// File: /src/pages/api/crypto-news.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface NewsItem {
  title: string;
  link: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsItem[] | { error: string }>
) {
  const apiKey = '0d8130ae445d688db5b2cf331fb13a8ccd87b321'; // Your CryptoPanic API key
  const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${apiKey}&currencies=BTC`;

  try {
    const { data } = await axios.get(url);
    const news = data.results.map((item: any) => ({
      title: item.title,
      link: item.url,
    }));

    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching crypto news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
