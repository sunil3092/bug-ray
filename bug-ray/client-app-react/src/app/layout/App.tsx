import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { Project } from "../models/project";
import ProjectDashboard from "../../features/project/dashboard/ProjectDashboard";
import { v4 as uuid } from "uuid";
import agent from "../../api/agent";
import LodingComponet from "./LodingComponet";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { projectStore } = useStore();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    projectStore.loadProjects();
  }, [projectStore]);

  function handleCreateOrEditProject(project: Project) {
    setSubmitting(true);
    if (project.id) {
      agent.Projects.update(project).then(() => {
        setProjects([...projects.filter((x) => x.id !== project.id), project]);
        setSubmitting(false);
        setSelectedProject(project);
        projectStore.editMode = false;
      });
    } else {
      project.id = uuid();
      agent.Projects.create(project).then(() => {
        setProjects([...projects, project]);
        setSubmitting(false);
        setSelectedProject(project);
        projectStore.editMode = false;
      });
    }
  }

  function handleDeleteProject(id: string) {
    setSubmitting(true);
    agent.Projects.delete(id).then(() => {
      setProjects([...projects.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (projectStore.lodaingInital)
    return <LodingComponet content="Loading app" />;

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <ProjectDashboard
          projects={projectStore.projects}
          createOrEdit={handleCreateOrEditProject}
          deleteProject={handleDeleteProject}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
