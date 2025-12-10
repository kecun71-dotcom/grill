/**
 * BBQ Menu AI 单位转换系统
 * - 英语(en): 美国惯用单位 (oz, lb, °F, cup, fl oz)
 * - 中文(zh): 国际单位 (g, kg, °C, ml)
 * - 德语(de): 国际单位 (g, kg, °C, ml)
 */

export type UnitSystem = 'us' | 'metric';
export type Locale = 'en' | 'zh' | 'de';

// 根据语言获取单位系统
export function getUnitSystem(locale: string): UnitSystem {
  return locale === 'en' ? 'us' : 'metric';
}

// 单位标签配置
export const unitLabels = {
  en: {
    weight: { small: 'oz', large: 'lb' },
    volume: { small: 'fl oz', large: 'cup' },
    temperature: '°F',
    length: 'in',
  },
  zh: {
    weight: { small: '克', large: '千克' },
    volume: { small: '毫升', large: '毫升' },
    temperature: '°C',
    length: '厘米',
  },
  de: {
    weight: { small: 'g', large: 'kg' },
    volume: { small: 'ml', large: 'ml' },
    temperature: '°C',
    length: 'cm',
  },
} as const;

// 获取单位标签
function getLabels(locale: string) {
  return unitLabels[locale as keyof typeof unitLabels] || unitLabels.en;
}

// ==================== 重量转换 ====================

/**
 * 将克转换为目标语言的单位
 * @param grams 克数（数据库存储单位）
 * @param locale 目标语言
 * @returns 格式化的字符串
 */
export function formatWeight(grams: number, locale: string): string {
  const labels = getLabels(locale);

  if (locale === 'en') {
    // 美国单位：大于 454g (1lb) 用磅，否则用盎司
    if (grams >= 454) {
      const lbs = Math.round((grams / 453.592) * 10) / 10;
      return `${lbs} ${labels.weight.large}`;
    } else {
      const oz = Math.round((grams / 28.3495) * 10) / 10;
      return `${oz} ${labels.weight.small}`;
    }
  } else {
    // 国际单位：大于 1000g 用千克，否则用克
    if (grams >= 1000) {
      const kg = Math.round((grams / 1000) * 10) / 10;
      return `${kg} ${labels.weight.large}`;
    } else {
      return `${Math.round(grams)} ${labels.weight.small}`;
    }
  }
}

/**
 * 解析用户输入的重量为克（数据库存储单位）
 */
export function parseWeight(value: number, unit: string): number {
  const normalizedUnit = unit.toLowerCase().trim();
  switch (normalizedUnit) {
    case 'oz':
    case 'ounce':
    case 'ounces':
      return value * 28.3495;
    case 'lb':
    case 'lbs':
    case 'pound':
    case 'pounds':
      return value * 453.592;
    case 'kg':
    case 'kilogram':
    case 'kilograms':
    case '千克':
    case '公斤':
      return value * 1000;
    case 'g':
    case 'gram':
    case 'grams':
    case '克':
    default:
      return value;
  }
}

// ==================== 容量转换 ====================

/**
 * 将毫升转换为目标语言的单位
 * @param ml 毫升（数据库存储单位）
 * @param locale 目标语言
 */
export function formatVolume(ml: number, locale: string): string {
  const labels = getLabels(locale);

  if (locale === 'en') {
    // 美国单位：大于 237ml (1 cup) 用杯，否则用液体盎司
    if (ml >= 237) {
      const cups = Math.round((ml / 236.588) * 10) / 10;
      return `${cups} ${labels.volume.large}`;
    } else {
      const flOz = Math.round((ml / 29.5735) * 10) / 10;
      return `${flOz} ${labels.volume.small}`;
    }
  } else {
    // 国际单位：统一用毫升
    return `${Math.round(ml)} ${labels.volume.small}`;
  }
}

/**
 * 解析用户输入的容量为毫升（数据库存储单位）
 */
export function parseVolume(value: number, unit: string): number {
  const normalizedUnit = unit.toLowerCase().trim();
  switch (normalizedUnit) {
    case 'fl oz':
    case 'floz':
    case 'fluid ounce':
    case 'fluid ounces':
      return value * 29.5735;
    case 'cup':
    case 'cups':
      return value * 236.588;
    case 'tbsp':
    case 'tablespoon':
    case 'tablespoons':
      return value * 14.787;
    case 'tsp':
    case 'teaspoon':
    case 'teaspoons':
      return value * 4.929;
    case 'l':
    case 'liter':
    case 'liters':
    case '升':
      return value * 1000;
    case 'ml':
    case 'milliliter':
    case 'milliliters':
    case '毫升':
    default:
      return value;
  }
}

// ==================== 温度转换 ====================

/**
 * 将摄氏度转换为目标语言的单位
 * @param celsius 摄氏度（数据库存储单位）
 * @param locale 目标语言
 */
export function formatTemperature(celsius: number, locale: string): string {
  const labels = getLabels(locale);

  if (locale === 'en') {
    // 转换为华氏度
    const fahrenheit = Math.round(celsius * 9 / 5 + 32);
    return `${fahrenheit}${labels.temperature}`;
  } else {
    return `${Math.round(celsius)}${labels.temperature}`;
  }
}

