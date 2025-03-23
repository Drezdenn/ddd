export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Приложение для автопостинга в социальные сети</h1>
      <p className="mt-4 text-xl">
        Публикуйте контент одновременно в Instagram, YouTube и TikTok
      </p>
      <div className="mt-8">
        <a href="/auth" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
          Подключить аккаунты
        </a>
      </div>
    </main>
  );
}