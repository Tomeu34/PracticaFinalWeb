"use client";

export default function ProjectList({projects, onDoubleClick}) {
  return (
    <div className="bg-white p-4 rounded shadow overflow-auto">
      <h3 className="font-bold mb-4">Lista de Proyectos</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="px-2 py-1">Código</th>
            <th className="px-2 py-1">Nombre</th>
            <th className="px-2 py-1">Cliente (clientId)</th>
            <th className="px-2 py-1">Código Interno</th>
            <th className="px-2 py-1">Notas</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr 
              key={p._id} 
              className="cursor-pointer hover:bg-gray-200"
              onDoubleClick={() => onDoubleClick(p)}
            >
              <td className="border-b px-2 py-1">{p.code}</td>
              <td className="border-b px-2 py-1">{p.name}</td>
              <td className="border-b px-2 py-1">{p.clientId}</td>
              <td className="border-b px-2 py-1">{p.projectCode}</td>
              <td className="border-b px-2 py-1">{p.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
