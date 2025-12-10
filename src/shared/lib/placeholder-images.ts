/**
 * 占位图片配置
 * 在没有真实图片之前，使用这些 URL 作为占位符
 * 
 * 使用方法:
 * import { getPlaceholderImage } from '@/shared/lib/placeholder-images';
 * <Image src={getPlaceholderImage('bbq-steak')} ... />
 */

// Unsplash 图片 URL (高质量免费图片)
const unsplashImages: Record<string, string> = {
  // Hero 区域
  'hero-bbq': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop',
  
  // BBQ 食材图片
  'bbq-beef': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop',
  'bbq-chicken': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=600&fit=crop',
  'bbq-pork': 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&h=600&fit=crop',
  'bbq-ribs': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop',
  'bbq-sausage': 'https://images.unsplash.com/photo-1565299715199-866c917206bb?w=800&h=600&fit=crop',
  'bbq-vegetables': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
  'bbq-seafood': 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&h=600&fit=crop',
  
  // 博客文章图片
  'bbq-steak': 'https://images.unsplash.com/photo-1558030006-450675393462?w=1200&h=630&fit=crop',
  'bbq-wings': 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=1200&h=630&fit=crop',
  'veggie-bbq': 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200&h=630&fit=crop',
  'bbq-safety': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=630&fit=crop',
  'marinades': 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=1200&h=630&fit=crop',
  'grill-comparison': 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200&h=630&fit=crop',
  'smoking-guide': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=630&fit=crop',
  'grilled-seafood': 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=1200&h=630&fit=crop',
  'bbq-sides': 'https://images.unsplash.com/photo-1534938665420-4193effeacc4?w=1200&h=630&fit=crop',
  'bbq-rubs': 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=1200&h=630&fit=crop',
  'bbq-party': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=630&fit=crop',
  'low-carb-bbq': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=630&fit=crop',
  'grilled-desserts': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&h=630&fit=crop',
  'bbq-beginners': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=630&fit=crop',
  'asian-bbq': 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200&h=630&fit=crop',
  'grill-maintenance': 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200&h=630&fit=crop',
};

// 通用占位图生成器 (使用 placeholder.com 服务)
function generatePlaceholder(
  width: number,
  height: number,
  text: string,
  bgColor: string = 'FF6B35',
  textColor: string = 'FFFFFF'
): string {
  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
}

/**
 * 获取占位图片 URL
 * @param key 图片键名
 * @returns Unsplash 图片 URL 或生成的占位图
 */
export function getPlaceholderImage(key: string): string {
  return unsplashImages[key] || generatePlaceholder(800, 600, key.replace(/-/g, ' '));
}

/**
 * 获取博客占位图片
 * @param title 博客标题
 * @returns 占位图 URL
 */
export function getBlogPlaceholder(title: string): string {
  const key = title.toLowerCase().replace(/\s+/g, '-').slice(0, 20);
  return unsplashImages[key] || generatePlaceholder(1200, 630, title.slice(0, 30), 'FF6B35', 'FFFFFF');
}

/**
 * 获取食谱占位图片
 * @param type 食谱类型
 * @returns 占位图 URL
 */
export function getRecipePlaceholder(type: 'beef' | 'chicken' | 'pork' | 'seafood' | 'vegetables'): string {
  const mapping: Record<string, string> = {
    beef: 'bbq-beef',
    chicken: 'bbq-chicken',
    pork: 'bbq-pork',
    seafood: 'bbq-seafood',
    vegetables: 'bbq-vegetables',
  };
  return getPlaceholderImage(mapping[type] || 'bbq-beef');
}

/**
 * Hero 区域占位图
 */
export const heroPlaceholder = unsplashImages['hero-bbq'];

/**
 * 所有可用的占位图片键名
 */
export const availablePlaceholders = Object.keys(unsplashImages);

export default {
  getPlaceholderImage,
  getBlogPlaceholder,
  getRecipePlaceholder,
  heroPlaceholder,
  availablePlaceholders,
};

