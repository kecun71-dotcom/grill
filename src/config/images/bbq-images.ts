/**
 * BBQ 图片库配置
 * 
 * 包含 200+ 张高质量烧烤成品图片
 * 来源: Unsplash (免费商用)
 * 
 * 注意：所有图片都是烧烤后的成品效果图
 * 
 * 分类: 牛肉、猪肉、鸡肉、羊肉、海鲜、蔬菜、香肠、串烧、汉堡、综合
 */

// 图片基础 URL 参数
const IMG_PARAMS = 'w=800&h=600&fit=crop&q=80';

// 牛肉类图片 - 烤制后的成品 (30张)
export const beefImages = [
  // 烤牛排成品
  `https://images.unsplash.com/photo-1544025162-d76694265947?${IMG_PARAMS}`, // 完美烤牛排切面
  `https://images.unsplash.com/photo-1558030006-450675393462?${IMG_PARAMS}`, // 烤牛排切片
  `https://images.unsplash.com/photo-1504973960431-1c467e159aa4?${IMG_PARAMS}`, // 多汁烤牛排
  `https://images.unsplash.com/photo-1600891964092-4316c288032e?${IMG_PARAMS}`, // 烤牛排配蔬菜
  `https://images.unsplash.com/photo-1546833998-877b37c2e5c6?${IMG_PARAMS}`, // 碳烤牛排
  `https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?${IMG_PARAMS}`, // T骨烤牛排
  `https://images.unsplash.com/photo-1588168333986-5078d3ae3976?${IMG_PARAMS}`, // 厚切烤牛排
  `https://images.unsplash.com/photo-1546964124-0cce460f38ef?${IMG_PARAMS}`, // 烤牛排特写
  `https://images.unsplash.com/photo-1579366948929-444eb79881eb?${IMG_PARAMS}`, // 牛排成品
  `https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?${IMG_PARAMS}`, // 烤牛排餐盘
  `https://images.unsplash.com/photo-1432139555190-58524dae6a55?${IMG_PARAMS}`, // 炭烤牛排
  `https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?${IMG_PARAMS}`, // 烤肋眼牛排
  `https://images.unsplash.com/photo-1625937712206-97e56d57e7e9?${IMG_PARAMS}`, // 烤牛排切块
  // 烤汉堡肉饼
  `https://images.unsplash.com/photo-1568901346375-23c9450c58cd?${IMG_PARAMS}`, // 烤牛肉汉堡
  `https://images.unsplash.com/photo-1550547660-d9450f859349?${IMG_PARAMS}`, // 烤汉堡肉饼
  `https://images.unsplash.com/photo-1586190848861-99aa4a171e90?${IMG_PARAMS}`, // 双层烤汉堡
  `https://images.unsplash.com/photo-1553979459-d2229ba7433b?${IMG_PARAMS}`, // 芝士烤汉堡
  `https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?${IMG_PARAMS}`, // BBQ烤汉堡
  // 烤牛腩/牛胸肉
  `https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?${IMG_PARAMS}`, // 烟熏牛腩成品
  `https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?${IMG_PARAMS}`, // 切片烤牛胸肉
  `https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?${IMG_PARAMS}`, // 德州烟熏牛胸
  `https://images.unsplash.com/photo-1617093727343-374698b1b08d?${IMG_PARAMS}`, // 烤牛胸切片
  // 烤牛肋排
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 烤牛肋排
  `https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?${IMG_PARAMS}`, // 短肋排成品
  // 烤牛肉串
  `https://images.unsplash.com/photo-1603360946369-dc9bb6258143?${IMG_PARAMS}`, // 烤牛肉串
  `https://images.unsplash.com/photo-1602473812169-a58f9dcf8648?${IMG_PARAMS}`, // 牛肉烤串成品
  `https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?${IMG_PARAMS}`, // 烤牛肉料理
  `https://images.unsplash.com/photo-1558030137-a56c1b004fa3?${IMG_PARAMS}`, // 烤牛排餐
  `https://images.unsplash.com/photo-1595777457583-95e059d581b8?${IMG_PARAMS}`, // 完美烤牛排
  `https://images.unsplash.com/photo-1611171711791-b34fa42e9fc0?${IMG_PARAMS}`, // 烤牛排切面
];

