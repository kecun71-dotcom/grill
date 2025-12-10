import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { oneTap } from 'better-auth/plugins';

import { db } from '@/core/db';
import { envConfigs } from '@/config';
import * as schema from '@/config/db/schema';
import { getSnowId, getUuid } from '@/shared/lib/hash';
import { getAllConfigs } from '@/shared/models/config';
import {
  createCredit,
  CreditStatus,
  CreditTransactionScene,
  CreditTransactionType,
} from '@/shared/models/credit';

// 新用户初始赠送的积分数量
const INITIAL_FREE_CREDITS = 3;

// Static auth options - NO database connection
// This ensures zero database calls during build time
export const authOptions = {
  appName: envConfigs.app_name,
  baseURL: envConfigs.auth_url,
  secret: envConfigs.auth_secret,
  trustedOrigins: envConfigs.app_url ? [envConfigs.app_url] : [],
  advanced: {
    database: {
      generateId: () => getUuid(),
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  logger: {
    verboseLogging: false,
    // Disable all logs during build and production
    disabled: true,
  },
};

// Dynamic auth options - WITH database connection
// Only used in API routes that actually need database access
export async function getAuthOptions() {
  const configs = await getAllConfigs();
  return {
    ...authOptions,
    // Add database connection only when actually needed (runtime)
    database: envConfigs.database_url
      ? drizzleAdapter(db(), {
          provider: getDatabaseProvider(envConfigs.database_provider),
          schema: schema,
        })
      : null,
    emailAndPassword: {
      enabled: configs.email_auth_enabled !== 'false',
    },
    socialProviders: await getSocialProviders(configs),
    plugins:
      configs.google_client_id && configs.google_one_tap_enabled === 'true'
        ? [oneTap()]
        : [],
    // 数据库钩子：新用户注册后自动赠送免费积分
    databaseHooks: {
      user: {
        create: {
          after: async (user: { id: string; email: string }) => {
            try {
              // 为新用户创建免费积分
              await createCredit({
                id: getUuid(),
                userId: user.id,
                userEmail: user.email,
                transactionNo: getSnowId(),
                transactionType: CreditTransactionType.GRANT,
                transactionScene: CreditTransactionScene.GIFT,
                credits: INITIAL_FREE_CREDITS,
                remainingCredits: INITIAL_FREE_CREDITS,
                description: `Welcome bonus: ${INITIAL_FREE_CREDITS} free credits. Please purchase more when used up.`,
                expiresAt: null, // 永不过期
                status: CreditStatus.ACTIVE,
              });
              console.log(`[Auth] Granted ${INITIAL_FREE_CREDITS} free credits to new user: ${user.email}`);
            } catch (error) {
              console.error('[Auth] Failed to grant free credits to new user:', error);
              // 不抛出错误，避免影响用户注册流程
            }
          },
        },
      },
    },
  };
}

export async function getSocialProviders(configs: Record<string, string>) {
  // get configs from db, with environment variables as fallback
  const providers: any = {};

  // Google OAuth - 优先从数据库读取，其次从环境变量读取
  const googleClientId = configs.google_client_id || envConfigs.google_client_id;
  const googleClientSecret = configs.google_client_secret || envConfigs.google_client_secret;
  
  if (googleClientId && googleClientSecret) {
    providers.google = {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    };
  }

  // GitHub OAuth
  if (configs.github_client_id && configs.github_client_secret) {
    providers.github = {
      clientId: configs.github_client_id,
      clientSecret: configs.github_client_secret,
    };
  }

  return providers;
}

export function getDatabaseProvider(
  provider: string
): 'sqlite' | 'pg' | 'mysql' {
  switch (provider) {
    case 'sqlite':
      return 'sqlite';
    case 'postgresql':
      return 'pg';
    case 'mysql':
      return 'mysql';
    default:
      throw new Error(
        `Unsupported database provider for auth: ${envConfigs.database_provider}`
      );
  }
}
