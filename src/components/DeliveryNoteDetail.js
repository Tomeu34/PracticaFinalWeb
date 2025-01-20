"use client";
import { getToken } from '../lib/auth';
import { downloadDeliveryNotePDFAuth } from '../lib/api';

export default function DeliveryNoteDetail({note, onClose}) {
  if (!note) return <div>Selecciona un albarán</div>;

  async function handleDownloadPDF() {
    const token = getToken();
    if (!token) {
      alert('No token found. Please log in again.');
      return;
    }

    await downloadDeliveryNotePDFAuth(note._id, token);
  }

  return (
    <div className="bg-white p-4 rounded shadow text-black">
      <h2 className="font-bold text-xl mb-4">Detalle de Albarán</h2>
      {note.company && (
        <div className="mb-4">
          <h3 className="font-bold">Compañía</h3>
          <p>{note.company.name} - CIF: {note.company.cif}</p>
          <p>{note.company.street}, {note.company.number}, {note.company.postal} {note.company.city} ({note.company.province})</p>
        </div>
      )}

      <p><span className="font-bold">Nombre:</span> {note.name}</p>
      <p><span className="font-bold">Fecha:</span> {note.date}</p>

      {note.client && (
        <div className="mb-4">
          <h3 className="font-bold mt-2">Cliente</h3>
          <p>Nombre: {note.client.name}</p>
          <p>CIF: {note.client.cif}</p>
          {note.client.address && (
            <p>Dirección: {note.client.address.street}, {note.client.address.number}, {note.client.address.postal} {note.client.address.city} ({note.client.address.province})</p>
          )}
        </div>
      )}

      <p><span className="font-bold">Proyecto:</span> {note.project}</p>
      <p><span className="font-bold">Descripción:</span> {note.description}</p>
      <p><span className="font-bold">Formato:</span> {note.format}</p>
      {note.format === 'hours' && (
        <p><span className="font-bold">Horas:</span> {note.hours}</p>
      )}
      {note.format === 'material' && note.material && (
        <p><span className="font-bold">Material:</span> {note.material}</p>
      )}

      {Array.isArray(note.workers) && note.workers.length > 0 && (
        <div className="mb-4">
          <h3 className="font-bold mt-2">Trabajadores</h3>
          <ul className="list-disc list-inside">
            {note.workers.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {note.photo && (
        <p><span className="font-bold">Foto:</span> {note.photo}</p>
      )}

      <div className="flex space-x-2 mt-4">
        <button onClick={handleDownloadPDF} className="bg-green-600 text-white px-4 py-2 rounded">Descargar PDF</button>
        <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cerrar</button>
      </div>
    </div>
  );
}
