// Файл с настройками OAuth для социальных сетей
export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string[];
  authorizationUrl: string;
  tokenUrl: string;
}

// Получение базового URL из переменных окружения или использование значения по умолчанию
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pshoeoon.manus.space';

// Предустановленные ключи для упрощенной авторизации
// В реальном приложении эти ключи должны быть заменены на настоящие
const PRESET_KEYS = {
  instagram: {
    clientId: process.env.INSTAGRAM_CLIENT_ID || 'your_instagram_client_id',
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || 'your_instagram_client_secret',
  },
  youtube: {
    clientId: process.env.YOUTUBE_CLIENT_ID || 'your_youtube_client_id',
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET || 'your_youtube_client_secret',
  },
  tiktok: {
    clientId: process.env.TIKTOK_CLIENT_ID || 'your_tiktok_client_id',
    clientSecret: process.env.TIKTOK_CLIENT_SECRET || 'your_tiktok_client_secret',
  }
};

// Конфигурации для каждой социальной сети
export const oauthConfigs: Record<string, OAuthConfig> = {
  instagram: {
    clientId: PRESET_KEYS.instagram.clientId,
    clientSecret: PRESET_KEYS.instagram.clientSecret,
    redirectUri: `${BASE_URL}/api/auth/callback/instagram`,
    scope: ['user_profile', 'user_media'],
    authorizationUrl: 'https://api.instagram.com/oauth/authorize',
    tokenUrl: 'https://api.instagram.com/oauth/access_token'
  },
  youtube: {
    clientId: PRESET_KEYS.youtube.clientId,
    clientSecret: PRESET_KEYS.youtube.clientSecret,
    redirectUri: `${BASE_URL}/api/auth/callback/youtube`,
    scope: ['https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.upload'],
    authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token'
  },
  tiktok: {
    clientId: PRESET_KEYS.tiktok.clientId,
    clientSecret: PRESET_KEYS.tiktok.clientSecret,
    redirectUri: `${BASE_URL}/api/auth/callback/tiktok`,
    scope: ['user.info.basic', 'video.publish'],
    authorizationUrl: 'https://www.tiktok.com/auth/authorize/',
    tokenUrl: 'https://open-api.tiktok.com/oauth/access_token/'
  }
};

// Функция для получения URL авторизации
export function getAuthorizationUrl(provider: string): string {
  if (!oauthConfigs[provider]) {
    throw new Error(`Unsupported provider: ${provider}`);
  }

  const config = oauthConfigs[provider];
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: config.scope.join(' ')
  });

  // Добавляем дополнительные параметры для разных провайдеров
  if (provider === 'youtube') {
    params.append('access_type', 'offline');
    params.append('prompt', 'consent');
  }

  return `${config.authorizationUrl}?${params.toString()}`;
}

// Функция для обмена кода на токен доступа
export async function exchangeCodeForToken(provider: string, code: string) {
  if (!oauthConfigs[provider]) {
    throw new Error(`Unsupported provider: ${provider}`);
  }

  const config = oauthConfigs[provider];
  let body: Record<string, string>;
  
  // Формируем тело запроса в зависимости от провайдера
  if (provider === 'instagram') {
    body = {
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: config.redirectUri,
      code
    };
  } else if (provider === 'youtube') {
    body = {
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: config.redirectUri,
      code
    };
  } else { // tiktok
    body = {
      client_key: config.clientId,
      client_secret: config.clientSecret,
      grant_type: 'authorization_code',
      code
    };
  }

  try {
    // Отправляем запрос на получение токена
    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Token exchange error (${response.status}): ${errorText}`);
      throw new Error(`Failed to exchange code for token: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    
    // Обрабатываем ответ в зависимости от провайдера
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token || '';
    const expiresIn = data.expires_in || 3600;
    const tokenType = data.token_type || 'Bearer';
    
    // Вычисляем время истечения токена
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);
    
    return {
      accessToken,
      refreshToken,
      expiresAt: expiresAt.toISOString(),
      tokenType
    };
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    throw error;
  }
}
