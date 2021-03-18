import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ProjectDashboard from "../../features/project/dashboard/ProjectDashboard";
import LodingComponet from "./LodingComponet";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { projectStore } = useStore();

  useEffect(() => {
    projectStore.loadProjects();
  }, [projectStore]);

  if (projectStore.lodaingInital)
    return <LodingComponet content="Loading app" />;

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <ProjectDashboard />
      </Container>
    </>
  );
}

export default observer(App);
