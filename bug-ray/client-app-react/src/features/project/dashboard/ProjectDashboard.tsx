import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import { useStore } from "../../../app/stores/store";
import ProjectDetail from "../detail/ProjectDetail";
import ProjectForm from "../form/ProjectForm";
import ProjectList from "./ProjectList";

interface Props {
  projects: Project[];
  createOrEdit: (project: Project) => void;
  deleteProject: (id: string) => void;
  submitting: boolean;
}

const ProjectDashboard = ({
  projects,
  deleteProject,
  submitting,
  createOrEdit,
}: Props) => {
  const { projectStore } = useStore();
  const { selectedProject, editMode } = projectStore;
  return (
    <Grid>
      <Grid.Column width="10">
        <ProjectList
          projects={projects}
          deleteProject={deleteProject}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedProject && !editMode && <ProjectDetail />}
        {editMode && (
          <ProjectForm createOrEdit={createOrEdit} submitting={submitting} />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProjectDashboard);
