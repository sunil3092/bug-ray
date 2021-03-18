import React, { SyntheticEvent, useState } from "react";
import { Card, Button, Image } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import { useStore } from "../../../app/stores/store";

interface Props {
  projects: Project[];
  deleteProject: (id: string) => void;
  submitting: boolean;
}

const ProjectList = ({ projects, deleteProject, submitting }: Props) => {
  const { projectStore } = useStore();

  const [target, setTarget] = useState("");

  function handleProjectDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteProject(id);
  }

  return (
    <Card.Group>
      {projects.map((project) => (
        <Card key={project.id}>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />
            <Card.Header>{project.name}</Card.Header>
            <Card.Meta>Owner</Card.Meta>
            <Card.Description>{project.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button
                basic
                color="green"
                onClick={() => projectStore.selectProject(project.id)}
              >
                Select
              </Button>
              <Button
                name={project.id}
                basic
                color="red"
                onClick={(e) => handleProjectDelete(e, project.id)}
                loading={submitting && target === project.id}
              >
                Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default ProjectList;
