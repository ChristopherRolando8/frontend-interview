import axios from 'axios';
import { useState, useEffect } from 'react';

export const useRetryFetch = (url: string, retries: number = 3) => {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (retryCount: number) => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        if (retryCount > 0) {
          fetchData(retryCount - 1);
        } else {
          setError('Failed to fetch data');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData(retries);
  }, [url, retries]);

  return { data, error, loading };
};
