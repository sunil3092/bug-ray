import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LodingComponet from "../../../app/layout/LodingComponet";
import { useStore } from "../../../app/stores/store";
import ProjectFilters from "./ProjectFilters";
import ProjectList from "./ProjectList";

const ProjectDashboard = () => {
  const { projectStore } = useStore();
  const { loadProjects, projectRegistry } = projectStore;

  useEffect(() => {
    if (projectRegistry.size <= 1) {
      loadProjects();
    }
  }, [loadProjects, projectRegistry]);

  if (projectStore.lodaingInital)
    return <LodingComponet content="Loading app" />;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width="16">
          <ProjectFilters />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="16">
          <ProjectList />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(ProjectDashboard);
