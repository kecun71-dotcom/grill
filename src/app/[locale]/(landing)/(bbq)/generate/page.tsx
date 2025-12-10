import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { GenerateMenuPage } from '@/themes/default/pages/bbq/generate';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'bbq' });

  return {
    title: t('generate.title'),
    description: t('generate.subtitle'),
  };
}

export default async function BBQGeneratePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GenerateMenuPage locale={locale} />;
}

