import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-teal-500 to-teal-700 text-white border-r p-6 shadow-lg">
      <nav aria-label="Menú principal">
        <ul className="space-y-4">
          <li><Link href="/clients" className="block px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors" aria-label="Gestión de clientes">Clientes</Link></li>
          <li><Link href="/projects" className="block px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors" aria-label="Gestión de proyectos">Proyectos</Link></li>
          <li><Link href="/deliverynote" className="block px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors" aria-label="Gestión de albaranes">Albaranes</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
