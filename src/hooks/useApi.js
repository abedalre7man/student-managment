// src/hooks/useApi.js
import { useState, useEffect } from 'react';

// بيانات الطلاب الثابتة
const fakeStudents = [
  { id: 1, name: 'Alice', age: 20, grade: 'A' },
  { id: 2, name: 'Bob', age: 22, grade: 'B' },
  { id: 3, name: 'Abed', age: 45, grade: 'A' }
];

export function useApi(url, method = 'GET', body = null, autoFetch = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // ✅ بدل الفتش الحقيقي، استخدم البيانات الثابتة
      if (method === 'GET') {
        setData(fakeStudents);
      } else if (method === 'POST') {
        setData(prev => [...prev, body]);
      } else if (method === 'PUT') {
        const updated = fakeStudents.map((item) =>
          item.id === body.id ? body : item
        );
        setData(updated);
      } else if (method === 'DELETE') {
        const filtered = fakeStudents.filter((item) => item.id !== body.id);
        setData(filtered);
      }
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
  }, [autoFetch]);

  return { data, loading, error, refetch: fetchData };
}
