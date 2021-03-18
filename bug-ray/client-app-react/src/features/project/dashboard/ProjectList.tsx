import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Card, Button, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

const ProjectList = () => {
  const { projectStore } = useStore();

  const { projects, deleteProject, loading } = projectStore;

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
                loading={loading && target === project.id}
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

export default observer(ProjectList);
