/**
 * BBQ Menu AI - 邮件模板
 */

interface EmailTemplateData {
  userName?: string;
  locale?: string;
}

interface WelcomeEmailData extends EmailTemplateData {
  loginUrl: string;
}

interface MenuGeneratedEmailData extends EmailTemplateData {
  menuUrl: string;
  recipesCount: number;
}

interface WeeklyDigestEmailData extends EmailTemplateData {
  newRecipesCount: number;
  popularRecipes: Array<{ name: string; url: string }>;
  tipsTitle: string;
  tipsContent: string;
}

/**
 * 欢迎邮件模板
 */
export function getWelcomeEmailTemplate(data: WelcomeEmailData): {
  subject: string;
  html: string;
} {
  const { userName = 'Griller', loginUrl, locale = 'en' } = data;

  const content = {
    en: {
      subject: '🔥 Welcome to BBQ Menu AI!',
      greeting: `Hi ${userName}!`,
      intro: 'Welcome to BBQ Menu AI - your AI-powered BBQ companion!',
      features: [
        '✨ Generate personalized BBQ menus in seconds',
        '📝 Get smart shopping lists with price estimates',
        '⏱️ Follow step-by-step instructions with built-in timers',
        '🌍 Available in English, German, and Chinese',
      ],
      cta: 'Start Grilling Now',
      footer: 'Happy Grilling!',
    },
    zh: {
      subject: '🔥 欢迎来到 BBQ Menu AI！',
      greeting: `你好 ${userName}！`,
      intro: '欢迎使用 BBQ Menu AI - 您的 AI 烧烤助手！',
      features: [
        '✨ 几秒钟内生成个性化烧烤菜单',
        '📝 获取带有价格估算的智能购物清单',
        '⏱️ 按照分步说明操作，配有内置计时器',
        '🌍 支持英语、德语和中文',
      ],
      cta: '立即开始烧烤',
      footer: '烧烤愉快！',
    },
    de: {
      subject: '🔥 Willkommen bei BBQ Menu AI!',
      greeting: `Hallo ${userName}!`,
      intro: 'Willkommen bei BBQ Menu AI - Ihrem KI-gestützten BBQ-Begleiter!',
      features: [
        '✨ Generieren Sie personalisierte BBQ-Menüs in Sekunden',
        '📝 Erhalten Sie intelligente Einkaufslisten mit Preisschätzungen',
        '⏱️ Folgen Sie Schritt-für-Schritt-Anleitungen mit integrierten Timern',
        '🌍 Verfügbar auf Englisch, Deutsch und Chinesisch',
      ],
      cta: 'Jetzt Grillen',
      footer: 'Frohes Grillen!',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF6B35; margin: 0;">🔥 BBQ Menu AI</h1>
  </div>
  
  <h2 style="color: #333;">${t.greeting}</h2>
  
  <p>${t.intro}</p>
  
  <div style="background: #FFF5F0; border-radius: 8px; padding: 20px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #FF6B35;">What you can do:</h3>
    <ul style="padding-left: 20px;">
      ${t.features.map((f) => `<li style="margin-bottom: 8px;">${f}</li>`).join('')}
    </ul>
  </div>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="${loginUrl}" style="display: inline-block; background: linear-gradient(135deg, #FF6B35, #FF8C42); color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold;">
      ${t.cta}
    </a>
  </div>
  
  <p style="color: #666; font-size: 14px;">${t.footer}<br>The BBQ Menu AI Team</p>
</body>
</html>
  `.trim();

  return { subject: t.subject, html };
}

/**
 * 菜单生成完成邮件模板
 */
export function getMenuGeneratedEmailTemplate(data: MenuGeneratedEmailData): {
  subject: string;
  html: string;
} {
  const { userName = 'Griller', menuUrl, recipesCount, locale = 'en' } = data;

  const content = {
    en: {
      subject: `🍖 Your BBQ Menu is Ready! (${recipesCount} Recipes)`,
      greeting: `Hi ${userName}!`,
      intro: `Great news! Your personalized BBQ menu with ${recipesCount} recipes is ready.`,
      cta: 'View Your Menu',
      footer: 'Time to fire up the grill!',
    },
    zh: {
      subject: `🍖 您的烧烤菜单已准备好！（${recipesCount} 个食谱）`,
      greeting: `你好 ${userName}！`,
      intro: `好消息！您的个性化烧烤菜单已经准备好，包含 ${recipesCount} 个食谱。`,
      cta: '查看您的菜单',
      footer: '是时候点燃烤架了！',
    },
    de: {
      subject: `🍖 Ihr BBQ-Menü ist fertig! (${recipesCount} Rezepte)`,
      greeting: `Hallo ${userName}!`,
      intro: `Gute Nachrichten! Ihr personalisiertes BBQ-Menü mit ${recipesCount} Rezepten ist fertig.`,
      cta: 'Menü ansehen',
      footer: 'Zeit, den Grill anzuzünden!',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF6B35; margin: 0;">🔥 BBQ Menu AI</h1>
  </div>
  
  <h2>${t.greeting}</h2>
  <p>${t.intro}</p>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="${menuUrl}" style="display: inline-block; background: linear-gradient(135deg, #FF6B35, #FF8C42); color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold;">
      ${t.cta}
    </a>
  </div>
  
  <p style="color: #666;">${t.footer}</p>
</body>
</html>
  `.trim();

  return { subject: t.subject, html };
}

/**
 * 每周精选邮件模板
 */
export function getWeeklyDigestEmailTemplate(data: WeeklyDigestEmailData): {
  subject: string;
  html: string;
} {
  const {
    userName = 'Griller',
    newRecipesCount,
    popularRecipes,
    tipsTitle,
    tipsContent,
    locale = 'en',
  } = data;

  const content = {
    en: {
      subject: '🔥 Your Weekly BBQ Digest',
      greeting: `Hi ${userName}!`,
      newRecipes: `${newRecipesCount} new recipes this week`,
      popular: 'Popular This Week',
      tips: 'Grilling Tip',
      cta: 'Explore More',
    },
    zh: {
      subject: '🔥 您的每周烧烤精选',
      greeting: `你好 ${userName}！`,
      newRecipes: `本周新增 ${newRecipesCount} 个食谱`,
      popular: '本周热门',
      tips: '烧烤技巧',
      cta: '探索更多',
    },
    de: {
      subject: '🔥 Ihr wöchentlicher BBQ-Digest',
      greeting: `Hallo ${userName}!`,
      newRecipes: `${newRecipesCount} neue Rezepte diese Woche`,
      popular: 'Diese Woche beliebt',
      tips: 'Grill-Tipp',
      cta: 'Mehr entdecken',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const recipesHtml = popularRecipes
    .map(
      (r) =>
        `<li style="margin-bottom: 8px;"><a href="${r.url}" style="color: #FF6B35;">${r.name}</a></li>`
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF6B35; margin: 0;">🔥 BBQ Menu AI</h1>
  </div>
  
  <h2>${t.greeting}</h2>
  
  <div style="background: #FFF5F0; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
    <p style="font-size: 24px; font-weight: bold; color: #FF6B35; margin: 0;">${t.newRecipes}</p>
  </div>
  
  <h3 style="color: #FF6B35;">${t.popular}</h3>
  <ul style="padding-left: 20px;">${recipesHtml}</ul>
  
  <div style="background: #f5f5f5; border-radius: 8px; padding: 15px; margin: 20px 0;">
    <h4 style="margin-top: 0; color: #FF6B35;">💡 ${t.tips}: ${tipsTitle}</h4>
    <p style="margin-bottom: 0;">${tipsContent}</p>
  </div>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://bbqmenuai.com/generate" style="display: inline-block; background: linear-gradient(135deg, #FF6B35, #FF8C42); color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold;">
      ${t.cta}
    </a>
  </div>
</body>
</html>
  `.trim();

  return { subject: t.subject, html };
}

