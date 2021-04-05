import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ProjectDashboard from "../../features/project/dashboard/ProjectDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";
import ProjectForm from "../../features/project/form/ProjectForm";
import ProjectDetail from "../../features/project/detail/ProjectDetail";
import TestError from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import LodingComponet from "./LodingComponet";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  //To Reset the form key is passed, when the key chnages the form resets in that way we maintain edit and create form.
  // location object has a unique key value to help us out.
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LodingComponet content="Loading App" />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
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
                <Route path="/errors" component={TestError} />
                <Route path="/server-error" component={ServerError} />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
