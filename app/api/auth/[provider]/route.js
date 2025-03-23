import { NextRequest, NextResponse } from 'next/server';
import { getAuthorizationUrl } from '../../../../lib/api/oauth';

export async function GET(
  request,
  { params }
) {
  try {
    const provider = params.provider;
    
    // Добавляем логирование для отладки
    console.log(`Attempting to authenticate with provider: ${provider}`);
    
    if (!['instagram', 'youtube', 'tiktok'].includes(provider)) {
      console.error(`Invalid provider: ${provider}`);
      return NextResponse.json(
        { error: 'Invalid provider' },
        { status: 400 }
      );
    }

    // Получаем URL авторизации с предустановленными ключами
    const authUrl = getAuthorizationUrl(provider);
    console.log(`Generated auth URL: ${authUrl}`);
    
    // Выполняем прямой редирект на страницу авторизации социальной сети
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('OAuth authentication error:', error);
    return NextResponse.json(
      { error: 'Authentication failed', details: error.message },
      { status: 500 }
    );
  }
}
