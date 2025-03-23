// Файл для тестирования OAuth2 авторизации
import { getAuthorizationUrl, exchangeCodeForToken } from '@/lib/api/oauth';

// Тестовые данные
const mockCode = 'test_auth_code';
const mockTokenResponse = {
  access_token: 'mock_access_token',
  refresh_token: 'mock_refresh_token',
  expires_in: 3600,
  token_type: 'Bearer'
};

// Мокаем fetch для тестирования
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockTokenResponse),
  })
);

describe('OAuth2 Authentication', () => {
  test('getAuthorizationUrl should return correct URL for Instagram', () => {
    const url = getAuthorizationUrl('instagram');
    expect(url).toContain('https://api.instagram.com/oauth/authorize');
    expect(url).toContain('client_id=');
    expect(url).toContain('redirect_uri=');
    expect(url).toContain('response_type=code');
  });

  test('getAuthorizationUrl should return correct URL for YouTube', () => {
    const url = getAuthorizationUrl('youtube');
    expect(url).toContain('https://accounts.google.com/o/oauth2/auth');
    expect(url).toContain('client_id=');
    expect(url).toContain('redirect_uri=');
    expect(url).toContain('response_type=code');
  });

  test('getAuthorizationUrl should return correct URL for TikTok', () => {
    const url = getAuthorizationUrl('tiktok');
    expect(url).toContain('https://www.tiktok.com/auth/authorize/');
    expect(url).toContain('client_id=');
    expect(url).toContain('redirect_uri=');
    expect(url).toContain('response_type=code');
  });

  test('exchangeCodeForToken should exchange code for token', async () => {
    const token = await exchangeCodeForToken('instagram', mockCode);
    expect(token.accessToken).toBe('mock_access_token');
    expect(token.refreshToken).toBe('mock_refresh_token');
    expect(token.tokenType).toBe('Bearer');
    expect(token.expiresAt).toBeDefined();
  });
});
