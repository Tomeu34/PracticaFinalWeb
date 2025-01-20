"use client";
import { useState, useEffect } from 'react';
import { createDeliveryNote, getClients, getProjects } from '../lib/api';
import { getToken } from '../lib/auth';

export default function DeliveryNoteForm({token, onSuccess, onCancel}) {
  const [clientId, setClientId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [format, setFormat] = useState('hours');
  const [material, setMaterial] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [workdate, setWorkdate] = useState('');

  const [clients, setClients] = useState([]);
  const [projects, setProjectsData] = useState([]);

  useEffect(() => {
    const tk = token || getToken();
    if (tk) {
      getClients(tk).then(res => {
        if (res.ok) {
          res.json().then(data => setClients(data));
        }
      });
      getProjects(tk).then(res => {
        if (res.ok) {
          res.json().then(data => setProjectsData(data));
        }
      });
    }
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      clientId,
      projectId,
      format,
      description,
      workdate
    };

    if (format === 'material') {
      data.material = material;
    } else if (format === 'hours') {
      data.hours = Number(hours);
    }

    const res = await createDeliveryNote(data, token);
    if (res.ok) {
      alert('Albarán creado con éxito');
      onSuccess();
    } else {
      alert('Error al guardar el albarán');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow text-black">
      <h2 className="text-xl font-bold">Añadir Albarán</h2>

      <div>
        <label className="block font-bold mb-1">Cliente (clientId)</label>
        <select 
          className="border p-2 w-full text-black"
          value={clientId} 
          onChange={e=>setClientId(e.target.value)}
          required
        >
          <option value="">Selecciona un cliente</option>
          {clients.map(c => (
            <option key={c._id} value={c._id}>{c.name} - {c.cif}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-bold mb-1">Proyecto (projectId)</label>
        <select 
          className="border p-2 w-full text-black"
          value={projectId} 
          onChange={e=>setProjectId(e.target.value)}
          required
        >
          <option value="">Selecciona un proyecto</option>
          {projects.map(p => (
            <option key={p._id} value={p._id}>{p.name} - {p.projectCode}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-bold mb-1">Formato</label>
        <select className="border p-2 w-full text-black" value={format} onChange={e=>setFormat(e.target.value)}>
          <option value="hours">hours</option>
          <option value="material">material</option>
        </select>
      </div>

      {format === 'material' && (
        <div>
          <label className="block font-bold mb-1">Material</label>
          <input className="border p-2 w-full text-black" value={material} onChange={e=>setMaterial(e.target.value)} required />
        </div>
      )}

      {format === 'hours' && (
        <div>
          <label className="block font-bold mb-1">Horas</label>
          <input className="border p-2 w-full text-black" type="number" value={hours} onChange={e=>setHours(e.target.value)} required />
        </div>
      )}

      <div>
        <label className="block font-bold mb-1">Descripción</label>
        <input className="border p-2 w-full text-black" value={description} onChange={e=>setDescription(e.target.value)} required />
      </div>

      <div>
        <label className="block font-bold mb-1">Fecha de trabajo (workdate)</label>
        <input className="border p-2 w-full text-black" value={workdate} onChange={e=>setWorkdate(e.target.value)} required />
      </div>

      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