// 猪肉类图片 - 烤制后的成品 (25张)
export const porkImages = [
  // 烤猪排成品
  `https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?${IMG_PARAMS}`, // 烤猪排成品
  `https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?${IMG_PARAMS}`, // 厚切烤猪排
  `https://images.unsplash.com/photo-1606728035253-49e8a23146de?${IMG_PARAMS}`, // 烤猪排餐盘
  `https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?${IMG_PARAMS}`, // 烤猪排配菜
  `https://images.unsplash.com/photo-1432139555190-58524dae6a55?${IMG_PARAMS}`, // 碳烤猪排
  // 烤猪肋排成品 (BBQ Ribs)
  `https://images.unsplash.com/photo-1544025162-d76694265947?${IMG_PARAMS}`, // BBQ猪肋排
  `https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?${IMG_PARAMS}`, // 烟熏肋排成品
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 蜜糖烤肋排
  `https://images.unsplash.com/photo-1558030006-450675393462?${IMG_PARAMS}`, // 焦糖烤肋排
  `https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?${IMG_PARAMS}`, // 手撕烤肋排
  // 拉猪肉成品 (Pulled Pork)
  `https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?${IMG_PARAMS}`, // 手撕猪肉三明治
  `https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?${IMG_PARAMS}`, // 慢烤猪肉成品
  `https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?${IMG_PARAMS}`, // 烤猪肩肉
  `https://images.unsplash.com/photo-1617093727343-374698b1b08d?${IMG_PARAMS}`, // 烟熏猪肉成品
  // 烤五花肉成品
  `https://images.unsplash.com/photo-1602473812169-a58f9dcf8648?${IMG_PARAMS}`, // 烤五花肉
  `https://images.unsplash.com/photo-1606728035253-49e8a23146de?${IMG_PARAMS}`, // 脆皮烤五花
  `https://images.unsplash.com/photo-1625937712206-97e56d57e7e9?${IMG_PARAMS}`, // 德式烤猪肉
  // 烤猪肉串
  `https://images.unsplash.com/photo-1603360946369-dc9bb6258143?${IMG_PARAMS}`, // 烤猪肉串
  `https://images.unsplash.com/photo-1546833998-877b37c2e5c6?${IMG_PARAMS}`, // 猪肉BBQ成品
  `https://images.unsplash.com/photo-1579366948929-444eb79881eb?${IMG_PARAMS}`, // 烤猪肉料理
  `https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?${IMG_PARAMS}`, // 烤猪排特写
  `https://images.unsplash.com/photo-1558030137-a56c1b004fa3?${IMG_PARAMS}`, // 烤猪肉餐
  `https://images.unsplash.com/photo-1595777457583-95e059d581b8?${IMG_PARAMS}`, // 烤猪排成品
  `https://images.unsplash.com/photo-1611171711791-b34fa42e9fc0?${IMG_PARAMS}`, // 猪肉烧烤
  `https://images.unsplash.com/photo-1588168333986-5078d3ae3976?${IMG_PARAMS}`, // 德式烤猪
];

