"use client";
import { useState } from 'react';
import { createClient } from '../lib/api';
import { getToken } from '../lib/auth';

export default function ClientForm({onSuccess}) {
  const [name, setName] = useState('');
  const [cif, setCif] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [postal, setPostal] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const token = getToken();
    const address = {
      street,
      number: Number(number),
      postal: Number(postal),
      city,
      province
    };
    const res = await createClient({name, cif, address}, token);
    if (res.ok) {
      alert('Cliente guardado con éxito');
      onSuccess();
    } else {
      alert('Error al guardar el cliente');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow text-black">
      <h2 className="text-xl font-bold">Añadir Cliente</h2>
      <div>
        <label className="block font-bold mb-1">Nombre</label>
        <input className="border p-2 w-full text-black" value={name} onChange={e=>setName(e.target.value)} required />
      </div>
      <div>
        <label className="block font-bold mb-1">CIF</label>
        <input className="border p-2 w-full text-black" value={cif} onChange={e=>setCif(e.target.value)} required />
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
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
    </form>
  );
}
