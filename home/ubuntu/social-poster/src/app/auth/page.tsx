import React from 'react';

export default function AuthPage() {
  const connectAccount = async (provider) => {
    try {
      console.log(`Connecting to ${provider}...`);
      
      // Прямой переход на API-маршрут, который выполнит редирект на страницу авторизации
      window.location.href = `/api/auth/${provider}`;
    } catch (error) {
      console.error(`Error in connectAccount for ${provider}:`, error);
      alert(`Ошибка при подключении к ${provider}: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Подключение аккаунтов социальных сетей</h1>
      
      <div className="w-full max-w-md space-y-4">
        <div className="border rounded p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Instagram</h2>
            <p className="text-gray-600">Нажмите для подключения</p>
          </div>
          <button 
            onClick={() => connectAccount('instagram')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Подключить
          </button>
        </div>
        
        <div className="border rounded p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">YouTube</h2>
            <p className="text-gray-600">Нажмите для подключения</p>
          </div>
          <button 
            onClick={() => connectAccount('youtube')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Подключить
          </button>
        </div>
        
        <div className="border rounded p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">TikTok</h2>
            <p className="text-gray-600">Нажмите для подключения</p>
          </div>
          <button 
            onClick={() => connectAccount('tiktok')}
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded"
          >
            Подключить
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <a href="/" className="text-blue-500 hover:underline">Вернуться на главную</a>
      </div>
    </div>
  );
}
