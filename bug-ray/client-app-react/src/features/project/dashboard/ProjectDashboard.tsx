import React from "react";
import { Grid } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import ProjectDetail from "../detail/ProjectDetail";
import ProjectForm from "../form/ProjectForm";
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
      <Grid.Column width="6">
        {projects[0] && <ProjectDetail project={projects[0]} />}
        <ProjectForm />
      </Grid.Column>
    </Grid>
  );
};

export default ProjectDashboard;
