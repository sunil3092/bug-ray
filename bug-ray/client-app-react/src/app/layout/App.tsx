import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { Project } from "../models/project";
import ProjectDashboard from "../../features/project/dashboard/ProjectDashboard";
import { v4 as uuid } from "uuid";
import agent from "../../api/agent";
import LodingComponet from "./LodingComponet";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoding] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Projects.list().then((response) => {
      let projectsList: Project[] = [];
      response.forEach((project) => {
        project.estimate = project.estimate.split("T")[0];
        projectsList.push(project);
      });
      setProjects(projectsList);
      setLoding(false);
    });
  }, []);

  function handleSelectedProject(id: string) {
    setSelectedProject(projects.find((x) => x.id === id));
  }

  function handleCancelSelectedProject() {
    setSelectedProject(undefined);
  }

  function handleFormOpen(Id?: string) {
    Id ? handleSelectedProject(Id) : handleCancelSelectedProject();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditProject(project: Project) {
    setSubmitting(true);
    if (project.id) {
      agent.Projects.update(project).then(() => {
        setProjects([...projects.filter((x) => x.id !== project.id), project]);
        setSubmitting(false);
        setSelectedProject(project);
        setEditMode(false);
      });
    } else {
      project.id = uuid();
      agent.Projects.create(project).then(() => {
        setProjects([...projects, project]);
        setSubmitting(false);
        setSelectedProject(project);
        setEditMode(false);
      });
    }
  }

  function handleDeleteProject(id: string) {
    
    setProjects([...projects.filter((x) => x.id !== id)]);
  }

  if (loading) return <LodingComponet content="Loading app" />;

  return (
    <>
      <Navbar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ProjectDashboard
          projects={projects}
          selectedProject={selectedProject}
          selectProject={handleSelectedProject}
          cancelProject={handleCancelSelectedProject}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditProject}
          deleteProject={handleDeleteProject}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
