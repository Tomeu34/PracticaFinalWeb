"use client";

export default function DeliveryNoteList({notes, onDoubleClick}) {
  return (
    <div className="bg-white p-4 rounded shadow overflow-auto">
      <h3 className="font-bold mb-4">Lista de Albaranes</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="px-2 py-1">Proyecto</th>
            <th className="px-2 py-1">Cliente</th>
            <th className="px-2 py-1">Formato</th>
            <th className="px-2 py-1">Descripción</th>
            <th className="px-2 py-1">Pendiente</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((n) => (
            <tr
              key={n._id}
              className="cursor-pointer hover:bg-gray-200"
              onDoubleClick={() => onDoubleClick(n)}
            >
              <td className="border-b px-2 py-1">
                {typeof n.projectId === 'object' ? n.projectId.name : n.projectId}
              </td>
              <td className="border-b px-2 py-1">
                {typeof n.clientId === 'object' ? n.clientId.name : n.clientId}
              </td>
              <td className="border-b px-2 py-1">{n.format}</td>
              <td className="border-b px-2 py-1">{n.description}</td>
              <td className="border-b px-2 py-1">{n.pending ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
