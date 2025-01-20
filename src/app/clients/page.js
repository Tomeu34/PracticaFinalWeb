"use client";
import { useEffect, useState } from 'react';
import { getClients } from '../../lib/api';
import { getToken } from '../../lib/auth';
import ClientForm from '../../components/ClientForm';
import ClientDetail from '../../components/ClientDetail';
import ClientList from '../../components/ClientList';

export default function ClientsPage() {
  const [token, setToken] = useState(null);
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const tk = getToken();
    setToken(tk);
  }, []);

  useEffect(() => {
    if (token) {
      fetchClientList();
    }
  }, [token]);

  async function fetchClientList() {
    const res = await getClients(token);
    if (res.ok) {
      const data = await res.json();
      setClients(data);
      if (data.length > 0) setSelectedClientId(data[0]._id);
    }
  }

  if (!token) {
    return <p>Debes iniciar sesión para ver esta página.</p>;
  }

  const selectedClient = clients.find(c => c._id === selectedClientId);

  return (
    <>
      {showForm ? (
        <ClientForm onSuccess={()=>{
          setShowForm(false);
          fetchClientList();
        }}/>
      ) : (
        <div className="flex h-full text-black">
          <div className="flex-1">
            {clients.length === 0 ? (
              <div>
                <p>No hay clientes. Añade tu primer cliente.</p>
                <button 
                  onClick={()=>setShowForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
                >
                  Añadir Cliente
                </button>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <ClientDetail client={selectedClient}/>
                <div className="mt-auto">
                  <button 
                    onClick={()=>setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                  >
                    Añadir Cliente
                  </button>
                </div>
              </div>
            )}
          </div>
          {clients.length > 0 && (
            <ClientList 
              clients={clients} 
              onSelectClient={(id)=>setSelectedClientId(id)}
            />
          )}
        </div>
      )}
    </>
  );
}
