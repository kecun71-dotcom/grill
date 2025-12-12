import { NextRequest, NextResponse } from 'next/server';

import { envConfigs } from '@/config';
import { buildBBQPrompt } from '@/config/prompts/bbq-menu';
import { getAuth } from '@/core/auth';
import { getUuid } from '@/shared/lib/hash';
import { consumeCredits, getRemainingCredits } from '@/shared/models/credit';

// AI 配置从环境变量读取
const AI_API_URL = envConfigs.ai_api_url;
const AI_API_KEY = envConfigs.ai_api_key;
const AI_MODEL = envConfigs.ai_model;

// 请求体类型
interface GenerateMenuRequest {
  servings?: number;
  budget?: 'low' | 'medium' | 'high';
  dietaryNeeds?: string[];
  preferences?: string;
  availableIngredients?: string;
  language?: string;
}

// AI 生成的食谱类型
interface AIGeneratedRecipe {
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number;
  ingredients: Array<{
    name: string;
    amount: number;
    unit: 'g' | 'ml' | 'piece' | 'tbsp' | 'tsp' | 'clove' | 'sprig';
    price?: number;
  }>;
  instructions: string[];
  imageQuery?: string;
}


// 解析 AI 响应
function parseAIResponse(text: string): AIGeneratedRecipe[] {
  // 移除 markdown 代码块
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();

  try {
    const recipes = JSON.parse(cleaned);
    if (!Array.isArray(recipes)) {
      throw new Error('Response is not an array');
    }
    return recipes;
  } catch (error) {
    console.error('Failed to parse AI response:', text);
    throw new Error('Failed to parse AI response as JSON');
  }
}

