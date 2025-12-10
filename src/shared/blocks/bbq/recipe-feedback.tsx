'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Textarea } from '@/shared/components/ui/textarea';
import { cn } from '@/shared/lib/utils';

interface RecipeFeedbackProps {
  recipeId: string;
  recipeName: string;
  initialRating?: number;
  className?: string;
}

export function RecipeFeedback({
  recipeId,
  recipeName,
  initialRating = 0,
  className,
}: RecipeFeedbackProps) {
  const locale = useLocale();
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const labels = {
    en: {
      rate: 'Rate this recipe',
      helpful: 'Was this recipe helpful?',
      yes: 'Yes',
      no: 'No',
      addComment: 'Add a comment',
      placeholder: 'Share your experience with this recipe...',
      submit: 'Submit Feedback',
      thanks: 'Thanks for your feedback!',
      stars: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
    },
    zh: {
      rate: '为这个食谱评分',
      helpful: '这个食谱有帮助吗？',
      yes: '有帮助',
      no: '没帮助',
      addComment: '添加评论',
      placeholder: '分享您使用这个食谱的经验...',
      submit: '提交反馈',
      thanks: '感谢您的反馈！',
      stars: ['很差', '一般', '不错', '很好', '非常棒'],
    },
    de: {
      rate: 'Bewerten Sie dieses Rezept',
      helpful: 'War dieses Rezept hilfreich?',
      yes: 'Ja',
      no: 'Nein',
      addComment: 'Kommentar hinzufügen',
      placeholder: 'Teilen Sie Ihre Erfahrung mit diesem Rezept...',
      submit: 'Feedback senden',
      thanks: 'Vielen Dank für Ihr Feedback!',
      stars: ['Schlecht', 'Mäßig', 'Gut', 'Sehr gut', 'Ausgezeichnet'],
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  const handleSubmit = async () => {
    if (rating === 0 && helpful === null && !comment.trim()) {
      toast.error(
        locale === 'zh'
          ? '请至少提供一项反馈'
          : locale === 'de'
            ? 'Bitte geben Sie mindestens ein Feedback'
            : 'Please provide at least one feedback'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bbq/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipeId,
          recipeName,
          rating,
          helpful,
          comment: comment.trim(),
        }),
      });

      if (response.ok) {
        setHasSubmitted(true);
        toast.success(t.thanks);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error(
        locale === 'zh'
          ? '提交失败，请重试'
          : locale === 'de'
            ? 'Fehler beim Senden'
            : 'Failed to submit'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasSubmitted) {
    return (
      <Card className={cn('p-6 text-center', className)}>
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <ThumbsUp className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <p className="font-medium">{t.thanks}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('p-6 space-y-6', className)}>
      {/* Star Rating */}
      <div className="space-y-2">
        <h4 className="font-medium">{t.rate}</h4>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1 transition-transform hover:scale-110"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={cn(
                  'h-8 w-8 transition-colors',
                  star <= (hoveredRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                )}
              />
            </button>
          ))}
          {(hoveredRating || rating) > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">
              {t.stars[(hoveredRating || rating) - 1]}
            </span>
          )}
        </div>
      </div>

      {/* Helpful Toggle */}
      <div className="space-y-2">
        <h4 className="font-medium">{t.helpful}</h4>
        <div className="flex gap-3">
          <Button
            variant={helpful === true ? 'default' : 'outline'}
            size="sm"
            className="gap-2"
            onClick={() => setHelpful(true)}
          >
            <ThumbsUp className="h-4 w-4" />
            {t.yes}
          </Button>
          <Button
            variant={helpful === false ? 'default' : 'outline'}
            size="sm"
            className="gap-2"
            onClick={() => setHelpful(false)}
          >
            <ThumbsDown className="h-4 w-4" />
            {t.no}
          </Button>
        </div>
      </div>

      {/* Comment Section */}
      <div className="space-y-2">
        {!showComment ? (
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground"
            onClick={() => setShowComment(true)}
          >
            <MessageSquare className="h-4 w-4" />
            {t.addComment}
          </Button>
        ) : (
          <Textarea
            placeholder={t.placeholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="resize-none"
          />
        )}
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full gap-2"
      >
        <Send className="h-4 w-4" />
        {t.submit}
      </Button>
    </Card>
  );
}

