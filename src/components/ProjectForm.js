"use client";
import { useState, useEffect } from 'react';
import { createProject, updateProject, getClients } from '../lib/api';
import { getToken } from '../lib/auth';

export default function ProjectForm({token, project, editing=false, onSuccess, onCancel}) {
  const [name, setName] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [clientId, setClientId] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [postal, setPostal] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [notes, setNotes] = useState('');
  
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch clients for dropdown
    const tk = token || getToken();
    if (tk) {
      getClients(tk).then(res => {
        if (res.ok) {
          res.json().then(data => {
            setClients(data);
          });
        }
      });
    }
  }, [token]);

  useEffect(() => {
    if (editing && project) {
      setName(project.name || '');
      setProjectCode(project.projectCode || '');
      setEmail(project.email || '');
      setCode(project.code || '');
      setClientId(project.clientId || '');
      setStreet(project.address?.street || '');
      setNumber(project.address?.number || '');
      setPostal(project.address?.postal || '');
      setCity(project.address?.city || '');
      setProvince(project.address?.province || '');
      setNotes(project.notes || '');
    }
  }, [editing, project]);

  async function handleSubmit(e) {
    e.preventDefault();
    const address = {
      street,
      number: Number(number),
      postal: Number(postal),
      city,
      province
    };
    const data = {
      name,
      projectCode,
      email,
      code,
      clientId,
      address,
      notes
    };

    let res;
    if (editing && project) {
      res = await updateProject(project._id, data, token);
    } else {
      res = await createProject(data, token);
    }

    if (res.ok) {
      alert(editing ? 'Proyecto actualizado con éxito' : 'Proyecto creado con éxito');
      onSuccess();
    } else {
      alert('Error al guardar el proyecto');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow text-black">
      <h2 className="text-xl font-bold">{editing ? 'Editar Proyecto' : 'Añadir Proyecto'}</h2>
      
      <div>
        <label className="block font-bold mb-1">Nombre del proyecto</label>
        <input className="border p-2 w-full text-black" value={name} onChange={e=>setName(e.target.value)} required />
      </div>
      <div>
        <label className="block font-bold mb-1">Código Interno (projectCode)</label>
        <input className="border p-2 w-full text-black" value={projectCode} onChange={e=>setProjectCode(e.target.value)} required />
      </div>
      <div>
        <label className="block font-bold mb-1">Email</label>
        <input className="border p-2 w-full text-black" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
      </div>
      <div>
        <label className="block font-bold mb-1">Código (code)</label>
        <input className="border p-2 w-full text-black" value={code} onChange={e=>setCode(e.target.value)} required />
      </div>
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
      <div className="border p-2 rounded">
        <h3 className="font-bold mb-2">Dirección</h3>
        <div className="mb-2">
          <label className="block font-bold mb-1">Calle</label>
          <input className="border p-2 w-full text-black" value={street} onChange={e=>setStreet(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label className="block font-bold mb-1">Número</label>
          <input className="border p-2 w-full text-black" type="number" value={number} onChange={e=>setNumber(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label className="block font-bold mb-1">Código Postal</label>
          <input className="border p-2 w-full text-black" type="number" value={postal} onChange={e=>setPostal(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label className="block font-bold mb-1">Ciudad</label>
          <input className="border p-2 w-full text-black" value={city} onChange={e=>setCity(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label className="block font-bold mb-1">Provincia</label>
          <input className="border p-2 w-full text-black" value={province} onChange={e=>setProvince(e.target.value)} required />
        </div>
      </div>
      <div>
        <label className="block font-bold mb-1">Notas</label>
        <input className="border p-2 w-full text-black" value={notes} onChange={e=>setNotes(e.target.value)} />
      </div>

      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editing ? 'Actualizar' : 'Guardar'}
        </button>
        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
