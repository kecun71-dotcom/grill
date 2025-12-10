# BBQ Menu AI - 部署指南

## 部署前检查清单

### 1. 环境变量配置

确保以下环境变量已在 Vercel/部署平台中配置：

```env
# 应用配置
NEXT_PUBLIC_APP_URL=https://your-subdomain.vercel.app
NEXT_PUBLIC_APP_NAME=BBQ Menu AI
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_THEME=default

# 数据库
DATABASE_URL=postgres://user:password@host:5432/bbq_ai
DATABASE_PROVIDER=postgresql

# 认证
AUTH_URL=https://your-subdomain.vercel.app
AUTH_SECRET=your-32-char-secret-key

# AI 服务
EVOLINK_API_KEY=sk-your-evolink-api-key
EVOLINK_API_URL=https://api.evolink.ai/v1/chat/completions
EVOLINK_MODEL=gemini-2.5-flash

# 支付
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

### 2. 数据库准备

```bash
# 运行数据库迁移
pnpm db:push

# 或使用 Drizzle migrations
pnpm db:migrate
```

### 3. Google OAuth 配置

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建/选择项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 凭据
5. 添加授权重定向 URI:
   - `https://your-subdomain.vercel.app/api/auth/callback/google`
6. 在管理后台配置 `google_client_id` 和 `google_client_secret`

## Vercel 部署步骤

### 方式一：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
cd shipany
vercel

# 生产部署
vercel --prod
```

### 方式二：通过 Vercel Dashboard

1. 访问 [vercel.com](https://vercel.com)
2. 导入 GitHub 仓库
3. 配置项目设置：
   - **Framework Preset**: Next.js
   - **Root Directory**: `shipany`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
4. 添加环境变量
5. 点击 Deploy

### 方式三：通过 GitHub Actions

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: cd shipany && pnpm install
        
      - name: Build
        run: cd shipany && pnpm build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          # ... 其他环境变量
          
      - name: Deploy to Vercel
        uses: vercel/actions@v2
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./shipany
```

## 子域名配置

### Vercel 子域名

默认情况下，Vercel 提供 `your-project.vercel.app` 域名。

### 自定义子域名

1. 在 Vercel Dashboard 中，进入 Project Settings → Domains
2. 添加域名：`bbq.yourdomain.com`
3. 配置 DNS：
   - 类型: `CNAME`
   - 名称: `bbq`
   - 值: `cname.vercel-dns.com`

### 后续正式域名迁移

1. 购买正式域名
2. 在 Vercel 添加新域名
3. 更新 DNS 记录
4. 更新环境变量中的 `NEXT_PUBLIC_APP_URL` 和 `AUTH_URL`
5. 更新 Google OAuth 重定向 URI
6. 更新 Stripe Webhook URL

## 部署后验证

### 功能测试清单

- [ ] 首页加载正常
- [ ] 三种语言切换正常 (en/zh/de)
- [ ] 用户注册/登录功能
- [ ] Google OAuth 登录
- [ ] 菜单生成功能 (/generate)
- [ ] 食谱详情页 (/recipe/[id])
- [ ] 购物清单功能 (/shopping)
- [ ] 定价页面和支付流程
- [ ] 博客页面加载

### 性能检查

```bash
# 使用 Lighthouse 检查
npx lighthouse https://your-subdomain.vercel.app

# 检查 Core Web Vitals
# 访问 vercel.com 查看 Analytics
```

## 常见问题

### 构建失败

1. 检查环境变量是否完整
2. 检查 Node.js 版本 (需要 18+)
3. 清除 `.next` 和 `node_modules` 重新安装

### 数据库连接失败

1. 检查 `DATABASE_URL` 格式
2. 确认 IP 白名单（如使用 Supabase/Neon）
3. 检查 SSL 配置

### OAuth 登录失败

1. 确认重定向 URI 配置正确
2. 检查 Client ID 和 Secret
3. 确认 API 已启用

## 监控和日志

### Vercel 日志

- 访问 Vercel Dashboard → Deployments → 选择部署 → Logs

### 自定义日志

考虑集成：
- Sentry (错误追踪)
- LogRocket (用户会话回放)
- Vercel Analytics (性能监控)

## 扩展和优化

### 边缘函数

对于全球用户，考虑将 API 路由转换为 Edge Functions：

```typescript
export const runtime = 'edge';
```

### CDN 缓存

静态资源自动通过 Vercel CDN 缓存。对于动态内容：

```typescript
export const revalidate = 3600; // 1 小时
```

### 数据库优化

- 使用连接池（Prisma Accelerate 或 PgBouncer）
- 添加适当的索引
- 考虑只读副本

---

如有问题，请联系技术支持。

