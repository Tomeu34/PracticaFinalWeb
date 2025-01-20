"use client";
import { useState } from 'react';
import { registerUser } from '../../lib/api';
import { setToken } from '../../lib/auth';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    const res = await registerUser({nombre, apellidos, email, password});
    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
      router.push('/validation');
    } else {
      alert('Error en el registro');
    }
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Crear Cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
          </div>
          <div>
            <input
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
          </div>
          <div>
            <input
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div>
            <input className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600" placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <input className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600" placeholder="Confirmar Contraseña" type="password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
              Registrarse
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-gray-600">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Iniciar sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
