# Промпт для следующего чата: Разработка приложения для автопостинга в социальные сети

## Описание задачи
Необходимо продолжить разработку веб-приложения для автопостинга в социальные сети (Instagram, YouTube, TikTok), аналогичного функционалу Metricool. Приложение должно позволять пользователям авторизоваться в социальных сетях через OAuth2 и публиковать контент одновременно во все подключенные платформы.

## Текущий статус проекта
1. Создана базовая структура Next.js приложения
2. Реализован упрощенный поток OAuth2 авторизации "в один клик" (как в Metricool)
3. Разработан интерфейс для создания и публикации постов
4. Подготовлены API-маршруты для взаимодействия с социальными сетями
5. Создана документация по настройке и использованию приложения

## Ключевые требования
- Автопостинг одновременно в Instagram, YouTube и TikTok
- Авторизация через OAuth2 с упрощенным процессом "в один клик"
- Минимальный набор функций (только создание и публикация постов)
- Возможность расширения функциональности в будущем

## Следующие шаги
1. Улучшить обработку ошибок при авторизации и публикации
2. Добавить функцию предварительного просмотра постов
3. Реализовать сохранение черновиков постов
4. Добавить возможность планирования времени публикации
5. Улучшить пользовательский интерфейс

## Технические детали
- Фреймворк: Next.js
- Авторизация: OAuth2
- API социальных сетей: Instagram Graph API, YouTube Data API, TikTok API
- Хранение данных: Локальное хранилище (localStorage) или база данных

## Особые указания
- Для работы с реальными аккаунтами необходимо зарегистрировать приложения в панелях разработчика каждой социальной сети и получить API ключи
- Приложение должно использовать предустановленные API ключи для упрощения процесса авторизации для конечных пользователей
- Пользовательский интерфейс должен быть интуитивно понятным и минималистичным
