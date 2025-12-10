import { NextRequest, NextResponse } from 'next/server';

import { getAuth } from '@/core/auth';
import { getWelcomeEmailTemplate } from '@/shared/lib/email-templates';

/**
 * POST /api/bbq/subscribe
 * 订阅 BBQ 新闻通讯
 */
export async function POST(request: NextRequest) {
  try {
    const { email, locale = 'en' } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TODO: 将邮箱存入数据库订阅列表
    // await db().insert(subscribers).values({
    //   email,
    //   locale,
    //   subscribedAt: new Date(),
    // });

    console.log('New subscriber:', { email, locale });

    // 发送欢迎邮件
    // const { subject, html } = getWelcomeEmailTemplate({
    //   userName: email.split('@')[0],
    //   loginUrl: `${process.env.NEXT_PUBLIC_APP_URL}/sign-in`,
    //   locale,
    // });
    
    // await sendEmail({ to: email, subject, html });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error: any) {
    console.error('Error subscribing:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/bbq/subscribe
 * 取消订阅
 */
export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // TODO: 从数据库中移除订阅
    // await db().delete(subscribers).where(eq(subscribers.email, email));

    console.log('Unsubscribed:', { email });

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed',
    });
  } catch (error: any) {
    console.error('Error unsubscribing:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe', message: error.message },
      { status: 500 }
    );
  }
}

