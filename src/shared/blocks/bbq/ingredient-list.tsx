'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ShoppingCart, Check } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';
import {
  formatWeight,
  formatVolume,
  formatPrice,
  type Ingredient,
} from '@/shared/lib/units';

interface IngredientListProps {
  ingredients: Ingredient[];
  onAddToShopping?: () => void;
  addedToShopping?: boolean;
  showTotal?: boolean;
  className?: string;
}

/**
 * 格式化食材数量（根据单位类型和语言）
 */
function formatIngredientAmount(
  ingredient: Ingredient,
  locale: string
): string {
  const { amount, unit } = ingredient;

  switch (unit) {
    case 'g':
      return formatWeight(amount, locale);
    case 'ml':
      return formatVolume(amount, locale);
    case 'piece':
      return locale === 'zh'
        ? `${amount} 个`
        : locale === 'de'
          ? `${amount} Stück`
          : `${amount}`;
    case 'tbsp':
      return locale === 'zh'
        ? `${amount} 汤匙`
        : locale === 'de'
          ? `${amount} EL`
          : `${amount} tbsp`;
    case 'tsp':
      return locale === 'zh'
        ? `${amount} 茶匙`
        : locale === 'de'
          ? `${amount} TL`
          : `${amount} tsp`;
    case 'clove':
      return locale === 'zh'
        ? `${amount} 瓣`
        : locale === 'de'
          ? `${amount} Zehe(n)`
          : `${amount} clove(s)`;
    case 'sprig':
      return locale === 'zh'
        ? `${amount} 枝`
        : locale === 'de'
          ? `${amount} Zweig(e)`
          : `${amount} sprig(s)`;
    default:
      return `${amount} ${unit}`;
  }
}

export function IngredientList({
  ingredients,
  onAddToShopping,
  addedToShopping = false,
  showTotal = true,
  className,
}: IngredientListProps) {
  const locale = useLocale();
  const t = useTranslations('bbq.recipe');
  const tShopping = useTranslations('bbq.shopping');

  // 计算总价（分转换为元）
  const totalCents = ingredients.reduce(
    (sum, ing) => sum + (ing.price || 0),
    0
  );

  return (
    <Card className={cn('overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">{t('ingredients')}</h3>
        {onAddToShopping && (
          <Button
            size="sm"
            variant={addedToShopping ? 'default' : 'outline'}
            className="gap-2"
            onClick={onAddToShopping}
            disabled={addedToShopping}
          >
            {addedToShopping ? (
              <>
                <Check className="h-4 w-4" />
                {t('added_to_shopping')}
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                {t('add_to_shopping')}
              </>
            )}
          </Button>
        )}
      </div>

      {/* Ingredient List */}
      <div className="p-4">
        <div className="bbq-ingredient-list">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="bbq-ingredient-item">
              <span className="font-medium">{ingredient.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  {formatIngredientAmount(ingredient, locale)}
                </span>
                {ingredient.price && ingredient.price > 0 && (
                  <span className="bbq-price min-w-[60px] text-right">
                    {formatPrice(ingredient.price, locale)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        {showTotal && totalCents > 0 && (
          <div className="pt-4 mt-4 border-t flex items-center justify-between">
            <span className="font-bold">{tShopping('total_estimate')}</span>
            <span className="bbq-price-total">
              {formatPrice(totalCents, locale)}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

