/**
 * BBQ Recipe Model
 * 食谱数据模型和数据库操作
 */

import { and, desc, eq, sql } from 'drizzle-orm';

import { db } from '@/core/db';
import {
  bbqFavorite,
  bbqMenuGeneration,
  bbqRecipe,
  bbqRecipeHistory,
  bbqShoppingItem,
} from '@/config/db/schema';
import { getUuid } from '@/shared/lib/hash';

// ============================================
// Types
// ============================================

export type BBQRecipe = typeof bbqRecipe.$inferSelect;
export type NewBBQRecipe = typeof bbqRecipe.$inferInsert;
export type UpdateBBQRecipe = Partial<Omit<NewBBQRecipe, 'id' | 'createdAt'>>;

export type BBQFavorite = typeof bbqFavorite.$inferSelect;
export type BBQRecipeHistory = typeof bbqRecipeHistory.$inferSelect;
export type BBQShoppingItem = typeof bbqShoppingItem.$inferSelect;
export type NewBBQShoppingItem = typeof bbqShoppingItem.$inferInsert;
export type BBQMenuGeneration = typeof bbqMenuGeneration.$inferSelect;

// 食材类型（前端使用）
export interface Ingredient {
  name: string;
  amount: number; // 数据库存储：克或毫升
  unit: 'g' | 'ml' | 'piece' | 'tbsp' | 'tsp' | 'clove' | 'sprig';
  price?: number; // 价格（分）
}

// 食谱类型（前端使用）
export interface Recipe {
  id: string;
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  image?: string;
  imageQuery?: string;
  isFavorited?: boolean;
}

// ============================================
// Recipe CRUD
// ============================================

/**
 * 创建新食谱
 */
export async function createRecipe(data: NewBBQRecipe): Promise<BBQRecipe> {
  const id = data.id || getUuid();
  const [result] = await db()
    .insert(bbqRecipe)
    .values({ ...data, id })
    .returning();
  return result;
}

/**
 * 批量创建食谱
 */
export async function createRecipes(
  recipes: NewBBQRecipe[]
): Promise<BBQRecipe[]> {
  const recipesWithId = recipes.map((recipe) => ({
    ...recipe,
    id: recipe.id || getUuid(),
  }));

  const results = await db()
    .insert(bbqRecipe)
    .values(recipesWithId)
    .returning();

  return results;
}

/**
 * 更新食谱
 */
export async function updateRecipe(
  id: string,
  data: UpdateBBQRecipe
): Promise<BBQRecipe | null> {
  const [result] = await db()
    .update(bbqRecipe)
    .set(data)
    .where(eq(bbqRecipe.id, id))
    .returning();
  return result || null;
}

/**
 * 获取单个食谱
 */
export async function getRecipe(id: string): Promise<BBQRecipe | null> {
  const [result] = await db()
    .select()
    .from(bbqRecipe)
    .where(eq(bbqRecipe.id, id))
    .limit(1);
  return result || null;
}

/**
 * 获取用户的食谱列表
 */
