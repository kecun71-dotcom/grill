'use client';

import { useTranslations } from 'next-intl';
import { Leaf, Wheat, Apple, Scale } from 'lucide-react';

import { Checkbox } from '@/shared/components/ui/checkbox';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils';

export type DietaryNeed = 'vegetarian' | 'vegan' | 'gluten_free' | 'low_carb';

interface DietaryFilterProps {
  selected: DietaryNeed[];
  onChange: (needs: DietaryNeed[]) => void;
  className?: string;
}

const dietaryOptions: { value: DietaryNeed; icon: typeof Leaf }[] = [
  { value: 'vegetarian', icon: Leaf },
  { value: 'vegan', icon: Apple },
  { value: 'gluten_free', icon: Wheat },
  { value: 'low_carb', icon: Scale },
];

export function DietaryFilter({
  selected,
  onChange,
  className,
}: DietaryFilterProps) {
  const t = useTranslations('bbq.generate');

  const toggleNeed = (need: DietaryNeed) => {
    if (selected.includes(need)) {
      onChange(selected.filter((n) => n !== need));
    } else {
      onChange([...selected, need]);
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <Label className="text-base font-semibold">{t('dietary_needs')}</Label>
      <div className="grid grid-cols-2 gap-3">
        {dietaryOptions.map(({ value, icon: Icon }) => (
          <div
            key={value}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
              selected.includes(value)
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            )}
            onClick={() => toggleNeed(value)}
          >
            <Checkbox
              id={value}
              checked={selected.includes(value)}
              onCheckedChange={() => toggleNeed(value)}
            />
            <Icon className="h-4 w-4 text-muted-foreground" />
            <Label
              htmlFor={value}
              className="cursor-pointer flex-1 text-sm"
            >
              {t(value)}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

