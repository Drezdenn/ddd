# Инструкция по настройке API ключей для социальных сетей

Для полноценной работы приложения Social Media Poster необходимо настроить API ключи для каждой социальной сети. Ниже приведены подробные инструкции по получению ключей для Instagram, YouTube и TikTok.

## Instagram (через Facebook Developer)

1. Перейдите на [Facebook Developer Portal](https://developers.facebook.com/)
2. Войдите в свой аккаунт Facebook
3. Нажмите "My Apps" и затем "Create App"
4. Выберите тип приложения "Consumer" и нажмите "Next"
5. Введите название приложения и контактный email, нажмите "Create App"
6. В меню слева найдите "Instagram Basic Display" и нажмите "Set Up"
7. В разделе "Valid OAuth Redirect URIs" добавьте:
   ```
   https://pshoeoon.manus.space/api/auth/callback/instagram
   ```
8. Заполните другие обязательные поля и сохраните настройки
9. Перейдите в раздел "Basic Display" и скопируйте "Instagram App ID" и "Instagram App Secret"

## YouTube (через Google Cloud Console)

1. Перейдите на [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. В меню слева выберите "APIs & Services" > "Library"
4. Найдите и активируйте "YouTube Data API v3"
5. Перейдите в "APIs & Services" > "Credentials"
6. Нажмите "Create Credentials" и выберите "OAuth client ID"
7. Выберите тип приложения "Web application"
8. В разделе "Authorized redirect URIs" добавьте:
   ```
   https://pshoeoon.manus.space/api/auth/callback/youtube
   ```
9. Нажмите "Create" и скопируйте "Client ID" и "Client Secret"

## TikTok

1. Перейдите на [TikTok for Developers](https://developers.tiktok.com/)
2. Войдите или создайте аккаунт разработчика
3. Нажмите "Manage Apps" и затем "Create App"
4. Заполните информацию о приложении и выберите категорию
5. В настройках приложения перейдите в раздел "App Information"
6. В разделе "Redirect Domain" добавьте:
   ```
   pshoeoon.manus.space
   ```
7. В разделе "Redirect URI" добавьте:
   ```
   https://pshoeoon.manus.space/api/auth/callback/tiktok
   ```
8. Сохраните настройки и скопируйте "Client Key" и "Client Secret"

## Добавление ключей в приложение

После получения всех необходимых ключей, их нужно добавить в переменные окружения приложения:

1. Перейдите в настройки хостинга вашего приложения
2. Найдите раздел "Environment Variables" или "Config Vars"
3. Добавьте следующие переменные:

```
INSTAGRAM_CLIENT_ID=ваш_instagram_client_id
INSTAGRAM_CLIENT_SECRET=ваш_instagram_client_secret
YOUTUBE_CLIENT_ID=ваш_youtube_client_id
YOUTUBE_CLIENT_SECRET=ваш_youtube_client_secret
TIKTOK_CLIENT_ID=ваш_tiktok_client_id
TIKTOK_CLIENT_SECRET=ваш_tiktok_client_secret
NEXT_PUBLIC_BASE_URL=https://pshoeoon.manus.space
```

4. Сохраните изменения и перезапустите приложение

После этих настроек функция авторизации через OAuth2 должна работать корректно, и вы сможете подключать свои аккаунты социальных сетей к приложению.
