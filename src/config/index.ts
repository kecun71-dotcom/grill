// Load .env files for scripts (tsx/ts-node) - but NOT in Edge Runtime or browser
// This ensures scripts can read DATABASE_URL and other env vars
// Check for real Node.js environment by looking at global 'process' properties
if (
  typeof process !== 'undefined' &&
  typeof process.cwd === 'function' &&
  !process.env.NEXT_RUNTIME // Skip if in Next.js runtime (already loaded)
) {
  try {
    const dotenv = require('dotenv');
    // Load in priority order: .env.local > .env.development > .env
    dotenv.config({ path: '.env.local' });
    dotenv.config({ path: '.env.development', override: false });
    dotenv.config({ path: '.env', override: false });
  } catch (e) {
    // Silently fail - dotenv might not be available in some environments
  }
}

export type ConfigMap = Record<string, string>;

export const envConfigs = {
  app_url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  app_name: process.env.NEXT_PUBLIC_APP_NAME ?? 'ShipAny App',
  theme: process.env.NEXT_PUBLIC_THEME ?? 'default',
  appearance: process.env.NEXT_PUBLIC_APPEARANCE ?? 'system',
  locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en',
  database_url: process.env.DATABASE_URL ?? '',
  database_provider: process.env.DATABASE_PROVIDER ?? 'postgresql',
  db_singleton_enabled: process.env.DB_SINGLETON_ENABLED || 'false',
  auth_url: process.env.AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || '',
  auth_secret: process.env.AUTH_SECRET ?? '', // openssl rand -base64 32
  // Google OAuth
  google_client_id: process.env.GOOGLE_CLIENT_ID ?? '',
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  // Resend Email
  resend_api_key: process.env.RESEND_API_KEY ?? '',
  resend_sender_email: process.env.RESEND_SENDER_EMAIL ?? 'BBQ Menu AI <onboarding@resend.dev>',
  // Creem Payment
  creem_enabled: process.env.CREEM_ENABLED ?? 'false',
  creem_environment: process.env.CREEM_ENVIRONMENT ?? 'sandbox',
  creem_api_key: process.env.CREEM_API_KEY ?? '',
  creem_signing_secret: process.env.CREEM_SIGNING_SECRET ?? '',
  creem_product_ids: process.env.CREEM_PRODUCT_IDS ?? '',
};