/**
 * 解析用户输入的温度为摄氏度（数据库存储单位）
 */
export function parseTemperature(value: number, unit: string): number {
  const normalizedUnit = unit.toUpperCase().trim();
  if (normalizedUnit.includes('F') || normalizedUnit.includes('°F')) {
    return Math.round((value - 32) * 5 / 9);
  }
  return value;
}

// ==================== 长度转换 ====================

/**
 * 将厘米转换为目标语言的单位
 */
export function formatLength(cm: number, locale: string): string {
  const labels = getLabels(locale);

  if (locale === 'en') {
    const inches = Math.round((cm / 2.54) * 10) / 10;
    return `${inches} ${labels.length}`;
  } else {
    return `${Math.round(cm)} ${labels.length}`;
  }
}

/**
 * 解析用户输入的长度为厘米（数据库存储单位）
 */
export function parseLength(value: number, unit: string): number {
  const normalizedUnit = unit.toLowerCase().trim();
  switch (normalizedUnit) {
    case 'in':
    case 'inch':
    case 'inches':
      return value * 2.54;
    case 'm':
    case 'meter':
    case 'meters':
    case '米':
      return value * 100;
    case 'cm':
    case 'centimeter':
    case 'centimeters':
    case '厘米':
    default:
      return value;
  }
}

// ==================== 食材格式化 ====================

export interface Ingredient {
  name: string;
  amount: number;      // 数据库存储：克或毫升
  unit: 'g' | 'ml' | 'piece' | 'tbsp' | 'tsp' | 'clove' | 'sprig';
  price?: number;
}

export interface LocalizedIngredient {
  name: string;
  amount: string;      // 格式化后的数量字符串
  price?: number;
}

/**
 * 格式化单个食材为目标语言
 */
export function formatIngredient(ingredient: Ingredient, locale: string): LocalizedIngredient {
  const { name, amount, unit, price } = ingredient;

  let formattedAmount: string;

  switch (unit) {
    case 'g':
      formattedAmount = formatWeight(amount, locale);
      break;
    case 'ml':
      formattedAmount = formatVolume(amount, locale);
      break;
    case 'piece':
      formattedAmount = `${amount}`;
      break;
    case 'tbsp':
      formattedAmount = locale === 'zh' ? `${amount} 汤匙` : locale === 'de' ? `${amount} EL` : `${amount} tbsp`;
      break;
    case 'tsp':
      formattedAmount = locale === 'zh' ? `${amount} 茶匙` : locale === 'de' ? `${amount} TL` : `${amount} tsp`;
      break;
    case 'clove':
      formattedAmount = locale === 'zh' ? `${amount} 瓣` : locale === 'de' ? `${amount} Zehe(n)` : `${amount} clove(s)`;
      break;
    case 'sprig':
      formattedAmount = locale === 'zh' ? `${amount} 枝` : locale === 'de' ? `${amount} Zweig(e)` : `${amount} sprig(s)`;
      break;
    default:
      formattedAmount = `${amount} ${unit}`;
  }

  return {
    name,
    amount: formattedAmount,
    price,
  };
}

/**
 * 批量格式化食材列表
 */
export function formatIngredients(ingredients: Ingredient[], locale: string): LocalizedIngredient[] {
  return ingredients.map(ing => formatIngredient(ing, locale));
}

// ==================== 烹饪说明本地化 ====================

/**
 * 替换烹饪说明中的温度为目标语言
 * 例如：将 "230°C" 转换为 "450°F"（英语）
 */
export function localizeInstructions(instructions: string[], locale: string): string[] {
  if (locale !== 'en') return instructions;

  return instructions.map(instruction => {
    // 匹配摄氏度温度：数字后跟 °C 或 ℃
    return instruction.replace(/(\d+)\s*[°℃]C/gi, (match, temp) => {
      const fahrenheit = Math.round(parseInt(temp) * 9 / 5 + 32);
      return `${fahrenheit}°F`;
    });
  });
}

/**
 * 本地化烹饪时间
 */
export function formatCookingTime(minutes: number, locale: string): string {
  if (minutes < 60) {
    switch (locale) {
      case 'zh':
        return `${minutes} 分钟`;
      case 'de':
        return `${minutes} Minuten`;
      default:
        return `${minutes} min`;
    }
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  switch (locale) {
    case 'zh':
      return remainingMinutes > 0
        ? `${hours} 小时 ${remainingMinutes} 分钟`
        : `${hours} 小时`;
    case 'de':
      return remainingMinutes > 0
        ? `${hours} Std. ${remainingMinutes} Min.`
        : `${hours} Stunde(n)`;
    default:
      return remainingMinutes > 0
        ? `${hours}h ${remainingMinutes}min`
        : `${hours}h`;
  }
}

// ==================== 价格格式化 ====================

/**
 * 格式化价格
 */
export function formatPrice(cents: number, locale: string, currency: string = 'USD'): string {
  const amount = cents / 100;

  return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : locale === 'de' ? 'de-DE' : 'en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

