'use client';

import { useTranslations } from 'next-intl';
import { ChefHat, Loader2 } from 'lucide-react';

import { RecipeCard } from './recipe-card';
import { cn } from '@/shared/lib/utils';
import type { Recipe } from '@/shared/models/bbq-recipe';

interface RecipeGridProps {
  recipes: Recipe[];
  isLoading?: boolean;
  onSave?: (recipe: Recipe) => Promise<void>;
  onFavorite?: (recipe: Recipe) => Promise<void>;
  emptyMessage?: string;
  className?: string;
}

export function RecipeGrid({
  recipes,
  isLoading = false,
  onSave,
  onFavorite,
  emptyMessage,
  className,
}: RecipeGridProps) {
  const t = useTranslations('bbq');

  if (isLoading) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-16', className)}>
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">{t('generate.generating')}</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
        <ChefHat className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">
          {emptyMessage || t('common.no_recipes')}
        </h3>
        <p className="text-muted-foreground max-w-md">
          {t('generate.subtitle')}
        </p>
      </div>
    );
  }

  return (
    <div className={cn('grid md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onSave={onSave}
          onFavorite={onFavorite}
          isFavorited={recipe.isFavorited}
        />
      ))}
    </div>
  );
}

