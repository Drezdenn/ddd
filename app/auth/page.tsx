import React from 'react';
import AuthButton from './AuthButton';

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Подключение аккаунтов социальных сетей</h1>
      
      <div className="w-full max-w-md space-y-4">
        <div className="border rounded p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Instagram</h2>
            <p className="text-gray-600">Нажмите для подключения</p>
          </div>
          <AuthButton provider="instagram" label="Подключить" />
        </div>
        
        <div className="border rounded p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">YouTube</h2>
            <p className="text-gray-600">Нажмите для подключения</p>
          </div>
          <AuthButton provider="youtube" label="Подключить" />
        </div>
        
        <div className="border rounded p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">TikTok</h2>
            <p className="text-gray-600">Нажмите для подключения</p>
          </div>
          <AuthButton provider="tiktok" label="Подключить" />
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <a href="/" className="text-blue-500 hover:underline">Вернуться на главную</a>
      </div>
    </div>
  );
}
