import { db } from '@/core/db';
import { envConfigs } from '@/config';
import { config } from '@/config/db/schema';

import { publicSettingNames } from '../services/settings';

export type Config = typeof config.$inferSelect;
export type NewConfig = typeof config.$inferInsert;
export type UpdateConfig = Partial<Omit<NewConfig, 'name'>>;

export type Configs = Record<string, string>;

export async function saveConfigs(configs: Record<string, string>) {
  const result = await db().transaction(async (tx) => {
    const configEntries = Object.entries(configs);
    const results = [];

    for (const [name, configValue] of configEntries) {
      const [upsertResult] = await tx
        .insert(config)
        .values({ name, value: configValue })
        .onConflictDoUpdate({
          target: config.name,
          set: { value: configValue },
        })
        .returning();

      results.push(upsertResult);
    }

    return results;
  });

  return result;
}

export async function addConfig(newConfig: NewConfig) {
  const [result] = await db().insert(config).values(newConfig).returning();

  return result;
}

export async function getConfigs(): Promise<Configs> {
  const configs: Record<string, string> = {};

  if (envConfigs.database_url) {
    try {
      const result = await db().select().from(config);
      if (result) {
        for (const cfg of result) {
          configs[cfg.name] = cfg.value ?? '';
        }
      }
    } catch (e) {
      console.log('Failed to get configs from db:', e);
    }
  }

  // 如果环境变量中有 Google 凭据，自动启用 Google 登录
  if (envConfigs.google_client_id && envConfigs.google_client_secret) {
    if (!configs.google_auth_enabled) {
      configs.google_auth_enabled = 'true';
    }
    if (!configs.google_client_id) {
      configs.google_client_id = envConfigs.google_client_id;
    }
    if (!configs.google_client_secret) {
      configs.google_client_secret = envConfigs.google_client_secret;
    }
  }

  // 如果环境变量中有 Creem 配置，自动启用 Creem 支付
  if (envConfigs.creem_api_key) {
    if (!configs.creem_enabled && envConfigs.creem_enabled === 'true') {
      configs.creem_enabled = 'true';
    }
    if (!configs.creem_environment) {
      configs.creem_environment = envConfigs.creem_environment;
    }
    if (!configs.creem_api_key) {
      configs.creem_api_key = envConfigs.creem_api_key;
    }
    if (!configs.creem_signing_secret) {
      configs.creem_signing_secret = envConfigs.creem_signing_secret;
    }
    if (!configs.creem_product_ids && envConfigs.creem_product_ids) {
      configs.creem_product_ids = envConfigs.creem_product_ids;
    }
    // 设置 Creem 为默认支付方式
    if (!configs.default_payment_provider) {
      configs.default_payment_provider = 'creem';
    }
  }

  return configs;
}

export async function getAllConfigs(): Promise<Configs> {
  let dbConfigs: Configs = {};

  // only get configs from db in server side
  if (envConfigs.database_url) {
    try {
      dbConfigs = await getConfigs();
    } catch (e) {
      console.log(`get configs from db failed:`, e);
      dbConfigs = {};
    }
  }

  const configs = {
    ...envConfigs,
    ...dbConfigs,
  };

  return configs;
}

export async function getPublicConfigs(): Promise<Configs> {
  let dbConfigs: Configs = {};

  // only get configs from db in server side
  if (typeof window === 'undefined' && envConfigs.database_url) {
    try {
      dbConfigs = await getConfigs();
    } catch (e) {
      console.log('get configs from db failed:', e);
      dbConfigs = {};
    }
  }

  const publicConfigs: Record<string, string> = {};

  // get public configs from db
  for (const key in dbConfigs) {
    if (publicSettingNames.includes(key)) {
      publicConfigs[key] = dbConfigs[key];
    }
  }

  const configs = {
    ...publicConfigs,
  };

  return configs;
}
