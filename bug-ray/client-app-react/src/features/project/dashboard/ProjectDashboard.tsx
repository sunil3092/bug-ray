import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LodingComponet from "../../../app/layout/LodingComponet";
import { useStore } from "../../../app/stores/store";
import ProjectList from "./ProjectList";

const ProjectDashboard = () => {
  const { projectStore } = useStore();

  useEffect(() => {
    projectStore.loadProjects();
  }, [projectStore]);

  if (projectStore.lodaingInital)
    return <LodingComponet content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ProjectList />
      </Grid.Column>
      <Grid.Column width="6">
        <h1>Filters</h1>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProjectDashboard);