// 开发模式下的模拟数据
function getMockRecipes(language: string, servings: number): AIGeneratedRecipe[] {
  const recipes: Record<string, AIGeneratedRecipe[]> = {
    zh: [
      {
        name: "香辣烤鸡翅",
        description: "外酥里嫩的烤鸡翅，配以秘制香辣酱，让人欲罢不能",
        prepTime: 15,
        cookTime: 25,
        difficulty: "easy",
        servings,
        ingredients: [
          { name: "鸡翅", amount: 800, unit: "g", price: 1500 },
          { name: "蒜末", amount: 20, unit: "g", price: 50 },
          { name: "生抽", amount: 30, unit: "ml", price: 30 },
          { name: "蜂蜜", amount: 20, unit: "ml", price: 80 },
          { name: "辣椒粉", amount: 2, unit: "tsp", price: 20 }
        ],
        instructions: [
          "将鸡翅洗净沥干，在每个鸡翅上划几刀便于入味",
          "混合蒜末、生抽、蜂蜜和辣椒粉制成腌料",
          "将鸡翅放入腌料中腌制至少2小时",
          "预热烤架至200°C",
          "将鸡翅放在烤架上，每面烤10-12分钟直至金黄酥脆"
        ],
        imageQuery: "grilled chicken wings"
      },
      {
        name: "蒜香烤牛排",
        description: "嫩滑多汁的牛排，配以香浓蒜香黄油，是烧烤的经典之选",
        prepTime: 10,
        cookTime: 15,
        difficulty: "medium",
        servings,
        ingredients: [
          { name: "牛排", amount: 600, unit: "g", price: 4500 },
          { name: "黄油", amount: 50, unit: "g", price: 200 },
          { name: "大蒜", amount: 4, unit: "clove", price: 30 },
          { name: "迷迭香", amount: 2, unit: "sprig", price: 50 },
          { name: "盐和黑胡椒", amount: 1, unit: "tsp", price: 20 }
        ],
        instructions: [
          "将牛排提前30分钟从冰箱取出回温",
          "两面撒上盐和黑胡椒",
          "将烤架预热至高温",
          "每面烤4-5分钟（三分熟）或根据喜好调整时间",
          "将蒜末和迷迭香加入融化的黄油中，淋在牛排上"
        ],
        imageQuery: "grilled steak garlic butter"
      },
      {
        name: "烤蔬菜拼盘",
        description: "色彩缤纷的烤蔬菜，健康美味，是完美的烧烤配菜",
        prepTime: 15,
        cookTime: 20,
        difficulty: "easy",
        servings,
        ingredients: [
          { name: "彩椒", amount: 300, unit: "g", price: 400 },
          { name: "西葫芦", amount: 200, unit: "g", price: 200 },
          { name: "茄子", amount: 200, unit: "g", price: 150 },
          { name: "橄榄油", amount: 40, unit: "ml", price: 150 },
          { name: "意大利香草", amount: 2, unit: "tsp", price: 50 }
        ],
        instructions: [
          "将所有蔬菜切成均匀的大块",
          "用橄榄油和意大利香草拌匀",
          "撒上盐和黑胡椒调味",
          "预热烤架至中高温",
          "将蔬菜平铺在烤架上，每面烤5-7分钟直至微焦"
        ],
        imageQuery: "grilled vegetables platter"
      },
      {
        name: "蜜汁烤猪排",
        description: "肉质鲜嫩，外焦里嫩，蜜汁的甜香让人回味无穷",
        prepTime: 20,
        cookTime: 30,
        difficulty: "medium",
        servings,
        ingredients: [
          { name: "猪排", amount: 800, unit: "g", price: 2000 },
          { name: "蜂蜜", amount: 60, unit: "ml", price: 200 },
          { name: "酱油", amount: 40, unit: "ml", price: 50 },
          { name: "姜末", amount: 15, unit: "g", price: 30 },
          { name: "五香粉", amount: 1, unit: "tsp", price: 30 }
        ],
        instructions: [
          "混合蜂蜜、酱油、姜末和五香粉制成腌料",
          "将猪排放入腌料中腌制3-4小时或过夜",
          "预热烤架至中温",
          "将猪排放在烤架上，每面烤12-15分钟",
          "最后5分钟刷上剩余的腌料使其焦糖化"
        ],
        imageQuery: "honey glazed pork chops"
      }
    ],
    en: [
      {
        name: "Spicy BBQ Chicken Wings",
        description: "Crispy on the outside, tender on the inside, coated with a secret spicy sauce",
        prepTime: 15,
        cookTime: 25,
        difficulty: "easy",
        servings,
        ingredients: [
          { name: "Chicken wings", amount: 800, unit: "g", price: 1500 },
          { name: "Minced garlic", amount: 20, unit: "g", price: 50 },
          { name: "Soy sauce", amount: 30, unit: "ml", price: 30 },
          { name: "Honey", amount: 20, unit: "ml", price: 80 },
          { name: "Chili powder", amount: 2, unit: "tsp", price: 20 }
        ],
        instructions: [
          "Clean and dry the wings, score each wing for better flavor absorption",
          "Mix garlic, soy sauce, honey, and chili powder to make the marinade",
          "Marinate wings for at least 2 hours",
          "Preheat grill to 400°F (200°C)",
          "Grill wings for 10-12 minutes per side until golden and crispy"
        ],
        imageQuery: "grilled chicken wings"
      },
      {
        name: "Garlic Butter Steak",
        description: "Juicy tender steak topped with rich garlic butter, a BBQ classic",
        prepTime: 10,
        cookTime: 15,
        difficulty: "medium",
        servings,
        ingredients: [
          { name: "Ribeye steak", amount: 600, unit: "g", price: 4500 },
          { name: "Butter", amount: 50, unit: "g", price: 200 },
          { name: "Garlic cloves", amount: 4, unit: "clove", price: 30 },
          { name: "Fresh rosemary", amount: 2, unit: "sprig", price: 50 },
          { name: "Salt and black pepper", amount: 1, unit: "tsp", price: 20 }
        ],
        instructions: [
          "Remove steak from refrigerator 30 minutes before cooking",
          "Season both sides with salt and black pepper",
          "Preheat grill to high heat",
          "Grill 4-5 minutes per side for medium-rare",
          "Top with garlic herb butter before serving"
        ],
        imageQuery: "grilled steak garlic butter"
      },
      {
        name: "Grilled Vegetable Platter",
        description: "Colorful grilled vegetables, healthy and delicious, perfect BBQ side dish",
        prepTime: 15,
        cookTime: 20,
        difficulty: "easy",
        servings,
        ingredients: [
          { name: "Bell peppers", amount: 300, unit: "g", price: 400 },
          { name: "Zucchini", amount: 200, unit: "g", price: 200 },
          { name: "Eggplant", amount: 200, unit: "g", price: 150 },
          { name: "Olive oil", amount: 40, unit: "ml", price: 150 },
          { name: "Italian herbs", amount: 2, unit: "tsp", price: 50 }
        ],
        instructions: [
          "Cut all vegetables into uniform large pieces",
          "Toss with olive oil and Italian herbs",
          "Season with salt and black pepper",
          "Preheat grill to medium-high heat",
          "Grill vegetables 5-7 minutes per side until slightly charred"
        ],
        imageQuery: "grilled vegetables platter"
      },
      {
        name: "Honey Glazed Pork Chops",
        description: "Tender meat with a caramelized honey glaze that's irresistible",
        prepTime: 20,
        cookTime: 30,
        difficulty: "medium",
        servings,
        ingredients: [
          { name: "Pork chops", amount: 800, unit: "g", price: 2000 },
          { name: "Honey", amount: 60, unit: "ml", price: 200 },
          { name: "Soy sauce", amount: 40, unit: "ml", price: 50 },
          { name: "Minced ginger", amount: 15, unit: "g", price: 30 },
          { name: "Five spice powder", amount: 1, unit: "tsp", price: 30 }
        ],
        instructions: [
          "Mix honey, soy sauce, ginger, and five spice to make marinade",
          "Marinate pork chops for 3-4 hours or overnight",
          "Preheat grill to medium heat",
          "Grill 12-15 minutes per side",
          "Brush with remaining marinade in last 5 minutes to caramelize"
        ],
        imageQuery: "honey glazed pork chops"
      }
    ],
    de: [
      {
        name: "Würzige BBQ Hähnchenflügel",
        description: "Außen knusprig, innen zart, mit geheimer würziger Sauce",
        prepTime: 15,
        cookTime: 25,
        difficulty: "easy",
        servings,
        ingredients: [
          { name: "Hähnchenflügel", amount: 800, unit: "g", price: 1500 },
          { name: "Gehackter Knoblauch", amount: 20, unit: "g", price: 50 },
          { name: "Sojasauce", amount: 30, unit: "ml", price: 30 },
          { name: "Honig", amount: 20, unit: "ml", price: 80 },
          { name: "Chilipulver", amount: 2, unit: "tsp", price: 20 }
        ],
        instructions: [
          "Flügel waschen und trocknen, einritzen für bessere Geschmacksaufnahme",
          "Knoblauch, Sojasauce, Honig und Chilipulver zur Marinade mischen",
          "Flügel mindestens 2 Stunden marinieren",
          "Grill auf 200°C vorheizen",
          "Flügel 10-12 Minuten pro Seite grillen bis goldbraun und knusprig"
        ],
        imageQuery: "grilled chicken wings"
      },
      {
        name: "Knoblauchbutter-Steak",
        description: "Saftiges zartes Steak mit reichhaltiger Knoblauchbutter",
        prepTime: 10,
        cookTime: 15,
        difficulty: "medium",
        servings,
        ingredients: [
          { name: "Ribeye-Steak", amount: 600, unit: "g", price: 4500 },
          { name: "Butter", amount: 50, unit: "g", price: 200 },
          { name: "Knoblauchzehen", amount: 4, unit: "clove", price: 30 },
          { name: "Frischer Rosmarin", amount: 2, unit: "sprig", price: 50 },
          { name: "Salz und schwarzer Pfeffer", amount: 1, unit: "tsp", price: 20 }
        ],
        instructions: [
          "Steak 30 Minuten vor dem Kochen aus dem Kühlschrank nehmen",
          "Beide Seiten mit Salz und schwarzem Pfeffer würzen",
          "Grill auf hohe Hitze vorheizen",
          "4-5 Minuten pro Seite für medium-rare grillen",
          "Vor dem Servieren mit Knoblauch-Kräuterbutter toppen"
        ],
        imageQuery: "grilled steak garlic butter"
      },
      {
        name: "Gegrillte Gemüseplatte",
        description: "Buntes gegrilltes Gemüse, gesund und lecker",
        prepTime: 15,
        cookTime: 20,
        difficulty: "easy",
        servings,
        ingredients: [
          { name: "Paprika", amount: 300, unit: "g", price: 400 },
          { name: "Zucchini", amount: 200, unit: "g", price: 200 },
          { name: "Aubergine", amount: 200, unit: "g", price: 150 },
          { name: "Olivenöl", amount: 40, unit: "ml", price: 150 },
          { name: "Italienische Kräuter", amount: 2, unit: "tsp", price: 50 }
        ],
        instructions: [
          "Alle Gemüse in gleichmäßige große Stücke schneiden",
          "Mit Olivenöl und italienischen Kräutern mischen",
          "Mit Salz und schwarzem Pfeffer würzen",
          "Grill auf mittlere bis hohe Hitze vorheizen",
          "Gemüse 5-7 Minuten pro Seite grillen"
        ],
        imageQuery: "grilled vegetables platter"
      },
      {
        name: "Honigglasierte Schweinekoteletts",
        description: "Zartes Fleisch mit karamellisierter Honigglasur",
        prepTime: 20,
        cookTime: 30,
        difficulty: "medium",
        servings,
        ingredients: [
          { name: "Schweinekoteletts", amount: 800, unit: "g", price: 2000 },
          { name: "Honig", amount: 60, unit: "ml", price: 200 },
          { name: "Sojasauce", amount: 40, unit: "ml", price: 50 },
          { name: "Gehackter Ingwer", amount: 15, unit: "g", price: 30 },
          { name: "Fünf-Gewürze-Pulver", amount: 1, unit: "tsp", price: 30 }
        ],
        instructions: [
          "Honig, Sojasauce, Ingwer und Fünf-Gewürze-Pulver zur Marinade mischen",
          "Koteletts 3-4 Stunden oder über Nacht marinieren",
          "Grill auf mittlere Hitze vorheizen",
          "12-15 Minuten pro Seite grillen",
          "In den letzten 5 Minuten mit restlicher Marinade bestreichen"
        ],
        imageQuery: "honey glazed pork chops"
      }
    ]
  };
  return recipes[language] || recipes.en;
}

