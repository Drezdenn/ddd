import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Получаем данные поста из запроса
    const data = await request.json();
    const { text, networks, scheduledTime } = data;
    
    // Получаем токены доступа из куки
    const cookieStore = cookies();
    const tokens = {
      instagram: cookieStore.get('instagram_token')?.value,
      youtube: cookieStore.get('youtube_token')?.value,
      tiktok: cookieStore.get('tiktok_token')?.value
    };
    
    // Проверяем наличие токенов для выбранных сетей
    const results = {};
    
    // Публикуем в выбранные сети
    if (networks.instagram && tokens.instagram) {
      // В реальном приложении здесь будет вызов API Instagram
      results['instagram'] = { success: true, message: 'Пост успешно опубликован в Instagram' };
    }
    
    if (networks.youtube && tokens.youtube) {
      // В реальном приложении здесь будет вызов API YouTube
      results['youtube'] = { success: true, message: 'Видео успешно опубликовано на YouTube' };
    }
    
    if (networks.tiktok && tokens.tiktok) {
      // В реальном приложении здесь будет вызов API TikTok
      results['tiktok'] = { success: true, message: 'Видео успешно опубликовано в TikTok' };
    }
    
    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Post error:', error);
    return NextResponse.json({ success: false, error: 'Failed to publish post' }, { status: 500 });
  }
}
