'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  ShoppingCart,
  Trash2,
  Package,
  DollarSign,
  Check,
} from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { formatPrice } from '@/shared/lib/units';

export interface ShoppingItem {
  id: string;
  name: string;
  amount?: string;
  unit?: string;
  price?: number;
  recipeName?: string;
  isBought: boolean;
}

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggleBought: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onClearList: () => void;
  className?: string;
}

export function ShoppingList({
  items,
  onToggleBought,
  onRemoveItem,
  onClearList,
  className,
}: ShoppingListProps) {
  const locale = useLocale();
  const t = useTranslations('bbq.shopping');
  const tCommon = useTranslations('bbq.common');

  const boughtItems = items.filter((item) => item.isBought);
  const unboughtItems = items.filter((item) => !item.isBought);

  // 计算总价
  const totalCents = items.reduce((sum, item) => sum + (item.price || 0), 0);

  if (items.length === 0) {
    return (
      <Card className={cn('text-center py-16', className)}>
        <div className="flex flex-col items-center gap-4">
          <Package className="h-16 w-16 text-muted-foreground" />
          <div>
            <h3 className="text-xl font-semibold mb-2">{t('empty')}</h3>
            <p className="text-muted-foreground">{t('empty_description')}</p>
          </div>
          <Button asChild>
            <a href={`/${locale}/generate`}>{t('add_items')}</a>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Total Cost Card */}
      <Card className="bg-primary/10 border-primary/20">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t('total_estimate')}
                </p>
                <p className="text-3xl font-bold">
                  {formatPrice(totalCents, locale)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">{t('progress')}</p>
              <p className="text-2xl font-semibold">
                {boughtItems.length}/{items.length}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bbq-progress">
            <div
              className="bbq-progress-bar"
              style={{
                width: `${(boughtItems.length / items.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </Card>

      {/* Clear Button */}
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="gap-2">
              <Trash2 className="h-4 w-4" />
              {t('clear_list')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('clear_confirm')}</DialogTitle>
              <DialogDescription>
                {t('clear_confirm_description')}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">{tCommon('cancel')}</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  onClick={onClearList}
                >
                  {tCommon('delete')}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Items to Buy */}
      {unboughtItems.length > 0 && (
        <Card>
          <div className="p-4 border-b">
            <h3 className="font-semibold">
              {t('to_buy')} ({unboughtItems.length})
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {unboughtItems.map((item) => (
              <div
                key={item.id}
                className="bbq-shopping-item"
              >
                <Checkbox
                  checked={item.isBought}
                  onCheckedChange={() => onToggleBought(item.id)}
                  className="h-5 w-5"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.amount} {item.unit}
                    {item.recipeName && ` • ${item.recipeName}`}
                  </p>
                </div>
                {item.price && item.price > 0 && (
                  <p className="bbq-price min-w-[80px] text-right">
                    {formatPrice(item.price, locale)}
                  </p>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Bought Items */}
      {boughtItems.length > 0 && (
        <Card>
          <div className="p-4 border-b">
            <h3 className="font-semibold text-muted-foreground">
              {t('bought')} ({boughtItems.length})
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {boughtItems.map((item) => (
              <div
                key={item.id}
                className="bbq-shopping-item bought"
              >
                <Checkbox
                  checked={item.isBought}
                  onCheckedChange={() => onToggleBought(item.id)}
                  className="h-5 w-5"
                />
                <div className="flex-1">
                  <p className="font-medium line-through">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.amount} {item.unit}
                    {item.recipeName && ` • ${item.recipeName}`}
                  </p>
                </div>
                {item.price && item.price > 0 && (
                  <p className="text-muted-foreground min-w-[80px] text-right">
                    {formatPrice(item.price, locale)}
                  </p>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

