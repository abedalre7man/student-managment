// src/hooks/useApi.js
import { useState, useEffect } from 'react';

export function useApi(url, method = 'GET', body = null, autoFetch = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [url, method, body, autoFetch]);

  return { data, loading, error, refetch: fetchData };
}
