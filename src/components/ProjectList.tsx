import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { PlusIcon } from 'lucide-react';
import { sampleProjects } from '../data/sampleData';
type ProjectListProps = {
  onSelectProject: (projectId: string) => void;
};
const ProjectList = ({
  onSelectProject
}: ProjectListProps) => {
  const [projects, setProjects] = useState(sampleProjects);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({
    id: '',
    name: '',
    location: '',
    country: '',
    type: 'industrial' as const,
    description: '',
    status: 'ongoing' as const,
    client: {
      name: '',
      logo: '',
      address: '',
      contactName: '',
      contactEmail: ''
    }
  });
  const handleCreateProject = () => {
    const projectId = Date.now().toString();
    const projectWithId = {
      ...newProject,
      id: projectId
    };
    setProjects([...projects, projectWithId]);
    setNewProject({
      id: '',
      name: '',
      location: '',
      country: '',
      type: 'industrial',
      description: '',
      status: 'ongoing',
      client: {
        name: '',
        logo: '',
        address: '',
        contactName: '',
        contactEmail: ''
      }
    });
    setShowNewProjectForm(false);
    onSelectProject(projectId);
  };
  return <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-headspace-purple">Projects</h2>
        <button className="bg-headspace-orange text-white px-4 py-2 rounded-card flex items-center" onClick={() => setShowNewProjectForm(!showNewProjectForm)}>
          <PlusIcon className="w-5 h-5 mr-2" />
          New Project
        </button>
      </div>
      {showNewProjectForm && <div className="bg-white p-6 rounded-card shadow-card mb-6">
          <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Name
              </label>
              <input type="text" className="w-full p-2 border rounded-card" value={newProject.name} onChange={e => setNewProject({
            ...newProject,
            name: e.target.value
          })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input type="text" className="w-full p-2 border rounded-card" value={newProject.location} onChange={e => setNewProject({
            ...newProject,
            location: e.target.value
          })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input type="text" className="w-full p-2 border rounded-card" value={newProject.country} onChange={e => setNewProject({
            ...newProject,
            country: e.target.value
          })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Type
              </label>
              <select className="w-full p-2 border rounded-card" value={newProject.type} onChange={e => setNewProject({
            ...newProject,
            type: e.target.value as any
          })}>
                <option value="mining">Mining</option>
                <option value="oil&gas">Oil & Gas</option>
                <option value="energy">Energy</option>
                <option value="industrial">Industrial</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea className="w-full p-2 border rounded-card" rows={3} value={newProject.description} onChange={e => setNewProject({
            ...newProject,
            description: e.target.value
          })}></textarea>
            </div>
            <div className="md:col-span-2 mt-4 mb-2">
              <h4 className="font-medium text-headspace-purple">
                Client Information
              </h4>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Client Name
              </label>
              <input type="text" className="w-full p-2 border rounded-card" value={newProject.client.name} onChange={e => setNewProject({
            ...newProject,
            client: {
              ...newProject.client,
              name: e.target.value
            }
          })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Client Logo URL
              </label>
              <input type="text" className="w-full p-2 border rounded-card" placeholder="https://example.com/logo.png" value={newProject.client.logo} onChange={e => setNewProject({
            ...newProject,
            client: {
              ...newProject.client,
              logo: e.target.value
            }
          })} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Client Address
              </label>
              <input type="text" className="w-full p-2 border rounded-card" value={newProject.client.address} onChange={e => setNewProject({
            ...newProject,
            client: {
              ...newProject.client,
              address: e.target.value
            }
          })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Name
              </label>
              <input type="text" className="w-full p-2 border rounded-card" value={newProject.client.contactName} onChange={e => setNewProject({
            ...newProject,
            client: {
              ...newProject.client,
              contactName: e.target.value
            }
          })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Email
              </label>
              <input type="email" className="w-full p-2 border rounded-card" value={newProject.client.contactEmail} onChange={e => setNewProject({
            ...newProject,
            client: {
              ...newProject.client,
              contactEmail: e.target.value
            }
          })} />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button className="px-4 py-2 border rounded-card" onClick={() => setShowNewProjectForm(false)}>
              Cancel
            </button>
            <button className="px-4 py-2 bg-headspace-orange text-white rounded-card" onClick={handleCreateProject}>
              Create Project
            </button>
          </div>
        </div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => <div key={project.id} className="cursor-pointer transform transition-transform hover:scale-[1.02]" onClick={() => onSelectProject(project.id)}>
            <ProjectCard name={project.name} location={project.location} country={project.country} type={project.type} description={project.description} status={project.status} client={project.client} />
          </div>)}
      </div>
    </div>;
};
export default ProjectList;