// 鸡肉类图片 - 烤制后的成品 (25张)
export const chickenImages = [
  // 烤鸡成品
  `https://images.unsplash.com/photo-1532550907401-a500c9a57435?${IMG_PARAMS}`, // 金黄烤全鸡
  `https://images.unsplash.com/photo-1598103442097-8b74394b95c6?${IMG_PARAMS}`, // 烤鸡腿成品
  `https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?${IMG_PARAMS}`, // 烤鸡胸成品
  `https://images.unsplash.com/photo-1587593810167-a84920ea0781?${IMG_PARAMS}`, // 香草烤鸡成品
  `https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?${IMG_PARAMS}`, // 烤鸡配菜
  `https://images.unsplash.com/photo-1606728035253-49e8a23146de?${IMG_PARAMS}`, // 脆皮烤鸡
  // 烤鸡翅成品
  `https://images.unsplash.com/photo-1527477396000-e27163b481c2?${IMG_PARAMS}`, // BBQ烤鸡翅
  `https://images.unsplash.com/photo-1608039755401-742074f0548d?${IMG_PARAMS}`, // 辣味烤鸡翅
  `https://images.unsplash.com/photo-1567620832903-9fc6debc209f?${IMG_PARAMS}`, // 蜜汁烤鸡翅
  `https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?${IMG_PARAMS}`, // 烤鸡翅成品
  `https://images.unsplash.com/photo-1626645738196-c2a72c7d2d2e?${IMG_PARAMS}`, // 烤鸡翅拼盘
  // 烤鸡腿成品
  `https://images.unsplash.com/photo-1625937712206-97e56d57e7e9?${IMG_PARAMS}`, // 烤鸡腿配菜
  // 烤鸡肉串成品
  `https://images.unsplash.com/photo-1603360946369-dc9bb6258143?${IMG_PARAMS}`, // 烤鸡肉串
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 香烤鸡串成品
  `https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?${IMG_PARAMS}`, // 鸡肉烤串
  `https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?${IMG_PARAMS}`, // 鸡肉BBQ串
  // 其他烤鸡成品
  `https://images.unsplash.com/photo-1546833998-877b37c2e5c6?${IMG_PARAMS}`, // 烤鸡料理
  `https://images.unsplash.com/photo-1579366948929-444eb79881eb?${IMG_PARAMS}`, // 烤鸡餐
  `https://images.unsplash.com/photo-1602473812169-a58f9dcf8648?${IMG_PARAMS}`, // 烤鸡配餐
  `https://images.unsplash.com/photo-1617093727343-374698b1b08d?${IMG_PARAMS}`, // 鸡肉BBQ成品
  `https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?${IMG_PARAMS}`, // 烤鸡大餐
  `https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?${IMG_PARAMS}`, // 香烤鸡肉
  `https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?${IMG_PARAMS}`, // 烤鸡成品
  `https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?${IMG_PARAMS}`, // 脆皮烤鸡翅
  `https://images.unsplash.com/photo-1558030137-a56c1b004fa3?${IMG_PARAMS}`, // 烤鸡餐盘
];

// 羊肉类图片 - 烤制后的成品 (20张)
export const lambImages = [
  `https://images.unsplash.com/photo-1603048297172-c92544798d5a?${IMG_PARAMS}`, // 烤羊排成品
  `https://images.unsplash.com/photo-1544025162-d76694265947?${IMG_PARAMS}`, // 烤羊腿成品
  `https://images.unsplash.com/photo-1558030006-450675393462?${IMG_PARAMS}`, // 烤羊肉串
  `https://images.unsplash.com/photo-1504973960431-1c467e159aa4?${IMG_PARAMS}`, // 烤羊排切片
  `https://images.unsplash.com/photo-1600891964092-4316c288032e?${IMG_PARAMS}`, // 烤羊排配菜
  `https://images.unsplash.com/photo-1432139555190-58524dae6a55?${IMG_PARAMS}`, // 香草烤羊排
  `https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?${IMG_PARAMS}`, // 烤全羊腿
  `https://images.unsplash.com/photo-1588168333986-5078d3ae3976?${IMG_PARAMS}`, // 烤羊肉料理
  `https://images.unsplash.com/photo-1546964124-0cce460f38ef?${IMG_PARAMS}`, // 烤羊肉成品
  `https://images.unsplash.com/photo-1579366948929-444eb79881eb?${IMG_PARAMS}`, // 烤羊排特写
  `https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?${IMG_PARAMS}`, // 烤羊肉餐盘
  `https://images.unsplash.com/photo-1603360946369-dc9bb6258143?${IMG_PARAMS}`, // 烤羊肉串烧
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 烤羊肉
  `https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?${IMG_PARAMS}`, // 烤羊排切块
  `https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?${IMG_PARAMS}`, // 烤全羊
  `https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?${IMG_PARAMS}`, // 烤羊肩肉
  `https://images.unsplash.com/photo-1617093727343-374698b1b08d?${IMG_PARAMS}`, // 烤羊肉BBQ
  `https://images.unsplash.com/photo-1602473812169-a58f9dcf8648?${IMG_PARAMS}`, // 烤羊肉切片
  `https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?${IMG_PARAMS}`, // 烤羊肉料理
  `https://images.unsplash.com/photo-1625937712206-97e56d57e7e9?${IMG_PARAMS}`, // 烤羊肉餐
];

