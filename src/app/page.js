"use client";
import { useEffect, useState } from 'react';
import { getToken } from '../lib/auth';

export default function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(getToken());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Bienvenido a <span className="text-yellow-300">PracticaFinal 2025</span></h1>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-gray-800">
        {token ? (
          <p className="text-xl">Ya has iniciado sesión. Ve a la sección de <a href="/clients" className="text-teal-600 font-semibold hover:underline">clientes</a> para comenzar.</p>
        ) : (
          <p className="text-xl">Por favor, <a href="/login" className="text-teal-600 font-semibold hover:underline">inicia sesión</a> o <a href="/register" className="text-teal-600 font-semibold hover:underline">regístrate</a> para empezar.</p>
        )}
      </div>
    </div>
  );
}
