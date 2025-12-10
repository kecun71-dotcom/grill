'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Flame, Users, Wallet, ArrowRight } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { cn } from '@/shared/lib/utils';

interface QuickGenerateProps {
  className?: string;
}

export function QuickGenerate({ className }: QuickGenerateProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('bbq.quick_generate');

  const [servings, setServings] = useState('4');
  const [budget, setBudget] = useState('medium');

  const handleGenerate = () => {
    // 导航到生成页面并带上参数
    router.push(
      `/${locale}/generate?servings=${servings}&budget=${budget}`
    );
  };

  const budgetOptions = [
    { value: 'low', label: locale === 'zh' ? '经济实惠' : locale === 'de' ? 'Günstig' : 'Budget' },
    { value: 'medium', label: locale === 'zh' ? '中等' : locale === 'de' ? 'Mittel' : 'Moderate' },
    { value: 'high', label: locale === 'zh' ? '高端' : locale === 'de' ? 'Premium' : 'Premium' },
  ];

  return (
    <Card className={cn('p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20', className)}>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Flame className="h-5 w-5 text-primary" />
        {t('title')}
      </h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {/* Servings */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t('servings_label')}
          </label>
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
          <label className="text-sm font-medium flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            {t('budget_label')}
          </label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {budgetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        size="lg"
        className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
      >
        <Flame className="h-5 w-5" />
        {t('generate_button')}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </Card>
  );
}

