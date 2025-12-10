'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';

interface CookingTimerProps {
  initialMinutes: number;
  stepName: string;
  className?: string;
}

export function CookingTimer({
  initialMinutes,
  stepName,
  className,
}: CookingTimerProps) {
  const t = useTranslations('bbq.timer');
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 简单的提示音
      audioRef.current = new Audio(
        'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFA=='
      );
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            if (audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
    setIsFinished(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialMinutes * 60);
    setIsFinished(false);
  };

  const progress =
    ((initialMinutes * 60 - timeLeft) / (initialMinutes * 60)) * 100;

  return (
    <Card
      className={cn(
        'bbq-timer overflow-hidden',
        isFinished && 'ring-2 ring-primary shadow-lg',
        className
      )}
    >
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <h3 className="font-semibold">{stepName}</h3>
        </div>

        {/* Timer Display */}
        <div className="text-center py-4">
          <div
            className={cn(
              'bbq-timer-display',
              isFinished && 'text-yellow-300 animate-pulse'
            )}
          >
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm opacity-80 mt-2">
            {isFinished
              ? t('time_up')
              : `${initialMinutes} min ${t('remaining')}`}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bbq-progress">
          <div
            className="bbq-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            onClick={handleStartPause}
            className="flex-1 gap-2"
            variant={isRunning ? 'outline' : 'default'}
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4" />
                {t('pause')}
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                {timeLeft === initialMinutes * 60 ? t('start') : t('resume')}
              </>
            )}
          </Button>
          <Button onClick={handleReset} variant="outline" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

