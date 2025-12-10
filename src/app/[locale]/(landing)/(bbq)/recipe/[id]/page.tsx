import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { ClientRecipeDetailPage } from './client-page';
import { getRecipe, dbRecipeToRecipe } from '@/shared/models/bbq-recipe';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  // 尝试从数据库获取食谱
  const recipe = await getRecipe(id);
  
  return {
    title: recipe ? recipe.title : 'BBQ Recipe',
    description: recipe?.description || 'AI Generated BBQ Recipe',
  };
}

export default async function BBQRecipePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  // 尝试从数据库获取食谱
  let recipe = null;
  try {
    const dbRecipe = await getRecipe(id);
    if (dbRecipe) {
      recipe = dbRecipeToRecipe(dbRecipe);
    }
  } catch (e) {
    // 数据库可能未配置，忽略错误
    console.log('Database not available, will try localStorage');
  }

  return <ClientRecipeDetailPage locale={locale} recipeId={id} initialRecipe={recipe} />;
}
