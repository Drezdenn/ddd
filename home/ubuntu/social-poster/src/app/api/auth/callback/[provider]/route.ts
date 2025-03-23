import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken } from '@/lib/api/oauth';

export async function GET(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
  try {
    const provider = params.provider;
    const searchParams = request.nextUrl.searchParams;
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
    // Для демонстрации просто сохраняем в cookie
    const response = NextResponse.redirect(new URL(`/dashboard?provider=${provider}&status=connected`, request.url));
    
    // Устанавливаем cookie с токеном (в реальном приложении лучше использовать httpOnly cookie)
    response.cookies.set(`${provider}_token`, tokenData.accessToken, {
      maxAge: 60 * 60 * 24 * 30, // 30 дней
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(new URL(`/auth?error=token_exchange_failed&provider=${params.provider}`, request.url));
  }
}
