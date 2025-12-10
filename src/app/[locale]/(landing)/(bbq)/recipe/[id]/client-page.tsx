'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

import { RecipeDetailPage } from '@/themes/default/pages/bbq/recipe-detail';
import type { Recipe } from '@/shared/models/bbq-recipe';

interface ClientRecipeDetailPageProps {
  locale: string;
  recipeId: string;
  initialRecipe: Recipe | null;
}

export function ClientRecipeDetailPage({
  locale,
  recipeId,
  initialRecipe,
}: ClientRecipeDetailPageProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(initialRecipe);
  const [loading, setLoading] = useState(!initialRecipe);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    // 如果已有初始食谱（来自数据库），不需要从 localStorage 读取
    if (initialRecipe) {
      return;
    }

    // 尝试从 localStorage 获取食谱
    try {
      const storedRecipes = localStorage.getItem('bbq_temp_recipes');
      if (storedRecipes) {
        const recipes = JSON.parse(storedRecipes);
        if (recipes[recipeId]) {
          setRecipe(recipes[recipeId]);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error('Failed to read from localStorage:', e);
    }

    // 没有找到食谱
    setLoading(false);
    setNotFoundState(true);
  }, [recipeId, initialRecipe]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (notFoundState || !recipe) {
    notFound();
  }

  return <RecipeDetailPage locale={locale} recipe={recipe} />;
}

