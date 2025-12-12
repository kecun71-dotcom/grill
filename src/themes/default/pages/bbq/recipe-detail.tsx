'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  ChefHat,
  Clock,
  Flame,
  Users,
  ArrowLeft,
  Heart,
  Share2,
  Printer,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { CookingTimer, IngredientList } from '@/shared/blocks/bbq';
import { ShoppingProvider, useShoppingList } from '@/shared/contexts/shopping-context';
import { formatCookingTime, localizeInstructions } from '@/shared/lib/units';
import { getRecipeImage } from '@/shared/lib/bbq-images';
import type { Recipe } from '@/shared/models/bbq-recipe';

interface RecipeDetailPageProps {
  locale: string;
  recipe: Recipe;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
} as const;

function RecipeDetailContent({ locale, recipe }: RecipeDetailPageProps) {
  const t = useTranslations('bbq.recipe');
  const tCommon = useTranslations('bbq.common');
  const { addRecipeIngredients } = useShoppingList();

  const [isFavorited, setIsFavorited] = useState(recipe.isFavorited || false);
  const [addedToShopping, setAddedToShopping] = useState(false);

  const totalTime = recipe.prepTime + recipe.cookTime;
  const localizedInstructions = localizeInstructions(recipe.instructions, locale);

  const handleAddToShopping = () => {
    addRecipeIngredients(recipe);
    setAddedToShopping(true);
  };

  const handleFavorite = () => {
    // TODO: 保存到数据库
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? t('remove_favorite') : t('favorited'));
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: recipe.name,
        text: recipe.description,
        url: window.location.href,
      });
    } catch {
      // 复制到剪贴板
      await navigator.clipboard.writeText(window.location.href);
      toast.success(
        locale === 'zh'
          ? '链接已复制'
          : locale === 'de'
            ? 'Link kopiert'
            : 'Link copied'
      );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // 获取食谱图片（使用统一的图片库）
  const imageUrl = recipe.image || getRecipeImage(recipe.name, recipe.imageQuery);

  return (
    <div className="min-h-screen">
      <div className="container max-w-5xl mx-auto py-8 px-4">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6 gap-2">
          <Link href={`/${locale}/generate`}>
            <ArrowLeft className="h-4 w-4" />
            {t('back_to_menu')}
          </Link>
        </Button>

        {/* Recipe Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Image */}
          <div className="relative aspect-video md:aspect-square rounded-xl overflow-hidden">
            <img
              src={imageUrl}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <Badge
              className={`absolute top-4 right-4 ${difficultyColors[recipe.difficulty]}`}
            >
              {t(recipe.difficulty)}
            </Badge>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              {recipe.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('prep_time')}</p>
                  <p className="font-semibold">
                    {formatCookingTime(recipe.prepTime, locale)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Flame className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('cook_time')}</p>
                  <p className="font-semibold">
                    {formatCookingTime(recipe.cookTime, locale)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <ChefHat className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('total_time')}</p>
                  <p className="font-semibold">
                    {formatCookingTime(totalTime, locale)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('servings')}</p>
                  <p className="font-semibold">
                    {recipe.servings}{' '}
                    {locale === 'zh' ? '人份' : locale === 'de' ? 'Portionen' : 'servings'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant={isFavorited ? 'default' : 'outline'}
                onClick={handleFavorite}
                className="gap-2"
              >
                <Heart className={isFavorited ? 'fill-current' : ''} size={18} />
                {isFavorited ? t('favorited') : t('favorite')}
              </Button>
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 size={18} />
                {t('share')}
              </Button>
              <Button variant="outline" onClick={handlePrint} className="gap-2">
                <Printer size={18} />
                {t('print')}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="md:col-span-1">
            <IngredientList
              ingredients={recipe.ingredients}
              onAddToShopping={handleAddToShopping}
              addedToShopping={addedToShopping}
            />
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">{t('instructions')}</h2>
              <ol className="space-y-6">
                {localizedInstructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-base leading-relaxed">{instruction}</p>
                      {/* 如果步骤包含时间，显示计时器 */}
                      {instruction.match(/(\d+)\s*(分钟|分|min|minute|Minuten)/i) && (
                        <div className="mt-4">
                          <CookingTimer
                            initialMinutes={
                              parseInt(
                                instruction.match(
                                  /(\d+)\s*(分钟|分|min|minute|Minuten)/i
                                )?.[1] || '5'
                              )
                            }
                            stepName={`${
                              locale === 'zh'
                                ? '步骤'
                                : locale === 'de'
                                  ? 'Schritt'
                                  : 'Step'
                            } ${index + 1}`}
                          />
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecipeDetailPage({ locale, recipe }: RecipeDetailPageProps) {
  return (
    <ShoppingProvider>
      <RecipeDetailContent locale={locale} recipe={recipe} />
    </ShoppingProvider>
  );
}

