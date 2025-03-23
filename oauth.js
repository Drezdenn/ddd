// Предустановленные ключи API для упрощения процесса авторизации
const PRESET_KEYS = {
  instagram: {
    clientId: '2469585853391973',
    clientSecret: 'cdb846541120f90d0f55ddc890e0adbf',
    redirectUri: 'http://localhost:3000/api/auth/callback/instagram'
  },
  youtube: {
    clientId: '624971433562-59a8oii0agcdil0nnomrfl2p0jth5hfc.apps.googleusercontent.com',
    clientSecret: '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',
    redirectUri: 'http://localhost:3000/api/auth/callback/youtube'
  },
  tiktok: {
    clientId: 'aw3b9kof048x7t3e',
    clientSecret: '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',
    redirectUri: 'http://localhost:3000/api/auth/callback/tiktok'
  }
};

// Функция для получения URL авторизации
export function getAuthorizationUrl(provider)  {
  const config = PRESET_KEYS[provider];
  
  if (!config) {
    throw new Error(`Unsupported provider: ${provider}`);
  }
  
  let authUrl = '';
  
  switch (provider) {
    case 'instagram':
      authUrl = `https://api.instagram.com/oauth/authorize?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri) }&scope=user_profile,user_media&response_type=code`;
      break;
    case 'youtube':
      authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri) }&scope=https://www.googleapis.com/auth/youtube&response_type=code&access_type=offline`;
      break;
    case 'tiktok':
      authUrl = `https://www.tiktok.com/auth/authorize?client_key=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri) }&scope=user.info.basic&response_type=code`;
      break;
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
  
  return authUrl;
}

// Функция для обмена кода на токен доступа
export async function exchangeCodeForToken(provider, code) {
  const config = PRESET_KEYS[provider];
  
  if (!config) {
    throw new Error(`Unsupported provider: ${provider}`);
  }
  
  // В реальном приложении здесь должен быть запрос к API социальной сети
  // Для демонстрации возвращаем фиктивные данные
  return {
    accessToken: `demo_access_token_for_${provider}`,
    refreshToken: `demo_refresh_token_for_${provider}`,
    expiresIn: 3600
  };
}
