"use client";
import { useState } from 'react';
import { loginUser } from '../../lib/api';
import { setToken } from '../../lib/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await loginUser(email, password);
    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
      router.push('/');
    } else {
      alert('Error de login');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-purple-600" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <input className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-purple-600" placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-300">
              Entrar
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-gray-600">
          <p>
            ¿No tienes cuenta?{' '}
            <a href="/register" className="text-purple-600 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
