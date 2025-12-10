# BBQ Menu AI - 图片资源

## 目录结构

```
images/bbq/
├── bbq-beef.jpg        # 牛肉烧烤 (800x600)
├── bbq-chicken.jpg     # 鸡肉烧烤 (800x600)
├── bbq-pork.jpg        # 猪肉烧烤 (800x600)
├── bbq-lamb.jpg        # 羊肉烧烤 (800x600)
├── bbq-fish.jpg        # 鱼类烧烤 (800x600)
├── bbq-shrimp.jpg      # 虾类烧烤 (800x600)
├── bbq-vegetables.jpg  # 蔬菜烧烤 (800x600)
├── bbq-kebab.jpg       # 烤串 (800x600)
├── bbq-sausage.jpg     # 香肠烧烤 (800x600)
└── bbq-intro.jpg       # 介绍图片 (1200x800)
```

## 图片规格

### 食谱卡片图片
- 尺寸: 800x600 像素
- 格式: JPG (优化后)
- 质量: 80%
- 文件大小: < 150KB

### 介绍/英雄图片
- 尺寸: 1200x800 像素
- 格式: JPG (优化后)
- 质量: 85%
- 文件大小: < 300KB

## 推荐图片来源

1. **Unsplash** (免费): https://unsplash.com/s/photos/bbq
2. **Pexels** (免费): https://pexels.com/search/barbecue
3. **Shutterstock** (付费): https://shutterstock.com

## 图片优化工具

- **TinyPNG**: https://tinypng.com
- **Squoosh**: https://squoosh.app
- **ImageOptim** (Mac): https://imageoptim.com

## 使用方法

在代码中引用图片:

```tsx
// 组件中使用
<img src="/images/bbq/bbq-beef.jpg" alt="Grilled Beef" />

// 或使用 Next.js Image
import Image from 'next/image';
<Image 
  src="/images/bbq/bbq-beef.jpg" 
  alt="Grilled Beef"
  width={800}
  height={600}
/>
```

## 占位图片

在没有真实图片之前，可以使用占位服务:

```html
<!-- 使用 placeholder.com -->
<img src="https://via.placeholder.com/800x600/FF6B35/FFFFFF?text=BBQ+Beef" />

<!-- 使用 picsum.photos (随机真实图片) -->
<img src="https://picsum.photos/800/600" />
```

## 注意事项

1. 确保所有图片都有合适的授权
2. 压缩图片以提高页面加载速度
3. 为所有图片添加适当的 alt 文本
4. 考虑使用 WebP 格式以获得更好的压缩效果

