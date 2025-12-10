# BBQ Menu AI - 环境变量配置指南

## 快速开始

复制以下内容到 `.env.local` 文件，并填写实际值：

```env
# ===== 应用配置 =====
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=BBQ Menu AI
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_THEME=default

# ===== 数据库配置 =====
DATABASE_URL=postgres://user:password@localhost:5432/bbq_ai
DATABASE_PROVIDER=postgresql

# ===== 认证配置 =====
AUTH_URL=http://localhost:3000
AUTH_SECRET=your-32-char-secret-key-here

# ===== AI 服务配置（Evolink AI）=====
EVOLINK_API_KEY=sk-your-evolink-api-key
EVOLINK_API_URL=https://api.evolink.ai/v1/chat/completions
EVOLINK_MODEL=gemini-2.5-flash

# ===== 支付配置（Stripe）=====
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

## 详细配置说明

### 1. 应用配置

| 变量 | 说明 | 示例 |
|------|------|------|
| `NEXT_PUBLIC_APP_URL` | 应用 URL | `https://bbq.yourdomain.com` |
| `NEXT_PUBLIC_APP_NAME` | 应用名称 | `BBQ Menu AI` |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | 默认语言 | `en`, `zh`, `de` |
| `NEXT_PUBLIC_THEME` | 主题 | `default` |

### 2. 数据库配置

| 变量 | 说明 | 示例 |
|------|------|------|
| `DATABASE_URL` | PostgreSQL 连接串 | `postgres://user:pass@host:5432/db` |
| `DATABASE_PROVIDER` | 数据库类型 | `postgresql` |

### 3. 认证配置

| 变量 | 说明 | 示例 |
|------|------|------|
| `AUTH_URL` | 认证回调 URL | 同 `NEXT_PUBLIC_APP_URL` |
| `AUTH_SECRET` | 认证密钥 | 使用 `openssl rand -base64 32` 生成 |

### 4. AI 服务配置

| 变量 | 说明 | 示例 |
|------|------|------|
| `EVOLINK_API_KEY` | Evolink AI API Key | `sk-xxx` |
| `EVOLINK_API_URL` | API 端点 | `https://api.evolink.ai/v1/chat/completions` |
| `EVOLINK_MODEL` | 模型名称 | `gemini-2.5-flash` |

### 5. 支付配置（Stripe）

| 变量 | 说明 | 示例 |
|------|------|------|
| `STRIPE_SECRET_KEY` | Stripe 密钥 | `sk_live_xxx` |
| `STRIPE_WEBHOOK_SECRET` | Webhook 密钥 | `whsec_xxx` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | 公开密钥 | `pk_live_xxx` |

## 后台配置项

以下配置通过管理后台 → 设置页面进行配置：

| 配置键 | 值 | 说明 |
|--------|-----|------|
| `google_auth_enabled` | `true` | 启用 Google 登录 |
| `google_client_id` | `xxx.apps.googleusercontent.com` | Google OAuth Client ID |
| `google_client_secret` | `GOCSPX-xxx` | Google OAuth Secret |
| `email_auth_enabled` | `true` | 启用邮箱密码登录 |

## Google OAuth 配置步骤

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建项目或选择现有项目
3. 启用 Google+ API
4. 进入 "凭据" → "创建凭据" → "OAuth 客户端 ID"
5. 应用类型选择 "Web 应用"
6. 添加授权重定向 URI：
   - `http://localhost:3000/api/auth/callback/google` (开发)
   - `https://bbq.yourdomain.com/api/auth/callback/google` (生产)
7. 复制 Client ID 和 Client Secret
8. 在管理后台 → 设置中配置

## 生产环境部署

部署到生产环境时，请确保：

1. 使用 HTTPS URL
2. 更新所有 OAuth 回调 URL
3. 使用生产环境的 Stripe 密钥
4. 设置正确的数据库连接
5. 生成新的 AUTH_SECRET

