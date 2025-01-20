import './globals.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export const metadata = {
  title: 'PracticaFinal',
  description: 'Gestiona clientes y proyectos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col h-screen text-black">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 overflow-auto bg-gray-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
