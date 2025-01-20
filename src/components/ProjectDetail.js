export default function ProjectDetail({project, onEdit, onClose}) {
  if (!project) return <div>Selecciona un proyecto</div>;

  return (
    <div className="bg-white p-4 rounded shadow text-black">
      <h2 className="font-bold text-xl mb-4">{project.name}</h2>
      <p><span className="font-bold">Cliente (clientId):</span> {project.clientId}</p>
      <p><span className="font-bold">Código Interno (projectCode):</span> {project.projectCode}</p>
      <p><span className="font-bold">Código (code):</span> {project.code}</p>
      {project.address && (
        <p>
          <span className="font-bold">Dirección:</span> {project.address.street}, {project.address.number}, {project.address.postal} {project.address.city} ({project.address.province})
        </p>
      )}
      <p><span className="font-bold">Notas:</span> {project.notes}</p>
      <p><span className="font-bold">Inicio:</span> {project.begin}</p>
      <p><span className="font-bold">Fin:</span> {project.end}</p>
      {project.servicePrices && project.servicePrices.length > 0 ? (
        <div>
          <h3 className="font-bold mt-2">Precios de servicio:</h3>
          <ul className="list-disc list-inside">
            {project.servicePrices.map((price, index) => (
              <li key={index}>{JSON.stringify(price)}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p><span className="font-bold">Precios de servicio:</span> Ninguno</p>
      )}

      <div className="flex space-x-2 mt-4">
        <button onClick={onEdit} className="bg-blue-600 text-white px-4 py-2 rounded">Editar Proyecto</button>
        <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cerrar</button>
      </div>
    </div>
  );
}
