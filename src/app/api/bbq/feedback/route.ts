import { NextRequest, NextResponse } from 'next/server';

import { getAuth } from '@/core/auth';
import { db } from '@/core/db';
import { getUuid } from '@/shared/lib/hash';

// 由于反馈表还未添加到 schema，我们先创建一个简单的处理
// 后续可以添加到数据库 schema 中

interface FeedbackData {
  recipeId: string;
  recipeName: string;
  rating?: number;
  helpful?: boolean | null;
  comment?: string;
}

/**
 * POST /api/bbq/feedback
 * 提交食谱反馈
 */
export async function POST(request: NextRequest) {
  try {
    const session = await (await getAuth()).api.getSession({
      headers: request.headers,
    });

    // 反馈可以匿名提交
    const userId = session?.user?.id || 'anonymous';

    const body: FeedbackData = await request.json();
    const { recipeId, recipeName, rating, helpful, comment } = body;

    if (!recipeId) {
      return NextResponse.json(
        { error: 'Recipe ID is required' },
        { status: 400 }
      );
    }

    // 简单记录到控制台（生产环境应该存入数据库）
    console.log('Recipe Feedback:', {
      id: getUuid(),
      userId,
      recipeId,
      recipeName,
      rating,
      helpful,
      comment,
      createdAt: new Date().toISOString(),
    });

    // TODO: 将反馈存入数据库
    // 需要先在 schema.ts 中添加 bbq_feedback 表
    // await db().insert(bbqFeedback).values({
    //   id: getUuid(),
    //   userId,
    //   recipeId,
    //   rating,
    //   helpful,
    //   comment,
    // });

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
    });
  } catch (error: any) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/bbq/feedback
 * 获取食谱的反馈统计
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const recipeId = searchParams.get('recipeId');

    if (!recipeId) {
      return NextResponse.json(
        { error: 'Recipe ID is required' },
        { status: 400 }
      );
    }

    // TODO: 从数据库获取反馈统计
    // const feedbacks = await db()
    //   .select()
    //   .from(bbqFeedback)
    //   .where(eq(bbqFeedback.recipeId, recipeId));

    // 返回模拟数据
    return NextResponse.json({
      success: true,
      stats: {
        averageRating: 4.5,
        totalRatings: 12,
        helpfulYes: 8,
        helpfulNo: 2,
        totalComments: 5,
      },
    });
  } catch (error: any) {
    console.error('Error getting feedback:', error);
    return NextResponse.json(
      { error: 'Failed to get feedback', message: error.message },
      { status: 500 }
    );
  }
}

