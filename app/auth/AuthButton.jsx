'use client';  // Это важная директива, которая указывает, что это клиентский компонент

import React from 'react';

export default function AuthButton({ provider, label }) {
  const connectAccount = () => {
    console.log(`Connecting to ${provider}...`);
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <button 
      onClick={connectAccount}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      {label || 'Подключить'}
    </button>
  );
}