export async function getUserRecipes(
  userId: string,
  options: {
    page?: number;
    limit?: number;
    status?: string;
  } = {}
): Promise<BBQRecipe[]> {
  const { page = 1, limit = 20, status = 'active' } = options;

  const results = await db()
    .select()
    .from(bbqRecipe)
    .where(and(eq(bbqRecipe.userId, userId), eq(bbqRecipe.status, status)))
    .orderBy(desc(bbqRecipe.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);

  return results;
}

/**
 * 获取用户食谱数量
 */
export async function getUserRecipesCount(
  userId: string,
  status: string = 'active'
): Promise<number> {
  const [result] = await db()
    .select({ count: sql<number>`count(*)` })
    .from(bbqRecipe)
    .where(and(eq(bbqRecipe.userId, userId), eq(bbqRecipe.status, status)));

  return Number(result?.count || 0);
}

/**
 * 删除食谱（软删除）
 */
export async function deleteRecipe(id: string): Promise<boolean> {
  const result = await updateRecipe(id, { status: 'archived' });
  return !!result;
}

// ============================================
// Favorites
// ============================================

/**
 * 添加收藏
 */
export async function addFavorite(
  userId: string,
  recipeId: string
): Promise<BBQFavorite> {
  const id = getUuid();
  const [result] = await db()
    .insert(bbqFavorite)
    .values({ id, userId, recipeId })
    .returning();
  return result;
}

/**
 * 移除收藏
 */
export async function removeFavorite(
  userId: string,
  recipeId: string
): Promise<boolean> {
  const result = await db()
    .delete(bbqFavorite)
    .where(
      and(eq(bbqFavorite.userId, userId), eq(bbqFavorite.recipeId, recipeId))
    );
  return true;
}

/**
 * 检查是否已收藏
 */
export async function isFavorited(
  userId: string,
  recipeId: string
): Promise<boolean> {
  const [result] = await db()
    .select()
    .from(bbqFavorite)
    .where(
      and(eq(bbqFavorite.userId, userId), eq(bbqFavorite.recipeId, recipeId))
    )
    .limit(1);
  return !!result;
}

/**
 * 获取用户收藏的食谱
 */
export async function getUserFavorites(
  userId: string,
  options: {
    page?: number;
    limit?: number;
  } = {}
): Promise<BBQRecipe[]> {
  const { page = 1, limit = 20 } = options;

  const results = await db()
    .select({
      recipe: bbqRecipe,
    })
    .from(bbqFavorite)
    .innerJoin(bbqRecipe, eq(bbqFavorite.recipeId, bbqRecipe.id))
    .where(eq(bbqFavorite.userId, userId))
    .orderBy(desc(bbqFavorite.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);

  return results.map((r) => r.recipe);
}

// ============================================
// Recipe History
// ============================================

/**
 * 记录浏览历史
 */
export async function recordRecipeView(
  userId: string,
  recipeId: string
): Promise<void> {
  const id = getUuid();
  await db().insert(bbqRecipeHistory).values({ id, userId, recipeId });
}

/**
 * 获取浏览历史
 */
export async function getRecipeHistory(
  userId: string,
  options: {
    page?: number;
    limit?: number;
  } = {}
): Promise<BBQRecipe[]> {
  const { page = 1, limit = 20 } = options;

  const results = await db()
    .select({
      recipe: bbqRecipe,
    })
    .from(bbqRecipeHistory)
    .innerJoin(bbqRecipe, eq(bbqRecipeHistory.recipeId, bbqRecipe.id))
    .where(eq(bbqRecipeHistory.userId, userId))
    .orderBy(desc(bbqRecipeHistory.viewedAt))
    .limit(limit)
    .offset((page - 1) * limit);

  return results.map((r) => r.recipe);
}

// ============================================
// Shopping List
// ============================================

/**
 * 添加购物清单项目
 */
export async function addShoppingItem(
  data: NewBBQShoppingItem
): Promise<BBQShoppingItem> {
  const id = data.id || getUuid();
  const [result] = await db()
    .insert(bbqShoppingItem)
    .values({ ...data, id })
    .returning();
  return result;
}

/**
 * 批量添加购物清单项目
 */
export async function addShoppingItems(
  items: NewBBQShoppingItem[]
): Promise<BBQShoppingItem[]> {
  const itemsWithId = items.map((item) => ({
    ...item,
    id: item.id || getUuid(),
  }));

  const results = await db()
    .insert(bbqShoppingItem)
    .values(itemsWithId)
    .returning();

  return results;
}

/**
 * 获取用户购物清单
 */
export async function getShoppingList(
  userId: string
): Promise<BBQShoppingItem[]> {
  const results = await db()
    .select()
    .from(bbqShoppingItem)
    .where(eq(bbqShoppingItem.userId, userId))
    .orderBy(desc(bbqShoppingItem.createdAt));

  return results;
}

/**
 * 更新购物清单项目（标记已购买）
 */
export async function updateShoppingItem(
  id: string,
  data: Partial<BBQShoppingItem>
): Promise<BBQShoppingItem | null> {
  const [result] = await db()
    .update(bbqShoppingItem)
    .set(data)
    .where(eq(bbqShoppingItem.id, id))
    .returning();
  return result || null;
}

/**
 * 删除购物清单项目
 */
export async function removeShoppingItem(id: string): Promise<boolean> {
  await db().delete(bbqShoppingItem).where(eq(bbqShoppingItem.id, id));
  return true;
}

/**
 * 清空用户购物清单
 */
export async function clearShoppingList(userId: string): Promise<boolean> {
  await db()
    .delete(bbqShoppingItem)
    .where(eq(bbqShoppingItem.userId, userId));
  return true;
}

// ============================================
// Menu Generation
// ============================================

/**
 * 记录菜单生成
 */
export async function recordMenuGeneration(data: {
  userId: string;
  servings?: number;
  budget?: string;
  dietaryNeeds?: string[];
  preferences?: string;
  availableIngredients?: string;
  language?: string;
  recipesCount?: number;
  creditsUsed?: number;
  creditId?: string;
  status?: string;
  errorMessage?: string;
}): Promise<BBQMenuGeneration> {
  const id = getUuid();
  const [result] = await db()
    .insert(bbqMenuGeneration)
    .values({
      id,
      userId: data.userId,
      servings: data.servings,
      budget: data.budget,
      dietaryNeeds: data.dietaryNeeds
        ? JSON.stringify(data.dietaryNeeds)
        : null,
      preferences: data.preferences,
      availableIngredients: data.availableIngredients,
      language: data.language,
      recipesCount: data.recipesCount || 0,
      creditsUsed: data.creditsUsed || 1,
      creditId: data.creditId,
      status: data.status || 'completed',
      errorMessage: data.errorMessage,
    })
    .returning();
  return result;
}

/**
 * 获取用户本月生成次数
 */
export async function getMonthlyGenerationCount(
  userId: string
): Promise<number> {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [result] = await db()
    .select({ count: sql<number>`count(*)` })
    .from(bbqMenuGeneration)
    .where(
      and(
        eq(bbqMenuGeneration.userId, userId),
        eq(bbqMenuGeneration.status, 'completed'),
        sql`${bbqMenuGeneration.createdAt} >= ${startOfMonth}`
      )
    );

  return Number(result?.count || 0);
}

// ============================================
// Helper Functions
// ============================================

/**
 * 将数据库食谱转换为前端 Recipe 类型
 */
export function dbRecipeToRecipe(
  dbRecipe: BBQRecipe,
  isFavorited: boolean = false
): Recipe {
  let ingredients: Ingredient[] = [];
  let instructions: string[] = [];

  try {
    if (dbRecipe.ingredients) {
      ingredients = JSON.parse(dbRecipe.ingredients);
    }
  } catch {
    ingredients = [];
  }

  try {
    if (dbRecipe.instructions) {
      instructions = JSON.parse(dbRecipe.instructions);
    }
  } catch {
    instructions = [];
  }

  return {
    id: dbRecipe.id,
    name: dbRecipe.title,
    description: dbRecipe.description || '',
    prepTime: dbRecipe.prepTime || 0,
    cookTime: dbRecipe.cookTime || 0,
    difficulty: (dbRecipe.difficulty as 'easy' | 'medium' | 'hard') || 'medium',
    servings: dbRecipe.servings || 4,
    ingredients,
    instructions,
    image: dbRecipe.imageUrl || undefined,
    imageQuery: dbRecipe.imageQuery || undefined,
    isFavorited,
  };
}

/**
 * 将前端 Recipe 转换为数据库格式
 */
export function recipeToDbRecipe(
  recipe: Recipe,
  userId: string
): NewBBQRecipe {
  return {
    id: recipe.id,
    userId,
    title: recipe.name,
    description: recipe.description,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    difficulty: recipe.difficulty,
    servings: recipe.servings,
    ingredients: JSON.stringify(recipe.ingredients),
    instructions: JSON.stringify(recipe.instructions),
    imageUrl: recipe.image,
    imageQuery: recipe.imageQuery,
    status: 'active',
  };
}