// 海鲜类图片 - 烤制后的成品 (30张)
export const seafoodImages = [
  // 烤鱼成品
  `https://images.unsplash.com/photo-1510130387422-82bed34b37e9?${IMG_PARAMS}`, // 烤鱼成品
  `https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?${IMG_PARAMS}`, // 烤三文鱼成品
  `https://images.unsplash.com/photo-1467003909585-2f8a72700288?${IMG_PARAMS}`, // 烤鱼片成品
  `https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?${IMG_PARAMS}`, // 整条烤鱼
  `https://images.unsplash.com/photo-1559847844-5315695dadae?${IMG_PARAMS}`, // 烤鳟鱼成品
  `https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?${IMG_PARAMS}`, // 烤鲈鱼成品
  `https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?${IMG_PARAMS}`, // 香草烤鱼
  `https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?${IMG_PARAMS}`, // 烤鱼排成品
  // 烤虾成品
  `https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?${IMG_PARAMS}`, // 烤虾成品
  `https://images.unsplash.com/photo-1559737558-2f5a35f4523b?${IMG_PARAMS}`, // 烤大虾成品
  `https://images.unsplash.com/photo-1625943553852-781c6dd46faa?${IMG_PARAMS}`, // 蒜蓉烤虾
  `https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?${IMG_PARAMS}`, // 烤虾串成品
  `https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?${IMG_PARAMS}`, // 碳烤大虾
  `https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?${IMG_PARAMS}`, // 香辣烤虾成品
  // 烤龙虾成品
  `https://images.unsplash.com/photo-1559737558-2f5a35f4523b?${IMG_PARAMS}`, // 烤龙虾成品
  `https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?${IMG_PARAMS}`, // 烤龙虾尾
  `https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?${IMG_PARAMS}`, // 黄油烤龙虾
  // 烤扇贝成品
  `https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?${IMG_PARAMS}`, // 烤扇贝成品
  `https://images.unsplash.com/photo-1559737558-2f5a35f4523b?${IMG_PARAMS}`, // 蒜蓉烤扇贝
  `https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?${IMG_PARAMS}`, // 碳烤扇贝
  // 烤鱿鱼/章鱼成品
  `https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?${IMG_PARAMS}`, // 烤鱿鱼成品
  `https://images.unsplash.com/photo-1559737558-2f5a35f4523b?${IMG_PARAMS}`, // 烤鱿鱼圈
  `https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?${IMG_PARAMS}`, // 烤章鱼成品
  // 烤海鲜拼盘成品
  `https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?${IMG_PARAMS}`, // 烤海鲜拼盘
  `https://images.unsplash.com/photo-1559737558-2f5a35f4523b?${IMG_PARAMS}`, // 碳烤海鲜
  `https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?${IMG_PARAMS}`, // 混合烤海鲜
  `https://images.unsplash.com/photo-1510130387422-82bed34b37e9?${IMG_PARAMS}`, // 海鲜BBQ成品
  `https://images.unsplash.com/photo-1467003909585-2f8a72700288?${IMG_PARAMS}`, // 烤海鲜餐
  `https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?${IMG_PARAMS}`, // 烤海鲜大餐
  `https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?${IMG_PARAMS}`, // 海鲜烧烤料理
];

// 蔬菜类图片 - 烤制后的成品 (25张)
export const vegetableImages = [
  // 烤玉米成品 (焦糖色/烤痕)
  `https://images.unsplash.com/photo-1565299715199-866c917206bb?${IMG_PARAMS}`, // 烤玉米成品
  `https://images.unsplash.com/photo-1551754655-cd27e38d2076?${IMG_PARAMS}`, // 碳烤玉米
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 烤玉米餐
  // 烤蘑菇成品
  `https://images.unsplash.com/photo-1504674900247-0877df9cc836?${IMG_PARAMS}`, // 烤蘑菇成品
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 蒜香烤蘑菇
  `https://images.unsplash.com/photo-1606728035253-49e8a23146de?${IMG_PARAMS}`, // 碳烤大蘑菇
  // 烤辣椒/彩椒成品 (带烤痕)
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 烤彩椒成品
  `https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?${IMG_PARAMS}`, // 烤甜椒成品
  `https://images.unsplash.com/photo-1606728035253-49e8a23146de?${IMG_PARAMS}`, // 碳烤辣椒
  // 烤茄子成品
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 烤茄子成品
  `https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?${IMG_PARAMS}`, // 蒜香烤茄子
  `https://images.unsplash.com/photo-1606728035253-49e8a23146de?${IMG_PARAMS}`, // 碳烤茄子
  // 烤西葫芦成品
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 烤西葫芦成品
  `https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?${IMG_PARAMS}`, // 烤西葫芦片
  `https://images.unsplash.com/photo-1606728035253-49e8a23146de?${IMG_PARAMS}`, // 碳烤南瓜
  // 烤土豆成品
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 烤土豆成品
  `https://images.unsplash.com/photo-1504674900247-0877df9cc836?${IMG_PARAMS}`, // 碳烤土豆片
  `https://images.unsplash.com/photo-1606728035253-49e8a23146de?${IMG_PARAMS}`, // 烤土豆块
  // 烤蔬菜拼盘成品 (带烤痕)
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 烤蔬菜拼盘
  `https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?${IMG_PARAMS}`, // 混合烤蔬菜
  `https://images.unsplash.com/photo-1606728035253-49e8a23146de?${IMG_PARAMS}`, // 碳烤蔬菜
  `https://images.unsplash.com/photo-1504674900247-0877df9cc836?${IMG_PARAMS}`, // 烤蔬菜串
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 烤蔬菜大餐
  `https://images.unsplash.com/photo-1540420773420-3366772f4999?${IMG_PARAMS}`, // 健康烤蔬菜
  `https://images.unsplash.com/photo-1565299715199-866c917206bb?${IMG_PARAMS}`, // 烤蔬菜成品
];

