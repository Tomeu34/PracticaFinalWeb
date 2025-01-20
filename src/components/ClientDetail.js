export default function ClientDetail({client}) {
  if (!client) return <div>Selecciona un cliente</div>;
  return (
    <div className="bg-white p-4 rounded shadow text-black">
      <h2 className="font-bold text-xl mb-4">{client.name}</h2>
      <p><span className="font-bold">CIF:</span> {client.cif}</p>
      {client.address && (
        <p>
          <span className="font-bold">Domicilio Fiscal:</span> {client.address.street}, {client.address.number}, {client.address.postal} {client.address.city} ({client.address.province})
        </p>
      )}
    </div>
  );
}
