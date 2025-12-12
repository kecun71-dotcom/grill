# BBQ Menu AI 版本备忘

## 2024-12-12 菜单生成功能修复

### 问题描述
生产环境（Vercel）上的菜单生成功能报错，无法正常生成 BBQ 菜单。

### 问题排查过程

#### 1. 初始错误：401 Unauthorized
- **现象**：未登录用户点击"生成菜单"返回 401 错误
- **原因**：`src/app/api/bbq/generate-menu/route.ts` 中的代码要求生产环境必须登录
- **代码位置**：第 374-379 行
```typescript
if (!userId && !isDevelopment) {
  return NextResponse.json(
    { error: 'Unauthorized', message: 'Please login to generate menus' },
    { status: 401 }
  );
}
```
- **结论**：这是预期行为，用户必须登录才能生成菜单（消费积分）

#### 2. 登录后错误：504 Gateway Timeout
- **现象**：用户登录后点击"生成菜单"，等待约 30 秒后返回 504 错误
- **Vercel 日志**：`Task timed out after 30 seconds`
- **本地测试**：菜单生成约需 28 秒，本地运行正常

### 尝试的解决方案

#### 方案 1：vercel.json 配置（无效）
在 `vercel.json` 中配置 `functions.maxDuration`：
```json
{
  "functions": {
    "src/app/api/bbq/**/*.ts": {
      "maxDuration": 60
    }
  }
}
```
**结果**：配置未生效，仍然 30 秒超时

#### 方案 2：Next.js maxDuration 导出（有效 ✅）
在 API route 文件中直接导出 `maxDuration`：
```typescript
// src/app/api/bbq/generate-menu/route.ts
export const maxDuration = 60;
```
**结果**：配置生效，菜单生成成功

### 最终修改

**文件**：`src/app/api/bbq/generate-menu/route.ts`

**添加内容**（文件顶部，import 语句之后）：
```typescript
// Vercel Function configuration - set timeout to 60 seconds
export const maxDuration = 60;
```

### 技术要点

1. **Next.js 13+ App Router 的 Vercel Function 配置**
   - `vercel.json` 的 `functions` 配置对 App Router 可能不生效
   - 推荐使用 `export const maxDuration = X` 直接在 route 文件中设置

2. **Vercel 计划超时限制**
   | 计划 | 最大超时时间 |
   |------|-------------|
   | Hobby (免费) | 10 秒 |
   | Pro | 300 秒 |
   | Enterprise | 900 秒 |

3. **AI API 响应时间**
   - 当前使用 `gemini-2.5-flash` 模型
   - 生成 4 个菜谱约需 25-30 秒
   - 如需加快响应，可减少 `recipeCount` 参数

### 相关配置

**环境变量**（Vercel Environment Variables）：
- `AI_API_URL`: AI 服务端点
- `AI_API_KEY`: AI 服务密钥
- `AI_MODEL`: 使用的模型名称

**配置读取**（`src/config/index.ts`）：
```typescript
ai_api_url: process.env.AI_API_URL ?? 'https://api.evolink.ai/v1/chat/completions',
ai_api_key: process.env.AI_API_KEY ?? '',
ai_model: process.env.AI_MODEL ?? 'gemini-2.5-flash',
```

### 调试日志

为便于排查问题，API route 中添加了以下日志：
```typescript
console.log('[BBQ] Making API request to AI service');
console.log('[BBQ] AI_API_URL:', AI_API_URL);
console.log('[BBQ] AI_MODEL:', AI_MODEL);
console.log('[BBQ] AI_API_KEY exists:', !!AI_API_KEY);
```

可在 Vercel Dashboard → Logs → Functions 中查看。

---

## 更新记录

| 日期 | 版本 | 修改内容 |
|------|------|---------|
| 2024-12-12 | - | 修复菜单生成 504 超时问题 |

