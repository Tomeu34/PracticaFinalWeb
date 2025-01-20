"use client";
import { useState } from 'react';
import { validateUser } from '../../lib/api';
import { getToken } from '../../lib/auth';
import { useRouter } from 'next/navigation';

export default function Validation() {
  const [code, setCode] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      alert('No hay token. Regístrate o inicia sesión primero.');
      return;
    }
    const res = await validateUser(code, token);
    if (res.ok) {
      alert('Validación correcta');
      router.push('/');
    } else {
      alert('Código incorrecto');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Validar Cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-600" placeholder="Código (6 dígitos)" value={code} onChange={(e) => setCode(e.target.value)} required maxLength={6} />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="w-full py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition duration-300">
              Validar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
