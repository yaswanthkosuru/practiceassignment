import { useState, useEffect, useCallback } from 'react';

const useFetchTranslations = (language) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTranslations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/translations/${language}`);

      if (!response.ok) {
        throw new Error(`Failed to load translations: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Translation fetch error:', err);
      setError(err.message);

      try {
        const localResponse = await fetch('/locales/en.json');
        if (localResponse.ok) {
          const localTranslations = await localResponse.json();
          console.log('Using local English translations as fallback');
          setData(localTranslations);
        } else {
          setData({});
        }
      } catch (localErr) {
        console.error('Failed to load local fallback translations:', localErr);
        setData({});
      }
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    if (language) {
      fetchTranslations();
    }
  }, [fetchTranslations, language]);

  return { data, loading, error };
};

export default useFetchTranslations;
