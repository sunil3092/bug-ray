import React from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ProjectDashboard from "../../features/project/dashboard/ProjectDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";
import ProjectForm from "../../features/project/form/ProjectForm";
import ProjectDetail from "../../features/project/detail/ProjectDetail";

function App() {
  //To Reset the form key is passed, when the key chnages the form resets in that way we maintain edit and create form.
  // location object has a unique key value to help us out.
  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/projects" component={ProjectDashboard} />
                <Route path="/projects/:id" component={ProjectDetail} />
                <Route
                  key={location.key}
                  path={["/createProject", "/manage/:id"]}
                  component={ProjectForm}
                />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
