'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';

interface SocialShareProps {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function SocialShare({
  title,
  description = '',
  url,
  image,
  className,
  variant = 'outline',
  size = 'default',
}: SocialShareProps) {
  const locale = useLocale();
  const t = useTranslations('bbq.recipe');
  const [copied, setCopied] = useState(false);

  // 获取当前页面 URL
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success(
        locale === 'zh'
          ? '链接已复制'
          : locale === 'de'
            ? 'Link kopiert'
            : 'Link copied'
      );
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error(
        locale === 'zh'
          ? '复制失败'
          : locale === 'de'
            ? 'Kopieren fehlgeschlagen'
            : 'Failed to copy'
      );
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    }
  };

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400,noopener,noreferrer');
  };

  // 如果支持原生分享 API，优先使用
  if (typeof navigator !== 'undefined' && navigator.share) {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn('gap-2', className)}
        onClick={handleNativeShare}
      >
        <Share2 className="h-4 w-4" />
        {size !== 'icon' && t('share')}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={cn('gap-2', className)}>
          <Share2 className="h-4 w-4" />
          {size !== 'icon' && t('share')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => openShareWindow(shareLinks.twitter)}>
          <Twitter className="h-4 w-4 mr-2" />
          Twitter / X
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShareWindow(shareLinks.facebook)}>
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShareWindow(shareLinks.linkedin)}>
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShareWindow(shareLinks.whatsapp)}>
          <MessageCircle className="h-4 w-4 mr-2" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => (window.location.href = shareLinks.email)}
        >
          <Mail className="h-4 w-4 mr-2" />
          Email
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyLink}>
          {copied ? (
            <Check className="h-4 w-4 mr-2 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 mr-2" />
          )}
          {locale === 'zh'
            ? '复制链接'
            : locale === 'de'
              ? 'Link kopieren'
              : 'Copy Link'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