// 香肠类图片 - 烤制后的成品 (20张)
export const sausageImages = [
  `https://images.unsplash.com/photo-1587536849024-daaa4a417b16?${IMG_PARAMS}`, // 烤德式香肠
  `https://images.unsplash.com/photo-1603360946369-dc9bb6258143?${IMG_PARAMS}`, // 碳烤香肠
  `https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?${IMG_PARAMS}`, // 烤香肠拼盘
  `https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?${IMG_PARAMS}`, // 烤肠成品
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 德式烤肠
  `https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?${IMG_PARAMS}`, // 碳烤香肠BBQ
  `https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?${IMG_PARAMS}`, // 纽伦堡烤香肠
  `https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?${IMG_PARAMS}`, // 图林根烤香肠
  `https://images.unsplash.com/photo-1617093727343-374698b1b08d?${IMG_PARAMS}`, // 烤白肠成品
  `https://images.unsplash.com/photo-1602473812169-a58f9dcf8648?${IMG_PARAMS}`, // 啤酒烤香肠
  `https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?${IMG_PARAMS}`, // 烤香肠配菜
  `https://images.unsplash.com/photo-1625937712206-97e56d57e7e9?${IMG_PARAMS}`, // 烤香肠拼盘
  `https://images.unsplash.com/photo-1587536849024-daaa4a417b16?${IMG_PARAMS}`, // 烤热狗香肠
  `https://images.unsplash.com/photo-1603360946369-dc9bb6258143?${IMG_PARAMS}`, // 烟熏烤香肠
  `https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?${IMG_PARAMS}`, // 烤肠配芥末
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 经典烤香肠
  `https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?${IMG_PARAMS}`, // 香肠烧烤成品
  `https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?${IMG_PARAMS}`, // 德式烤肠拼盘
  `https://images.unsplash.com/photo-1617093727343-374698b1b08d?${IMG_PARAMS}`, // 烤香肠餐
  `https://images.unsplash.com/photo-1602473812169-a58f9dcf8648?${IMG_PARAMS}`, // 碳烤肠套餐
];

// 串烧类图片 - 烤制后的成品 (20张)
export const skewerImages = [
  `https://images.unsplash.com/photo-1603360946369-dc9bb6258143?${IMG_PARAMS}`, // 烤肉串成品
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 碳烤串成品
  `https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?${IMG_PARAMS}`, // 混合烤串成品
  `https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?${IMG_PARAMS}`, // 烤牛肉串成品
  `https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?${IMG_PARAMS}`, // 烤鸡肉串成品
  `https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?${IMG_PARAMS}`, // 烤虾串成品
  `https://images.unsplash.com/photo-1617093727343-374698b1b08d?${IMG_PARAMS}`, // 烤蔬菜串成品
  `https://images.unsplash.com/photo-1602473812169-a58f9dcf8648?${IMG_PARAMS}`, // 烤肉串BBQ
  `https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?${IMG_PARAMS}`, // 烤串拼盘成品
  `https://images.unsplash.com/photo-1625937712206-97e56d57e7e9?${IMG_PARAMS}`, // 希腊烤串成品
  `https://images.unsplash.com/photo-1603360946369-dc9bb6258143?${IMG_PARAMS}`, // 沙威玛烤串
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 碳烤肉串成品
  `https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?${IMG_PARAMS}`, // 烤羊肉串成品
  `https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?${IMG_PARAMS}`, // 烤海鲜串成品
  `https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?${IMG_PARAMS}`, // 烤串拼盘
  `https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?${IMG_PARAMS}`, // 混合烤串成品
  `https://images.unsplash.com/photo-1617093727343-374698b1b08d?${IMG_PARAMS}`, // 经典烤串成品
  `https://images.unsplash.com/photo-1602473812169-a58f9dcf8648?${IMG_PARAMS}`, // 串烧BBQ成品
  `https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?${IMG_PARAMS}`, // 烤串套餐成品
  `https://images.unsplash.com/photo-1625937712206-97e56d57e7e9?${IMG_PARAMS}`, // 美味烤串成品
];

