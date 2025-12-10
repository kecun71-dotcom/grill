import { NextRequest, NextResponse } from 'next/server';

import { getAuth } from '@/core/auth';
import {
  recordRecipeView,
  getRecipeHistory,
} from '@/shared/models/bbq-recipe';

/**
 * GET /api/bbq/history
 * 获取用户的浏览历史
 */
export async function GET(request: NextRequest) {
  try {
    const session = await (await getAuth()).api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const history = await getRecipeHistory(session.user.id, { page, limit });

    return NextResponse.json({
      success: true,
      history,
      page,
      limit,
    });
  } catch (error: any) {
    console.error('Error getting history:', error);
    return NextResponse.json(
      { error: 'Failed to get history', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bbq/history
 * 记录浏览历史
 */
export async function POST(request: NextRequest) {
  try {
    const session = await (await getAuth()).api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { recipeId } = await request.json();

    if (!recipeId) {
      return NextResponse.json(
        { error: 'Recipe ID is required' },
        { status: 400 }
      );
    }

    await recordRecipeView(session.user.id, recipeId);

    return NextResponse.json({
      success: true,
      message: 'View recorded',
    });
  } catch (error: any) {
    console.error('Error recording view:', error);
    return NextResponse.json(
      { error: 'Failed to record view', message: error.message },
      { status: 500 }
    );
  }
}

