/**
 * BBQ Menu AI - 提示词配置
 * 
 * 支持美式 BBQ 和德式 BBQ 风格
 * 包含专业烧烤技巧
 * 
 * 模板变量:
 * - {{servings}} - 用餐人数
 * - {{budgetText}} - 预算文本
 * - {{dietaryNeeds}} - 饮食需求
 * - {{preferences}} - 额外偏好
 * - {{availableIngredients}} - 可用食材
 * - {{languageInstruction}} - 语言指令
 * - {{recipeCount}} - 食谱数量
 */

// 预算映射
export const budgetMap = {
  low: { en: 'budget-friendly ($10-20 per person)', de: 'günstig (10-20€ pro Person)' },
  medium: { en: 'moderate ($20-40 per person)', de: 'mittel (20-40€ pro Person)' },
  high: { en: 'premium ($40+ per person)', de: 'premium (40€+ pro Person)' },
} as const;

// 语言指令
export const languageInstructions = {
  en: 'Generate all recipe content in English. Use imperial measurements (fahrenheit, pounds, ounces) alongside metric.',
  de: 'Generiere alle Rezeptinhalte auf Deutsch. Verwende metrische Maßeinheiten (Celsius, Gramm, Milliliter).',
  // 不支持中文，默认使用英文
  zh: 'Generate all recipe content in English. Use imperial measurements (fahrenheit, pounds, ounces) alongside metric.',
} as const;

// 烧烤风格说明
export const bbqStyleGuide = {
  en: `
BBQ STYLE GUIDELINES (American & German traditions):

AMERICAN BBQ STYLES:
- Texas Style: Beef-focused, simple salt & pepper rubs, post oak wood smoking
- Kansas City: Sweet & tangy tomato-based sauces, variety of meats
- Carolina: Pork-focused, vinegar-based sauces (Eastern) or mustard-based (South Carolina)
- Memphis: Dry rubs, pulled pork, ribs with sauce on the side

GERMAN GRILL (Grillen) STYLES:
- Bratwurst & Würstchen: Traditional sausages with mustard
- Schwenker: Swinging grill popular in Saarland region
- Steckerlfisch: Whole fish on sticks (Bavarian style)
- Grillkäse & Halloumi: Grilled cheese options

PROFESSIONAL GRILLING TIPS TO INCLUDE:
1. Temperature Control: Direct vs indirect heat zones
2. Meat Preparation: Bringing meat to room temperature, proper seasoning timing
3. The "Two-Zone" Method: Searing over high heat, finishing over low
4. Resting Period: Let meat rest for 5-10 minutes after grilling
5. Internal Temperatures: Beef 130-145°F, Pork 145°F, Chicken 165°F
6. Wood/Charcoal Selection: Hickory, mesquite, oak, applewood characteristics
7. Marinades & Rubs: When to apply, how long to marinate
8. Basting Techniques: Mop sauces, butter basting
`,
  de: `
GRILLSTIL-RICHTLINIEN (Amerikanische & Deutsche Traditionen):

AMERIKANISCHE BBQ-STILE:
- Texas-Stil: Rindfleisch-fokussiert, einfache Salz- & Pfeffer-Rubs, Post Oak Holzräucherung
- Kansas City: Süß-würzige Tomatensaucen, verschiedene Fleischsorten
- Carolina: Schweinefleisch-fokussiert, Essig-basierte Saucen
- Memphis: Trockene Gewürzmischungen, Pulled Pork

DEUTSCHE GRILL-STILE:
- Bratwurst & Würstchen: Traditionelle Würste mit Senf
- Schwenker: Schwenkgrill, beliebt im Saarland
- Steckerlfisch: Ganzer Fisch am Stock (Bayerischer Stil)
- Grillkäse & Halloumi: Gegrillte Käseoptionen

PROFESSIONELLE GRILLTIPPS:
1. Temperaturkontrolle: Direkte vs. indirekte Hitzezonen
2. Fleischvorbereitung: Auf Raumtemperatur bringen, richtiger Würzzeitpunkt
3. Zwei-Zonen-Methode: Bei hoher Hitze anbraten, bei niedriger fertig garen
4. Ruhezeit: Fleisch 5-10 Minuten nach dem Grillen ruhen lassen
5. Kerntemperaturen: Rind 55-63°C, Schwein 63°C, Hähnchen 74°C
6. Holz-/Kohleauswahl: Hickory, Mesquite, Eiche, Apfelholz Eigenschaften
7. Marinaden & Rubs: Wann auftragen, wie lange marinieren
8. Glasurtechniken: Mop-Saucen, Butter-Glasur
`,
} as const;

