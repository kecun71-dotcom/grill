'use client';

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import type { Recipe } from '@/shared/models/bbq-recipe';

// ShoppingItem 类型定义
export interface ShoppingItem {
  id: string;
  name: string;
  amount?: string;
  unit?: string;
  price?: number;
  recipeName?: string;
  isBought: boolean;
}

// ============================================
// Types
// ============================================

interface ShoppingContextValue {
  items: ShoppingItem[];
  isLoading: boolean;
  addItem: (item: Omit<ShoppingItem, 'id' | 'isBought'>) => void;
  addRecipeIngredients: (recipe: Recipe) => void;
  toggleBought: (id: string) => void;
  removeItem: (id: string) => void;
  clearList: () => void;
  syncWithServer: () => Promise<void>;
}

const ShoppingContext = createContext<ShoppingContextValue | null>(null);

// ============================================
// Provider
// ============================================

interface ShoppingProviderProps {
  children: ReactNode;
  userId?: string;
}

export function ShoppingProvider({ children, userId }: ShoppingProviderProps) {
  const t = useTranslations('bbq.shopping');
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 生成唯一 ID
  const generateId = () => `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // 从 localStorage 加载数据
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedItems = localStorage.getItem('bbq_shopping_list');
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        console.error('Failed to parse shopping list from localStorage:', e);
      }
    }
  }, []);

  // 保存到 localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('bbq_shopping_list', JSON.stringify(items));
  }, [items]);

  // 如果用户登录，同步到服务器
  const syncWithServer = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      // TODO: 实现服务器同步
      // const response = await fetch('/api/bbq/shopping', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ items }),
      // });
      // if (!response.ok) throw new Error('Sync failed');
    } catch (error) {
      console.error('Failed to sync shopping list:', error);
      toast.error(t('sync_failed'));
    } finally {
      setIsLoading(false);
    }
  }, [userId, items, t]);

  // 添加单个项目
  const addItem = useCallback(
    (item: Omit<ShoppingItem, 'id' | 'isBought'>) => {
      const newItem: ShoppingItem = {
        ...item,
        id: generateId(),
        isBought: false,
      };
      setItems((prev) => [...prev, newItem]);
      toast.success(t('item_added'));
    },
    [t]
  );

  // 添加食谱的所有食材
  const addRecipeIngredients = useCallback(
    (recipe: Recipe) => {
      const newItems: ShoppingItem[] = recipe.ingredients.map((ingredient) => ({
        id: generateId(),
        name: ingredient.name,
        amount: String(ingredient.amount),
        unit: ingredient.unit,
        price: ingredient.price,
        recipeName: recipe.name,
        isBought: false,
      }));

      setItems((prev) => [...prev, ...newItems]);
      toast.success(
        t('ingredients_added', { count: newItems.length, recipe: recipe.name })
      );
    },
    [t]
  );

  // 切换购买状态
  const toggleBought = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isBought: !item.isBought } : item
      )
    );
  }, []);

  // 移除项目
  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success(t('item_removed'));
    },
    [t]
  );

  // 清空列表
  const clearList = useCallback(() => {
    setItems([]);
    toast.success(t('list_cleared'));
  }, [t]);

  const value: ShoppingContextValue = {
    items,
    isLoading,
    addItem,
    addRecipeIngredients,
    toggleBought,
    removeItem,
    clearList,
    syncWithServer,
  };

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

export function useShoppingList() {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingProvider');
  }
  return context;
}

