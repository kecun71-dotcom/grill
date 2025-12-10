'use client';

import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import type { Recipe } from '@/shared/models/bbq-recipe';

interface UseFavoritesReturn {
  favorites: Recipe[];
  isLoading: boolean;
  isFavorited: (recipeId: string) => boolean;
  addFavorite: (recipeId: string) => Promise<void>;
  removeFavorite: (recipeId: string) => Promise<void>;
  toggleFavorite: (recipeId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useFavorites(): UseFavoritesReturn {
  const t = useTranslations('bbq.recipe');
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/bbq/favorites');
      if (response.ok) {
        const data = await response.json();
        setFavorites(data.favorites || []);
        setFavoriteIds(new Set(data.favorites?.map((f: Recipe) => f.id) || []));
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const isFavorited = useCallback(
    (recipeId: string) => favoriteIds.has(recipeId),
    [favoriteIds]
  );

  const addFavorite = useCallback(
    async (recipeId: string) => {
      try {
        const response = await fetch('/api/bbq/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recipeId }),
        });

        if (response.ok) {
          setFavoriteIds((prev) => new Set([...prev, recipeId]));
          toast.success(t('favorited'));
          await fetchFavorites();
        } else {
          const data = await response.json();
          toast.error(data.error || 'Failed to add favorite');
        }
      } catch (error) {
        console.error('Failed to add favorite:', error);
        toast.error('Failed to add favorite');
      }
    },
    [t, fetchFavorites]
  );

  const removeFavorite = useCallback(
    async (recipeId: string) => {
      try {
        const response = await fetch('/api/bbq/favorites', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recipeId }),
        });

        if (response.ok) {
          setFavoriteIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(recipeId);
            return newSet;
          });
          setFavorites((prev) => prev.filter((f) => f.id !== recipeId));
          toast.success(t('remove_favorite'));
        } else {
          const data = await response.json();
          toast.error(data.error || 'Failed to remove favorite');
        }
      } catch (error) {
        console.error('Failed to remove favorite:', error);
        toast.error('Failed to remove favorite');
      }
    },
    [t]
  );

  const toggleFavorite = useCallback(
    async (recipeId: string) => {
      if (isFavorited(recipeId)) {
        await removeFavorite(recipeId);
      } else {
        await addFavorite(recipeId);
      }
    },
    [isFavorited, addFavorite, removeFavorite]
  );

  return {
    favorites,
    isLoading,
    isFavorited,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    refresh: fetchFavorites,
  };
}

