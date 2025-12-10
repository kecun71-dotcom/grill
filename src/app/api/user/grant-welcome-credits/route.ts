import { NextRequest, NextResponse } from 'next/server';

import { getAuth } from '@/core/auth';
import { getSnowId, getUuid } from '@/shared/lib/hash';
import {
  createCredit,
  CreditStatus,
  CreditTransactionScene,
  CreditTransactionType,
  getRemainingCredits,
} from '@/shared/models/credit';

// 欢迎积分数量（与新用户注册一致）
const WELCOME_CREDITS = 3;

/**
 * 给当前登录用户发放欢迎积分（仅用于现有用户测试）
 * POST /api/user/grant-welcome-credits
 */
export async function POST(request: NextRequest) {
  try {
    // 检查用户认证
    const session = await (await getAuth()).api.getSession({
      headers: request.headers,
    });

    const userId = session?.user?.id;
    const userEmail = session?.user?.email;

    if (!userId) {
      return NextResponse.json(
        { code: 401, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 检查用户当前积分
    const currentCredits = await getRemainingCredits(userId);

    // 如果已有积分，不重复发放
    if (currentCredits > 0) {
      return NextResponse.json({
        code: 0,
        message: 'You already have credits',
        data: {
          currentCredits,
          granted: false,
        },
      });
    }

    // 发放欢迎积分
    await createCredit({
      id: getUuid(),
      userId: userId,
      userEmail: userEmail || undefined,
      transactionNo: getSnowId(),
      transactionType: CreditTransactionType.GRANT,
      transactionScene: CreditTransactionScene.GIFT,
      credits: WELCOME_CREDITS,
      remainingCredits: WELCOME_CREDITS,
      description: `Welcome bonus: ${WELCOME_CREDITS} free credits. Please purchase more when used up.`,
      expiresAt: null, // 永不过期
      status: CreditStatus.ACTIVE,
    });

    const newCredits = await getRemainingCredits(userId);

    return NextResponse.json({
      code: 0,
      message: `Successfully granted ${WELCOME_CREDITS} welcome credits!`,
      data: {
        creditsGranted: WELCOME_CREDITS,
        currentCredits: newCredits,
        granted: true,
      },
    });
  } catch (error: any) {
    console.error('Error granting welcome credits:', error);
    return NextResponse.json(
      { code: 500, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

