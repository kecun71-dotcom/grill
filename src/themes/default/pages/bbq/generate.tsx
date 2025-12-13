'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Flame, Users, Wallet, ChefHat, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { RecipeCard } from '@/shared/blocks/bbq';
import { ShoppingProvider, useShoppingList } from '@/shared/contexts/shopping-context';
import type { Recipe } from '@/shared/models/bbq-recipe';

interface GenerateMenuPageProps {
  locale: string;
}

function GenerateMenuContent({ locale }: GenerateMenuPageProps) {
  const t = useTranslations('bbq.generate');
  const tCommon = useTranslations('bbq.common');
  const { addRecipeIngredients } = useShoppingList();

  // Form state
  const [servings, setServings] = useState('4');
  const [budget, setBudget] = useState('medium');
  const [dietaryNeeds, setDietaryNeeds] = useState<string[]>([]);
  const [preferences, setPreferences] = useState('');
  const [availableIngredients, setAvailableIngredients] = useState('');

  // Generate state
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const toggleDietaryNeed = (need: string) => {
    setDietaryNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/bbq/generate-menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          servings: parseInt(servings),
          budget,
          dietaryNeeds,
          preferences,
          availableIngredients,
          language: locale,
        }),
      });

      if (!response.ok) {
        // 检查是否是未登录错误
        if (response.status === 401) {
          toast.error(t('login_required'));
          return;
        }
        throw new Error('Failed to generate menu');
      }

      const data = await response.json();
      setRecipes(data.recipes);
      toast.success(tCommon('success'));
    } catch (error) {
      console.error('Error generating menu:', error);
      toast.error(tCommon('error'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveRecipe = async (recipe: Recipe) => {
    // TODO: 保存到数据库
    console.log('Saving recipe:', recipe.id);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                {t('preferences')}
              </h2>

              <div className="space-y-6">
                {/* Servings */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {t('servings')}
                  </Label>
                  <Select value={servings} onValueChange={setServings}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[2, 4, 6, 8, 10, 12].map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          {num} {locale === 'zh' ? '人' : locale === 'de' ? 'Personen' : 'people'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    {t('budget')}
                  </Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">{t('budget_low')}</SelectItem>
                      <SelectItem value="medium">{t('budget_medium')}</SelectItem>
                      <SelectItem value="high">{t('budget_high')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dietary Needs */}
                <div className="space-y-3">
                  <Label>{t('dietary_needs')}</Label>
                  <div className="space-y-2">
                    {['vegetarian', 'vegan', 'gluten_free', 'low_carb'].map(
                      (need) => (
                        <div
                          key={need}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={need}
                            checked={dietaryNeeds.includes(need)}
                            onCheckedChange={() => toggleDietaryNeed(need)}
                          />
                          <Label htmlFor={need} className="cursor-pointer">
                            {t(need)}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Available Ingredients */}
                <div className="space-y-2">
                  <Label>{t('available_ingredients')}</Label>
                  <Textarea
                    value={availableIngredients}
                    onChange={(e) => setAvailableIngredients(e.target.value)}
                    placeholder={t('available_ingredients_placeholder')}
                    rows={3}
                  />
                </div>

                {/* Additional Preferences */}
                <div className="space-y-2">
                  <Label>{t('additional_preferences')}</Label>
                  <Textarea
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    placeholder={t('additional_preferences_placeholder')}
                    rows={3}
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full gap-2"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {t('generating')}
                    </>
                  ) : (
                    <>
                      <Flame className="h-5 w-5" />
                      {t('generate_button')}
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {recipes.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{t('result_title')}</h2>
                  <Button
                    variant="outline"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {t('regenerate')}
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onSave={handleSaveRecipe}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <Flame className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'zh'
                    ? '准备好开始烧烤了吗？'
                    : locale === 'de'
                      ? 'Bereit zum Grillen?'
                      : 'Ready to start grilling?'}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {locale === 'zh'
                    ? '填写左侧的偏好设置，然后点击"生成菜单"按钮。'
                    : locale === 'de'
                      ? 'Füllen Sie die Einstellungen links aus und klicken Sie auf "Menü Generieren".'
                      : 'Fill in your preferences on the left and click "Generate Menu".'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GenerateMenuPage({ locale }: GenerateMenuPageProps) {
  return (
    <ShoppingProvider>
      <GenerateMenuContent locale={locale} />
    </ShoppingProvider>
  );
}