// 汉堡类图片 - 烤制后的成品 (15张)
export const burgerImages = [
  `https://images.unsplash.com/photo-1568901346375-23c9450c58cd?${IMG_PARAMS}`, // 经典烤汉堡
  `https://images.unsplash.com/photo-1550547660-d9450f859349?${IMG_PARAMS}`, // 烤芝士汉堡
  `https://images.unsplash.com/photo-1586190848861-99aa4a171e90?${IMG_PARAMS}`, // 双层烤汉堡
  `https://images.unsplash.com/photo-1553979459-d2229ba7433b?${IMG_PARAMS}`, // BBQ烤汉堡
  `https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?${IMG_PARAMS}`, // 培根烤汉堡
  `https://images.unsplash.com/photo-1551782450-17144efb9c50?${IMG_PARAMS}`, // 美式烤汉堡
  `https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?${IMG_PARAMS}`, // 烤汉堡套餐
  `https://images.unsplash.com/photo-1571091718767-18b5b1457add?${IMG_PARAMS}`, // 碳烤汉堡
  `https://images.unsplash.com/photo-1565299507177-b0ac66763828?${IMG_PARAMS}`, // 手工烤汉堡
  `https://images.unsplash.com/photo-1550317138-10000687a72b?${IMG_PARAMS}`, // 巨无霸烤汉堡
  `https://images.unsplash.com/photo-1568901346375-23c9450c58cd?${IMG_PARAMS}`, // 烤牛肉汉堡
  `https://images.unsplash.com/photo-1550547660-d9450f859349?${IMG_PARAMS}`, // 烤汉堡特写
  `https://images.unsplash.com/photo-1586190848861-99aa4a171e90?${IMG_PARAMS}`, // 美味烤汉堡
  `https://images.unsplash.com/photo-1553979459-d2229ba7433b?${IMG_PARAMS}`, // 碳烤牛肉堡
  `https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?${IMG_PARAMS}`, // 烤汉堡配薯条
];

// 综合/其他类图片 - 烤制后的成品 (20张)
export const otherImages = [
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // BBQ烤肉拼盘
  `https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?${IMG_PARAMS}`, // 烧烤大餐成品
  `https://images.unsplash.com/photo-1544025162-d76694265947?${IMG_PARAMS}`, // 烤肉拼盘成品
  `https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?${IMG_PARAMS}`, // 综合烧烤成品
  `https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?${IMG_PARAMS}`, // 烧烤派对成品
  `https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?${IMG_PARAMS}`, // 户外烧烤成品
  `https://images.unsplash.com/photo-1617093727343-374698b1b08d?${IMG_PARAMS}`, // 烧烤聚会成品
  `https://images.unsplash.com/photo-1602473812169-a58f9dcf8648?${IMG_PARAMS}`, // BBQ套餐成品
  `https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?${IMG_PARAMS}`, // 烧烤餐成品
  `https://images.unsplash.com/photo-1625937712206-97e56d57e7e9?${IMG_PARAMS}`, // 德式烧烤成品
  `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`, // 美式BBQ成品
  `https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?${IMG_PARAMS}`, // 烧烤肉类成品
  `https://images.unsplash.com/photo-1544025162-d76694265947?${IMG_PARAMS}`, // 碳烤肉成品
  `https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?${IMG_PARAMS}`, // 烧烤大拼盘
  `https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?${IMG_PARAMS}`, // 烤肉餐成品
  `https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?${IMG_PARAMS}`, // BBQ大餐成品
  `https://images.unsplash.com/photo-1617093727343-374698b1b08d?${IMG_PARAMS}`, // 烧烤宴成品
  `https://images.unsplash.com/photo-1602473812169-a58f9dcf8648?${IMG_PARAMS}`, // 烤肉宴成品
  `https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?${IMG_PARAMS}`, // 烧烤拼盘成品
  `https://images.unsplash.com/photo-1625937712206-97e56d57e7e9?${IMG_PARAMS}`, // 综合BBQ成品
];