// 主提示词模板
export const bbqMenuPromptTemplate = `You are a professional BBQ pitmaster and grill chef specializing in American BBQ and German Grill traditions. You have decades of experience with various grilling techniques, from Texas-style brisket to Bavarian Schwenker.

{{bbqStyleGuide}}

TASK: Generate exactly {{recipeCount}} BBQ/Grill recipes based on these requirements:

REQUIREMENTS:
- Servings: {{servings}} people
- Budget level: {{budgetText}}
- Dietary restrictions: {{dietaryNeeds}}
{{preferences}}
{{availableIngredients}}

{{languageInstruction}}

IMPORTANT RULES:
1. Focus ONLY on American BBQ and German Grill styles - NO Asian, Korean, or Chinese-style recipes
2. Include professional grilling tips in the instructions
3. Vary the recipes: include different proteins (beef, pork, chicken, sausages, fish) and at least one vegetable dish
4. Each recipe MUST include specific temperature and timing guidance
5. Include wood/charcoal recommendations where relevant

OUTPUT FORMAT: You must respond with a valid JSON array of exactly {{recipeCount}} recipe objects:

[
  {
    "name": "Recipe Name",
    "description": "A brief, appetizing description highlighting the BBQ style and key flavors",
    "prepTime": 15,
    "cookTime": 25,
    "difficulty": "easy",
    "servings": {{servings}},
    "ingredients": [
      {"name": "Ingredient name", "amount": 500, "unit": "g", "price": 800},
      {"name": "Another ingredient", "amount": 200, "unit": "ml", "price": 300}
    ],
    "instructions": [
      "Step 1: Preparation with specific details",
      "Step 2: Include temperature (e.g., 'Preheat grill to 400°F/200°C')",
      "Step 3: Include timing (e.g., 'Grill for 4-5 minutes per side')",
      "Step 4: Include a professional tip (e.g., 'Pro tip: Let rest for 5 minutes')"
    ],
    "imageQuery": "grilled beef steak american bbq",
    "grillTips": [
      "Use a two-zone fire setup for better control",
      "Internal temp should reach 145°F/63°C"
    ]
  }
]

RULES FOR JSON:
- "amount" must be a number (no strings)
- "unit" must be one of: "g", "ml", "piece", "tbsp", "tsp", "clove", "sprig", "lb", "oz"
- "price" is in cents (e.g., 800 = $8.00 or 8.00€)
- "difficulty" must be exactly: "easy", "medium", or "hard"
- "prepTime" and "cookTime" must be numbers (minutes)
- "imageQuery" must be a descriptive English phrase for finding a matching food image
- "grillTips" is an array of 2-3 professional BBQ tips specific to this recipe

RECIPE VARIETY REQUIREMENTS:
- At least 1 beef dish (steak, brisket, or burgers)
- At least 1 pork dish (ribs, chops, or sausages)
- At least 1 chicken or poultry dish
- At least 1 vegetable or side dish

Respond ONLY with the JSON array, no additional text or markdown.`;

// 构建完整提示词的函数
export function buildBBQPrompt(params: {
  servings: number;
  budget: 'low' | 'medium' | 'high';
  dietaryNeeds: string[];
  preferences?: string;
  availableIngredients?: string;
  language: string;
  recipeCount?: number;
}): string {
  const {
    servings,
    budget,
    dietaryNeeds,
    preferences,
    availableIngredients,
    language,
    recipeCount = 4,
  } = params;

  const langKey = (language === 'de' ? 'de' : 'en') as keyof typeof languageInstructions;
  const budgetLangKey = (language === 'de' ? 'de' : 'en') as 'en' | 'de';
  const budgetText = budgetMap[budget]?.[budgetLangKey] || budgetMap[budget]?.en || 'moderate';
  const languageInstruction = languageInstructions[langKey] || languageInstructions.en;
  const styleGuide = bbqStyleGuide[langKey] || bbqStyleGuide.en;

  let prompt = bbqMenuPromptTemplate
    .replace(/\{\{recipeCount\}\}/g, String(recipeCount))
    .replace(/\{\{servings\}\}/g, String(servings))
    .replace(/\{\{budgetText\}\}/g, budgetText)
    .replace(/\{\{dietaryNeeds\}\}/g, dietaryNeeds.length > 0 ? dietaryNeeds.join(', ') : 'None')
    .replace(/\{\{languageInstruction\}\}/g, languageInstruction)
    .replace(/\{\{bbqStyleGuide\}\}/g, styleGuide);

  // 处理可选字段
  if (preferences) {
    prompt = prompt.replace(/\{\{preferences\}\}/g, `- Additional preferences: ${preferences}`);
  } else {
    prompt = prompt.replace(/\{\{preferences\}\}/g, '');
  }

  if (availableIngredients) {
    prompt = prompt.replace(/\{\{availableIngredients\}\}/g, `- Available ingredients to use: ${availableIngredients}`);
  } else {
    prompt = prompt.replace(/\{\{availableIngredients\}\}/g, '');
  }

  return prompt;
}

// 导出类型
export type BBQPromptParams = Parameters<typeof buildBBQPrompt>[0];

