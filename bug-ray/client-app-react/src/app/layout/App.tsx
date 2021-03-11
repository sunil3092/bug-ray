import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, List } from "semantic-ui-react";
import { Effort } from "../models/effort";
import Navbar from "./Navbar";
import { Project } from "../models/project";

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
        <List>
          {projects.map((project) => (
            <List.Item key={project.id}>{project.name}</List.Item>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
