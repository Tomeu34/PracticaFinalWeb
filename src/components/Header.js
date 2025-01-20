"use client";
import Link from 'next/link';
import { clearToken, getToken } from '../lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const [token, setToken] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setToken(getToken());
  }, [pathname]);

  function handleLogout() {
    clearToken();
    setToken(null);
    router.push('/');
  }

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-lg">

      <div className="text-2xl font-bold">
        <Link href="/" aria-label="Ir a la página principal">PracticaFinal</Link>
      </div>

      <div>
        {!token ? (
          <>
            <Link className="mr-4 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors" href="/login" aria-label="Ir a la página de inicio de sesión">Login</Link>
            <Link className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors" href="/register" aria-label="Ir a la página de registro">Registro</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-400 transition-colors text-white rounded-lg" aria-label="Cerrar sesión">Cerrar Sesión</button>
        )}
      </div>
    </header>
  );
}
