import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import ProjectList from "./ProjectList";

interface Props {
  projects: Project[];
}

const ProjectDashboard = ({ projects }: Props) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ProjectList projects={projects} />
      </Grid.Column>
    </Grid>
  );
};

export default ProjectDashboard;
