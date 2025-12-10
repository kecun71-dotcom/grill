'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Clock, ChefHat, Flame, Heart, Bookmark, Check } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';
import { formatCookingTime } from '@/shared/lib/units';
import type { Recipe } from '@/shared/models/bbq-recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onSave?: (recipe: Recipe) => Promise<void>;
  onFavorite?: (recipe: Recipe) => Promise<void>;
  isSaved?: boolean;
  isFavorited?: boolean;
  className?: string;
}

const difficultyColors = {
  easy: 'bbq-badge-easy',
  medium: 'bbq-badge-medium',
  hard: 'bbq-badge-hard',
} as const;

// 根据食谱名称或 imageQuery 获取图片
function getRecipeImage(name: string, imageQuery?: string): string {
  const query = imageQuery?.toLowerCase() || name.toLowerCase();

  // BBQ 图片映射 - 使用 Unsplash 在线图片
  const imageMap: Record<string, string> = {
    steak: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop',
    beef: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop',
    chicken: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&h=600&fit=crop',
    wing: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&h=600&fit=crop',
    pork: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&h=600&fit=crop',
    ribs: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop',
    lamb: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&h=600&fit=crop',
    fish: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=800&h=600&fit=crop',
    shrimp: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&h=600&fit=crop',
    prawn: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&h=600&fit=crop',
    seafood: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&h=600&fit=crop',
    vegetable: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
    veggie: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
    kebab: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&h=600&fit=crop',
    skewer: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&h=600&fit=crop',
    sausage: 'https://images.unsplash.com/photo-1587536849024-daaa4a417b16?w=800&h=600&fit=crop',
  };

  // 查找匹配的图片
  for (const [keyword, image] of Object.entries(imageMap)) {
    if (query.includes(keyword)) {
      return image;
    }
  }

  // 默认图片
  return 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop';
}

export function RecipeCard({
  recipe,
  onSave,
  onFavorite,
  isSaved = false,
  isFavorited = false,
  className,
}: RecipeCardProps) {
  const locale = useLocale();
  const t = useTranslations('bbq.recipe');
  const [saving, setSaving] = useState(false);
  const [favoriting, setFavoriting] = useState(false);
  const [saved, setSaved] = useState(isSaved);
  const [favorited, setFavorited] = useState(isFavorited);

  const imageUrl = recipe.image || getRecipeImage(recipe.name, recipe.imageQuery);
  const totalTime = recipe.prepTime + recipe.cookTime;

  const handleSave = async () => {
    if (!onSave || saving) return;
    setSaving(true);
    try {
      await onSave(recipe);
      setSaved(true);
    } catch (e: any) {
      console.error('Failed to save recipe:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleFavorite = async () => {
    if (!onFavorite || favoriting) return;
    setFavoriting(true);
    try {
      await onFavorite(recipe);
      setFavorited(!favorited);
    } catch (e: any) {
      console.error('Failed to favorite recipe:', e);
    } finally {
      setFavoriting(false);
    }
  };

  return (
    <Card className={cn('bbq-recipe-card overflow-hidden', className)}>
      {/* Recipe Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <img
          src={imageUrl}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div
          className={cn(
            'absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold',
            difficultyColors[recipe.difficulty]
          )}
        >
          {t(recipe.difficulty)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-semibold line-clamp-1">{recipe.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {recipe.description}
          </p>
        </div>

        {/* Time Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatCookingTime(recipe.prepTime, locale)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="h-4 w-4" />
            <span>{formatCookingTime(recipe.cookTime, locale)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button asChild className="flex-1 gap-2">
            <Link 
              href={`/${locale}/recipe/${recipe.id}`}
              onClick={() => {
                // 存储食谱到 localStorage 以便详情页读取
                if (typeof window !== 'undefined') {
                  const recipes = JSON.parse(localStorage.getItem('bbq_temp_recipes') || '{}');
                  recipes[recipe.id] = recipe;
                  localStorage.setItem('bbq_temp_recipes', JSON.stringify(recipes));
                }
              }}
            >
              <ChefHat className="h-4 w-4" />
              {t('view_recipe')}
            </Link>
          </Button>

          {onSave && (
            <Button
              variant={saved ? 'default' : 'outline'}
              size="icon"
              onClick={handleSave}
              disabled={saving || saved}
              title={saved ? t('saved') : t('save_recipe')}
            >
              {saved ? (
                <Check className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          )}

          {onFavorite && (
            <Button
              variant={favorited ? 'default' : 'outline'}
              size="icon"
              onClick={handleFavorite}
              disabled={favoriting}
              title={favorited ? t('favorited') : t('favorite')}
            >
              <Heart
                className={cn('h-4 w-4', favorited && 'fill-current')}
              />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