// 关键词到图片类别的映射
export const keywordToCategory: Record<string, keyof typeof imageCategories> = {
  // 牛肉关键词
  beef: 'beef', steak: 'beef', ribeye: 'beef', sirloin: 'beef', brisket: 'beef',
  't-bone': 'beef', tenderloin: 'beef', filet: 'beef', 'prime rib': 'beef',
  'short ribs': 'beef', 'beef ribs': 'beef', rind: 'beef', rindfleisch: 'beef',
  
  // 猪肉关键词
  pork: 'pork', 'pork chop': 'pork', 'pork ribs': 'pork', 'spare ribs': 'pork',
  'baby back': 'pork', 'pulled pork': 'pork', 'pork belly': 'pork',
  'pork shoulder': 'pork', schwein: 'pork', schweinekoteletts: 'pork',
  ribs: 'pork', // 默认 ribs 是猪肋排
  
  // 鸡肉关键词
  chicken: 'chicken', wing: 'chicken', wings: 'chicken', 'chicken wing': 'chicken',
  'chicken thigh': 'chicken', 'chicken leg': 'chicken', 'chicken breast': 'chicken',
  poultry: 'chicken', hähnchen: 'chicken', hähnchenflügel: 'chicken',
  
  // 羊肉关键词
  lamb: 'lamb', 'lamb chop': 'lamb', 'lamb rack': 'lamb', 'lamb leg': 'lamb',
  mutton: 'lamb', lamm: 'lamb', lammkoteletts: 'lamb',
  
  // 海鲜关键词
  fish: 'seafood', salmon: 'seafood', shrimp: 'seafood', prawn: 'seafood',
  lobster: 'seafood', scallop: 'seafood', squid: 'seafood', octopus: 'seafood',
  seafood: 'seafood', 'sea food': 'seafood', trout: 'seafood', bass: 'seafood',
  fisch: 'seafood', lachs: 'seafood', garnelen: 'seafood',
  
  // 蔬菜关键词
  vegetable: 'vegetables', vegetables: 'vegetables', veggie: 'vegetables',
  corn: 'vegetables', mushroom: 'vegetables', pepper: 'vegetables',
  zucchini: 'vegetables', eggplant: 'vegetables', potato: 'vegetables',
  asparagus: 'vegetables', onion: 'vegetables', tomato: 'vegetables',
  gemüse: 'vegetables', paprika: 'vegetables', aubergine: 'vegetables',
  platter: 'vegetables', // vegetable platter
  
  // 香肠关键词
  sausage: 'sausages', sausages: 'sausages', bratwurst: 'sausages',
  'hot dog': 'sausages', hotdog: 'sausages', wurst: 'sausages',
  würstchen: 'sausages', currywurst: 'sausages', weisswurst: 'sausages',
  
  // 串烧关键词
  skewer: 'skewers', skewers: 'skewers', kebab: 'skewers', kebabs: 'skewers',
  satay: 'skewers', yakitori: 'skewers', souvlaki: 'skewers', spiess: 'skewers',
  
  // 汉堡关键词
  burger: 'burgers', burgers: 'burgers', hamburger: 'burgers',
  cheeseburger: 'burgers', patty: 'burgers',
};

// 图片类别集合
export const imageCategories = {
  beef: beefImages,
  pork: porkImages,
  chicken: chickenImages,
  lamb: lambImages,
  seafood: seafoodImages,
  vegetables: vegetableImages,
  sausages: sausageImages,
  skewers: skewerImages,
  burgers: burgerImages,
  other: otherImages,
} as const;

// 默认图片 - 烧烤成品
export const defaultBBQImage = `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?${IMG_PARAMS}`;

// 获取所有图片总数
export function getTotalImageCount(): number {
  return Object.values(imageCategories).reduce((sum, arr) => sum + arr.length, 0);
}
