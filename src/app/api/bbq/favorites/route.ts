import { NextRequest, NextResponse } from 'next/server';

import { getAuth } from '@/core/auth';
import {
  addFavorite,
  removeFavorite,
  getUserFavorites,
  isFavorited,
} from '@/shared/models/bbq-recipe';

/**
 * GET /api/bbq/favorites
 * 获取用户的收藏列表
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

    const favorites = await getUserFavorites(session.user.id, { page, limit });

    return NextResponse.json({
      success: true,
      favorites,
      page,
      limit,
    });
  } catch (error: any) {
    console.error('Error getting favorites:', error);
    return NextResponse.json(
      { error: 'Failed to get favorites', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bbq/favorites
 * 添加收藏
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

    // 检查是否已收藏
    const alreadyFavorited = await isFavorited(session.user.id, recipeId);
    if (alreadyFavorited) {
      return NextResponse.json(
        { error: 'Recipe already favorited' },
        { status: 400 }
      );
    }

    await addFavorite(session.user.id, recipeId);

    return NextResponse.json({
      success: true,
      message: 'Recipe added to favorites',
    });
  } catch (error: any) {
    console.error('Error adding favorite:', error);
    return NextResponse.json(
      { error: 'Failed to add favorite', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/bbq/favorites
 * 移除收藏
 */
export async function DELETE(request: NextRequest) {
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

    await removeFavorite(session.user.id, recipeId);

    return NextResponse.json({
      success: true,
      message: 'Recipe removed from favorites',
    });
  } catch (error: any) {
    console.error('Error removing favorite:', error);
    return NextResponse.json(
      { error: 'Failed to remove favorite', message: error.message },
      { status: 500 }
    );
  }
}

