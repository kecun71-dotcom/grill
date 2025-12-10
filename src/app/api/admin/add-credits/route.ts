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
import { getUserByEmail, getUserById } from '@/shared/models/user';

/**
 * 后台管理 API：给用户增加积分（仅限管理员）
 * POST /api/admin/add-credits
 * 
 * Body:
 * - userId: string (可选，用户ID)
 * - userEmail: string (可选，用户邮箱，如果没有 userId 则必填)
 * - credits: number (必填，要增加的积分数量，必须大于 0)
 * - description: string (可选，备注说明)
 */
export async function POST(request: NextRequest) {
  try {
    // 检查管理员认证
    const session = await (await getAuth()).api.getSession({
      headers: request.headers,
    });

    const adminId = session?.user?.id;
    const adminEmail = session?.user?.email;

    if (!adminId) {
      return NextResponse.json(
        { code: 401, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 检查是否是管理员（通过角色或邮箱白名单）
    // 这里简单实现：只有特定邮箱的用户可以操作
    // 你可以根据需要修改这个逻辑
    const adminEmails = [
      'kecun71@gmail.com', // 你的邮箱
      // 可以添加更多管理员邮箱
    ];

    if (!adminEmail || !adminEmails.includes(adminEmail)) {
      return NextResponse.json(
        { code: 403, message: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    // 解析请求体
    const body = await request.json();
    const { userId, userEmail, credits, description } = body;

    // 验证积分数量
    if (!credits || typeof credits !== 'number' || credits <= 0) {
      return NextResponse.json(
        { code: 400, message: 'Credits must be a positive number' },
        { status: 400 }
      );
    }

    // 安全限制：单次最多增加 10000 积分
    if (credits > 10000) {
      return NextResponse.json(
        { code: 400, message: 'Credits cannot exceed 10000 per operation' },
        { status: 400 }
      );
    }

    // 查找目标用户
    let targetUser: any = null;
    
    if (userId) {
      targetUser = await getUserById(userId);
    } else if (userEmail) {
      targetUser = await getUserByEmail(userEmail);
    } else {
      return NextResponse.json(
        { code: 400, message: 'Either userId or userEmail is required' },
        { status: 400 }
      );
    }

    if (!targetUser) {
      return NextResponse.json(
        { code: 404, message: 'User not found' },
        { status: 404 }
      );
    }

    // 获取用户当前积分
    const currentCredits = await getRemainingCredits(targetUser.id);

    // 创建积分记录
    await createCredit({
      id: getUuid(),
      userId: targetUser.id,
      userEmail: targetUser.email,
      transactionNo: getSnowId(),
      transactionType: CreditTransactionType.GRANT,
      transactionScene: CreditTransactionScene.AWARD, // 管理员奖励
      credits: credits,
      remainingCredits: credits,
      description: description || `Admin granted ${credits} credits`,
      expiresAt: null, // 永不过期
      status: CreditStatus.ACTIVE,
      metadata: JSON.stringify({
        grantedBy: adminEmail,
        grantedAt: new Date().toISOString(),
      }),
    });

    // 获取更新后的积分
    const newCredits = await getRemainingCredits(targetUser.id);

    console.log(`[Admin] ${adminEmail} granted ${credits} credits to ${targetUser.email}`);

    return NextResponse.json({
      code: 0,
      message: `Successfully granted ${credits} credits to ${targetUser.email}`,
      data: {
        userId: targetUser.id,
        userEmail: targetUser.email,
        creditsGranted: credits,
        creditsBefore: currentCredits,
        creditsAfter: newCredits,
      },
    });
  } catch (error: any) {
    console.error('Error adding credits:', error);
    return NextResponse.json(
      { code: 500, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

