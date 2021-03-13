import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, List } from "semantic-ui-react";
import Navbar from "./Navbar";
import { Project } from "../models/project";
import ProjectDashboard from "../../features/project/dashboard/ProjectDashboard";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios
      .get<Project[]>("http://localhost:5000/api/project")
      .then((response) => {
        console.log(response);
        setProjects(response.data);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <ProjectDashboard projects={projects}/>
      </Container>
    </>
  );
}

export default App;
