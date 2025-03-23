import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Social Media Poster</h1>
        <p className="text-xl mb-8 text-center">
          Публикуйте контент одновременно в Instagram, YouTube и TikTok
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/auth" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Подключить аккаунты
          </Link>
          <Link 
            href="/dashboard" 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Создать пост
          </Link>
        </div>
      </div>
    </div>
  );
}