export async function POST(request: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  try {
    // 解析请求体
    const body: GenerateMenuRequest = await request.json();
    
    // 检查用户认证
    const session = await (await getAuth()).api.getSession({
      headers: request.headers,
    });

    // 获取用户 ID（可能为空）
    const userId = session?.user?.id || null;
    
    // 生产模式下要求登录
    if (!userId && !isDevelopment) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Please login to generate menus' },
        { status: 401 }
      );
    }

    // 检查 credits（如果用户已登录且不是开发模式）
    let remainingCredits = 999;
    const costCredits = 1;
    
    if (userId && !isDevelopment) {
      try {
        remainingCredits = await getRemainingCredits(userId);
        if (remainingCredits < costCredits) {
          return NextResponse.json(
            {
              error: 'Insufficient credits',
              message: 'You need more credits to generate a menu',
              remainingCredits,
            },
            { status: 402 }
          );
        }

        // 消费 credits
        await consumeCredits({
          userId,
          credits: costCredits,
          scene: 'bbq_menu_generation',
        });
      } catch (creditError) {
        console.warn('Credits system error:', creditError);
        // 继续执行，不阻断
      }
    } else if (isDevelopment) {
      console.log('[BBQ] Development mode: skipping credits check');
    }

    // 构建提示词（使用配置化的提示词模板）
    const prompt = buildBBQPrompt({
      servings: body.servings || 4,
      budget: body.budget || 'medium',
      dietaryNeeds: body.dietaryNeeds || [],
      preferences: body.preferences,
      availableIngredients: body.availableIngredients,
      language: body.language || 'en',
      recipeCount: 4,
    });

    console.log('[BBQ] Making API request to AI service');
    console.log('[BBQ] AI_API_URL:', AI_API_URL);
    console.log('[BBQ] AI_MODEL:', AI_MODEL);
    console.log('[BBQ] AI_API_KEY exists:', !!AI_API_KEY);

    // 调用 AI 服务
    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    console.log('[BBQ] AI service response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[BBQ] AI service error:', errorText);
      
      // 如果 AI 调用失败，在开发模式返回模拟数据
      if (isDevelopment) {
        const mockRecipes = getMockRecipes(body.language || 'en', body.servings || 4);
        return NextResponse.json({
          success: true,
          recipes: mockRecipes.map(recipe => ({
            ...recipe,
            id: getUuid(),
          })),
          creditsUsed: 0,
          remainingCredits: 999,
          mock: true,
        });
      }
      
      return NextResponse.json(
        { error: 'AI service error', message: `API request failed: ${response.status}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('[BBQ] Successfully received AI service response');

    // 解析响应
    const content = data.choices?.[0]?.message?.content || '{}';
    let cleanContent = content.trim();

    // 移除 markdown 代码块
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/```\n?/g, '');
    }

    // 提取 JSON
    const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
    let menuData;
    try {
      menuData = jsonMatch ? JSON.parse(jsonMatch[0]) : { recipes: [] };
    } catch (e) {
      console.error('[BBQ] Failed to parse AI response:', cleanContent);
      // 返回模拟数据
      const mockRecipes = getMockRecipes(body.language || 'en', body.servings || 4);
      return NextResponse.json({
        success: true,
        recipes: mockRecipes.map(recipe => ({
          ...recipe,
          id: getUuid(),
        })),
        creditsUsed: 0,
        remainingCredits: 999,
        mock: true,
      });
    }

    // 转换为前端格式返回
    const recipes = (menuData.recipes || []).map((recipe: any) => ({
      id: getUuid(),
      name: recipe.name,
      description: recipe.description,
      prepTime: recipe.prepTime || 15,
      cookTime: recipe.cookTime || 30,
      difficulty: recipe.difficulty || 'medium',
      servings: body.servings || 4,
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
      imageQuery: recipe.imageQuery,
    }));

    // 获取更新后的 credits
    let newRemainingCredits = remainingCredits - costCredits;
    if (userId) {
      try {
        newRemainingCredits = await getRemainingCredits(userId);
      } catch (e) {
        // 忽略错误
      }
    }

    return NextResponse.json({
      success: true,
      recipes,
      creditsUsed: userId ? costCredits : 0,
      remainingCredits: newRemainingCredits,
    });
  } catch (error: any) {
    console.error('Error generating menu:', error);

    return NextResponse.json(
      {
        error: 'Generation failed',
        message: error.message || 'An error occurred while generating the menu',
      },
      { status: 500 }
    );
  }
}
