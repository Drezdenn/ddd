import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken } from '../../../../../lib/api/oauth';

export async function GET(
  request,
  { params }
) {
  try {
    const provider = params.provider;
    const searchParams = new URL(request.url).searchParams;
    const code = searchParams.get('code');
    
    console.log(`Callback received for provider: ${provider}, code present: ${!!code}`);
    
    if (!['instagram', 'youtube', 'tiktok'].includes(provider)) {
      console.error(`Invalid provider: ${provider}`);
      return NextResponse.redirect(new URL(`/auth?error=invalid_provider&provider=${provider}`, request.url));
    }
    
    if (!code) {
      console.error('No authorization code received');
      return NextResponse.redirect(new URL(`/auth?error=no_code&provider=${provider}`, request.url));
    }
    
    // Обмен кода на токен доступа
    const tokenData = await exchangeCodeForToken(provider, code);
    console.log(`Token received for ${provider}`);
    
    // В реальном приложении здесь нужно сохранить токен в базе данных или localStorage
    // Для демонстрации просто перенаправляем на страницу dashboard
    const response = NextResponse.redirect(new URL(`/dashboard?provider=${provider}&status=connected`, request.url));
    
    return response;
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(new URL(`/auth?error=token_exchange_failed&provider=${params.provider}`, request.url));
  }
}
