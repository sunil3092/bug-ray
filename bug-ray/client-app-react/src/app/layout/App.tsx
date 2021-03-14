import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { Project } from "../models/project";
import ProjectDashboard from "../../features/project/dashboard/ProjectDashboard";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Project[]>("http://localhost:5000/api/project")
      .then((response) => {
        console.log(response);
        setProjects(response.data);
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
        />
      </Container>
    </>
  );
}

export default App;
