// Файл для тестирования функции отправки постов
import { NextRequest, NextResponse } from 'next/server';

// Мокаем cookies для тестирования
jest.mock('next/headers', () => ({
  cookies: () => ({
    get: (name: string) => {
      if (name === 'instagram_token') return { value: 'mock_instagram_token' };
      if (name === 'youtube_token') return { value: 'mock_youtube_token' };
      if (name === 'tiktok_token') return { value: 'mock_tiktok_token' };
      return null;
    }
  })
}));

// Импортируем функцию для тестирования
import { POST } from '@/app/api/post/route';

describe('Post API', () => {
  test('should successfully publish post to selected networks', async () => {
    // Создаем мок запроса
    const mockRequest = {
      json: () => Promise.resolve({
        text: 'Test post content',
        networks: {
          instagram: true,
          youtube: true,
          tiktok: false
        },
        scheduledTime: null
      })
    } as unknown as NextRequest;

    // Вызываем функцию API
    const response = await POST(mockRequest);
    const data = await response.json();

    // Проверяем результат
    expect(data.success).toBe(true);
    expect(data.results.instagram).toBeDefined();
    expect(data.results.instagram.success).toBe(true);
    expect(data.results.youtube).toBeDefined();
    expect(data.results.youtube.success).toBe(true);
    expect(data.results.tiktok).toBeUndefined();
  });

  test('should handle scheduled posts', async () => {
    // Создаем мок запроса с запланированным временем
    const mockRequest = {
      json: () => Promise.resolve({
        text: 'Scheduled post content',
        networks: {
          instagram: true,
          youtube: false,
          tiktok: false
        },
        scheduledTime: '2025-04-01T12:00:00'
      })
    } as unknown as NextRequest;

    // Вызываем функцию API
    const response = await POST(mockRequest);
    const data = await response.json();

    // Проверяем результат
    expect(data.success).toBe(true);
    expect(data.results.instagram).toBeDefined();
    expect(data.results.instagram.success).toBe(true);
  });
});
