import React from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ProjectDashboard from "../../features/project/dashboard/ProjectDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router";
import HomePage from "../../features/home/HomePage";
import ProjectForm from "../../features/project/form/ProjectForm";
import ProjectDetail from "../../features/project/detail/ProjectDetail";

function App() {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/projects" component={ProjectDashboard} />
          <Route path="/projects/:id" component={ProjectDetail} />
          <Route path="/createProject" component={ProjectForm} />
        </Switch>
      </Container>
    </>
  );
}

export default observer(App);
