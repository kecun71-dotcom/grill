/**
 * BBQ 图片获取工具
 * 
 * 根据食谱名称或 imageQuery 智能匹配最合适的烧烤图片
 */

import {
  imageCategories,
  keywordToCategory,
  defaultBBQImage,
} from '@/config/images/bbq-images';

type ImageCategory = keyof typeof imageCategories;

/**
 * 根据查询字符串获取匹配的 BBQ 图片
 * 
 * @param query - 食谱名称或 imageQuery
 * @param index - 可选索引，用于同一类别获取不同图片
 * @returns 匹配的图片 URL
 */
export function getBBQImage(query: string, index: number = 0): string {
  if (!query) {
    return defaultBBQImage;
  }

  const lowerQuery = query.toLowerCase();
  
  // 查找匹配的类别
  let matchedCategory: ImageCategory | null = null;
  let matchScore = 0;

  // 遍历所有关键词，找到最佳匹配
  for (const [keyword, category] of Object.entries(keywordToCategory)) {
    if (lowerQuery.includes(keyword)) {
      // 优先选择更长的匹配（更精确）
      if (keyword.length > matchScore) {
        matchScore = keyword.length;
        matchedCategory = category;
      }
    }
  }

  // 如果没有找到匹配，使用默认图片
  if (!matchedCategory) {
    // 尝试一些通用匹配
    if (lowerQuery.includes('grill') || lowerQuery.includes('bbq') || lowerQuery.includes('barbecue')) {
      matchedCategory = 'other';
    } else if (lowerQuery.includes('meat') || lowerQuery.includes('fleisch')) {
      matchedCategory = 'beef';
    } else {
      return defaultBBQImage;
    }
  }

  // 从匹配的类别中获取图片
  const images = imageCategories[matchedCategory];
  if (!images || images.length === 0) {
    return defaultBBQImage;
  }

  // 使用 index 来获取不同的图片（避免同一页面图片重复）
  const imageIndex = Math.abs(index) % images.length;
  return images[imageIndex];
}

/**
 * 根据食谱名称和 imageQuery 获取最佳匹配图片
 * 优先使用 imageQuery（由 AI 生成的更精确描述）
 * 
 * @param name - 食谱名称
 * @param imageQuery - AI 生成的图片查询词（可选）
 * @param index - 可选索引
 * @returns 匹配的图片 URL
 */
export function getRecipeImage(name: string, imageQuery?: string, index: number = 0): string {
  // 优先使用 imageQuery
  if (imageQuery) {
    const image = getBBQImage(imageQuery, index);
    if (image !== defaultBBQImage) {
      return image;
    }
  }

  // 回退到使用食谱名称
  return getBBQImage(name, index);
}

/**
 * 获取随机 BBQ 图片
 * 
 * @param category - 可选的类别限制
 * @returns 随机图片 URL
 */
export function getRandomBBQImage(category?: ImageCategory): string {
  if (category && imageCategories[category]) {
    const images = imageCategories[category];
    return images[Math.floor(Math.random() * images.length)];
  }

  // 从所有类别中随机选择
  const allCategories = Object.keys(imageCategories) as ImageCategory[];
  const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
  const images = imageCategories[randomCategory];
  return images[Math.floor(Math.random() * images.length)];
}

/**
 * 获取指定类别的图片列表
 * 
 * @param category - 图片类别
 * @returns 图片 URL 数组
 */
export function getImagesByCategory(category: ImageCategory): string[] {
  return imageCategories[category] || [];
}

/**
 * 检测查询词对应的类别
 * 
 * @param query - 查询字符串
 * @returns 匹配的类别或 null
 */
export function detectCategory(query: string): ImageCategory | null {
  const lowerQuery = query.toLowerCase();
  
  for (const [keyword, category] of Object.entries(keywordToCategory)) {
    if (lowerQuery.includes(keyword)) {
      return category;
    }
  }

  return null;
}

// 导出类型
export type { ImageCategory };

