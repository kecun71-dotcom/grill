'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ShoppingCart } from 'lucide-react';

import { ShoppingProvider, useShoppingList } from '@/shared/contexts/shopping-context';
import { ShoppingList as ShoppingListComponent } from '@/shared/blocks/bbq';

function ShoppingPageContent() {
  const locale = useLocale();
  const t = useTranslations('bbq.shopping');
  const { items, toggleBought, removeItem, clearList } = useShoppingList();

  return (
    <div className="min-h-screen">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingCart className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">{t('subtitle')}</p>
          </div>
        </div>

        {/* Shopping List */}
        <ShoppingListComponent
          items={items}
          onToggleBought={toggleBought}
          onRemoveItem={removeItem}
          onClearList={clearList}
        />
      </div>
    </div>
  );
}

export default function ShoppingPage() {
  return (
    <ShoppingProvider>
      <ShoppingPageContent />
    </ShoppingProvider>
  );
}

