import React from "react";
import { Grid } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import ProjectDetail from "../detail/ProjectDetail";
import ProjectForm from "../form/ProjectForm";
import ProjectList from "./ProjectList";

interface Props {
  projects: Project[];
  selectedProject: Project | undefined;
  selectProject: (Id: string) => void;
  cancelProject: () => void;
  editMode: boolean;
  openForm: (Id: string) => void;
  closeForm: () => void;
  createOrEdit: (project: Project) => void;
  deleteProject: (id: string) => void;
  submitting: boolean;
}

const ProjectDashboard = ({
  projects,
  selectProject,
  selectedProject,
  cancelProject,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteProject,
  submitting
}: Props) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ProjectList
          projects={projects}
          selectProject={selectProject}
          deleteProject={deleteProject}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedProject && !editMode && (
          <ProjectDetail
            project={selectedProject}
            cancelProject={cancelProject}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ProjectForm
            closeForm={closeForm}
            createOrEdit={createOrEdit}
            selectedProject={selectedProject}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ProjectDashboard;
