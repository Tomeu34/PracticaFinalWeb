const API_BASE = 'https://bildy-rpmaya.koyeb.app';

export async function registerUser({nombre, apellidos, email, password}) {
  return fetch(`${API_BASE}/api/user/register`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({nombre, apellidos, email, password})
  });
}

export async function validateUser(code, token) {
  return fetch(`${API_BASE}/api/user/validation`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({code})
  });
}

export async function loginUser(email, password) {
  return fetch(`${API_BASE}/api/user/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, password})
  });
}

export async function getClients(token) {
  return fetch(`${API_BASE}/api/client`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export async function createClient({name, cif, address}, token) {
  return fetch(`${API_BASE}/api/client`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({name, cif, address})
  });
}

// Projects
export async function getProjects(token) {
  return fetch(`${API_BASE}/api/project`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export async function createProject(data, token) {
  return fetch(`${API_BASE}/api/project`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

export async function getProjectById(id, prices, token) {
  const url = `${API_BASE}/api/project/one/${id}?prices=${prices}`;
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export async function updateProject(id, data, token) {
  return fetch(`${API_BASE}/api/project/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

export async function getDeliveryNotes(token, company = false, signed = false) {
  const url = new URL(`${API_BASE}/api/deliverynote`);
  if (company) url.searchParams.set('company', company.toString());
  if (signed) url.searchParams.set('signed', signed.toString());

  return fetch(url.toString(), {
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

export async function createDeliveryNote(data, token) {
  return fetch(`${API_BASE}/api/deliverynote`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

export async function getDeliveryNoteById(id, token, company = false) {
  const url = new URL(`${API_BASE}/api/deliverynote/${id}`);
  if (company) {
    url.searchParams.set('company', 'true');
  }

  return fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export async function downloadDeliveryNotePDFAuth(id, token) {
  const url = `${API_BASE}/api/deliverynote/pdf/${id}`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    alert('Error downloading PDF');
    return;
  }

  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = `deliverynote-${id}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(blobUrl);
}

