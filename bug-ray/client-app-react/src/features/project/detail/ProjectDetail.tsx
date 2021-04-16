import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LodingComponet from "../../../app/layout/LodingComponet";
import { useStore } from "../../../app/stores/store";
import EffortList from "../effort/EffortList";
import ProjectComments from "./ProjectComments";
import ProjectDetailItem from "./ProjectDetailItem";

const ProjectDetail = () => {
  const { projectStore } = useStore();
  const { selectedProject: project, loadProject, lodaingInital } = projectStore;

  //Extracting value form URL (UsePrams is hook form React-Rocuter-Dom)
  const { id } = useParams<{ id: string }>();

  //Use Extracted Id from URL to load the data on load of page
  useEffect(() => {
    if (id) loadProject(id);
  }, [loadProject, id]);

  if (lodaingInital || !project) return <LodingComponet />;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width="16">
          <ProjectDetailItem project={project} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width="16">
          <EffortList />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width="10">
          <ProjectComments projectId={project.id} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(ProjectDetail);
