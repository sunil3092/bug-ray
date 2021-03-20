import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LodingComponet from "../../../app/layout/LodingComponet";
import { useStore } from "../../../app/stores/store";
import ProjectDetail from "../detail/ProjectDetail";
import ProjectForm from "../form/ProjectForm";
import ProjectList from "./ProjectList";

const ProjectDashboard = () => {
  const { projectStore } = useStore();
  const { selectedProject, editMode } = projectStore;

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
        {selectedProject && !editMode && <ProjectDetail />}
        {editMode && <ProjectForm />}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProjectDashboard);
