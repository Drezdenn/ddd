# Social Media Poster - Инструкция по установке

Это приложение позволяет публиковать контент одновременно в Instagram, YouTube и TikTok с использованием OAuth2 авторизации.

## Требования

- Node.js 18+ и npm/pnpm
- Учетные записи разработчика в Instagram, YouTube и TikTok для получения API ключей

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/social-poster.git
cd social-poster
```

2. Установите зависимости:
```bash
pnpm install
```

3. Создайте файл `.env.local` в корне проекта со следующими переменными:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Instagram API Keys
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret

# YouTube API Keys
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret

# TikTok API Keys
TIKTOK_CLIENT_ID=your_tiktok_client_id
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
```

4. Запустите приложение в режиме разработки:
```bash
pnpm dev
```

5. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Настройка API ключей

### Instagram
1. Создайте приложение на [Facebook Developer Portal](https://developers.facebook.com/)
2. Добавьте продукт Instagram Basic Display
3. Настройте URL перенаправления: `http://localhost:3000/api/auth/callback/instagram`
4. Скопируйте Client ID и Client Secret в файл `.env.local`

### YouTube
1. Создайте проект в [Google Cloud Console](https://console.cloud.google.com/)
2. Включите YouTube Data API v3
3. Создайте учетные данные OAuth 2.0
4. Настройте URL перенаправления: `http://localhost:3000/api/auth/callback/youtube`
5. Скопируйте Client ID и Client Secret в файл `.env.local`

### TikTok
1. Создайте приложение на [TikTok for Developers](https://developers.tiktok.com/)
2. Настройте URL перенаправления: `http://localhost:3000/api/auth/callback/tiktok`
3. Скопируйте Client ID и Client Secret в файл `.env.local`

## Сборка для продакшена

```bash
pnpm build
```

## Развертывание

Приложение можно развернуть на Cloudflare Pages или Vercel:

### Cloudflare Pages
```bash
pnpm run deploy
```

### Vercel
```bash
vercel
```
