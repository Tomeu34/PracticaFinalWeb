"use client";
import { useEffect, useState } from 'react';
import { getToken } from '../../lib/auth';
import { getDeliveryNotes, getDeliveryNoteById } from '../../lib/api';
import DeliveryNoteList from '../../components/DeliveryNoteList';
import DeliveryNoteForm from '../../components/DeliveryNoteForm';
import DeliveryNoteDetail from '../../components/DeliveryNoteDetail';

export default function DeliveryNotePage() {
  const [token, setToken] = useState(null);
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const [companyFilter, setCompanyFilter] = useState(false);
  const [signedFilter, setSignedFilter] = useState(false);

  useEffect(() => {
    const tk = getToken();
    setToken(tk);
  }, []);

  useEffect(() => {
    if (token) {
      fetchDeliveryNotes();
    }
  }, [token, companyFilter, signedFilter]);

  async function fetchDeliveryNotes() {
    const res = await getDeliveryNotes(token, companyFilter, signedFilter);
    if (res.ok) {
      const data = await res.json();
      setDeliveryNotes(data);
    } else {
      alert('Error fetching delivery notes');
    }
  }

  async function handleRowDoubleClick(note) {
    const res = await getDeliveryNoteById(note._id, token, companyFilter);
    if (res.ok) {
      const data = await res.json();
      // Merge the _id from the original note into the detailed data
      const detailedNote = { ...data, _id: note._id };
      setSelectedNote(detailedNote);
      setShowDetail(true);
    } else {
      alert('Error fetching delivery note details');
    }
  }

  function handleAddNoteSuccess() {
    setShowForm(false);
    fetchDeliveryNotes();
  }

  return (
    <div className="text-black">
      {showForm ? (
        <DeliveryNoteForm
          token={token}
          onSuccess={handleAddNoteSuccess}
          onCancel={() => setShowForm(false)}
        />
      ) : showDetail ? (
        <DeliveryNoteDetail
          note={selectedNote}
          onClose={() => setShowDetail(false)}
        />
      ) : (
        <div className="flex flex-col h-full">
          <div className="mb-4 flex space-x-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={companyFilter} onChange={()=>setCompanyFilter(!companyFilter)} />
              <span>No company data</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={signedFilter} onChange={()=>setSignedFilter(!signedFilter)} />
              <span>Only signed notes</span>
            </label>
          </div>

          {deliveryNotes.length === 0 ? (
            <div>
              <p>No hay albaranes. Añade tu primer albarán.</p>
              <button
                onClick={()=>setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
              >
                Añadir Albarán
              </button>
            </div>
          ) : (
            <>
              <DeliveryNoteList 
                notes={deliveryNotes} 
                onDoubleClick={handleRowDoubleClick}
              />
              <div className="mt-auto">
                <button 
                  onClick={()=>setShowForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                >
                  Añadir Albarán
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
