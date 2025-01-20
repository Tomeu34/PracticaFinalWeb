"use client";
import { useState, useEffect } from 'react';
import { getToken } from '../../lib/auth';
import { getProjects, getProjectById } from '../../lib/api';
import ProjectList from '../../components/ProjectList';
import ProjectForm from '../../components/ProjectForm';
import ProjectDetail from '../../components/ProjectDetail';

export default function ProjectsPage() {
  const [token, setToken] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const tk = getToken();
    setToken(tk);
  }, []);

  useEffect(() => {
    if (token) {
      fetchProjectList();
    }
  }, [token]);

  async function fetchProjectList() {
    const res = await getProjects(token);
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    } else {
      alert('Error fetching projects');
    }
  }

  async function handleRowDoubleClick(project) {
    const res = await getProjectById(project._id, '', token);
    if (res.ok) {
      const data = await res.json();
      setSelectedProject(data);
      setShowDetail(true);
      setIsEditing(false);
    } else {
      alert('Error fetching project details');
    }
  }

  function handleAddProjectSuccess() {
    setShowForm(false);
    fetchProjectList();
  }

  function handleEditSuccess() {
    if (selectedProject) {
      getProjectById(selectedProject._id, '', token).then(res => {
        if (res.ok) {
          res.json().then(data => {
            setSelectedProject(data);
          });
        }
      });
    }
    setIsEditing(false);
    fetchProjectList();
  }

  if (!token) {
    return <p>Debes iniciar sesión para ver esta página.</p>;
  }

  return (
    <div className="text-black">
      {showForm ? (
        <ProjectForm
          token={token}
          onSuccess={handleAddProjectSuccess}
          onCancel={() => setShowForm(false)}
        />
      ) : showDetail ? (
        <div>
          {isEditing ? (
            <ProjectForm
              token={token}
              project={selectedProject}
              editing={true}
              onSuccess={handleEditSuccess}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <ProjectDetail
              project={selectedProject}
              onEdit={() => setIsEditing(true)}
              onClose={() => setShowDetail(false)}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {projects.length === 0 ? (
            <div>
              <p>No hay proyectos. Añade tu primer proyecto.</p>
              <button 
                onClick={()=>setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
              >
                Añadir Proyecto
              </button>
            </div>
          ) : (
            <>
              <ProjectList 
                projects={projects}
                onDoubleClick={handleRowDoubleClick}
              />
              <div className="mt-auto">
                <button 
                  onClick={()=>setShowForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                >
                  Añadir Proyecto
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
