'use client';

import { useState, useCallback, useEffect } from 'react';

import type { Recipe } from '@/shared/models/bbq-recipe';

interface UseRecipeHistoryReturn {
  history: Recipe[];
  isLoading: boolean;
  recordView: (recipeId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useRecipeHistory(): UseRecipeHistoryReturn {
  const [history, setHistory] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/bbq/history');
      if (response.ok) {
        const data = await response.json();
        setHistory(data.history || []);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const recordView = useCallback(async (recipeId: string) => {
    try {
      await fetch('/api/bbq/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId }),
      });
    } catch (error) {
      console.error('Failed to record view:', error);
    }
  }, []);

  return {
    history,
    isLoading,
    recordView,
    refresh: fetchHistory,
  };
}

