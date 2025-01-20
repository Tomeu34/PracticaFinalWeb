"use client";
export default function ClientList({clients, onSelectClient}) {
  return (
    <div className="w-64 bg-white border-l p-4 overflow-auto text-black">
      <h3 className="font-bold mb-2">Lista de Clientes</h3>
      <ul className="space-y-1">
        {clients.map((c) => (
          <li key={c._id}>
            <button 
              onClick={() => onSelectClient(c._id)}
              className="text-left w-full hover:bg-gray-200 p-2 rounded text-black"
            >
              <span className="block font-bold">{c.name}</span>
              <span className="block text-sm">CIF: {c.cif}</span>
              {c.address && (
                <span className="block text-sm">
                  Domicilio: {c.address.street}, {c.address.number}, {c.address.city}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
