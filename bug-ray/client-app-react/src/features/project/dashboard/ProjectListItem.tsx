import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Card, Button, Image } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import { useStore } from "../../../app/stores/store";

interface props {
  project: Project;
}

const ProjectListItem = ({ project }: props) => {
  const { projectStore } = useStore();

  const { deleteProject, loading } = projectStore;

  const [target, setTarget] = useState("");

  function handleProjectDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteProject(id);
  }

  return (
    <Card key={project.id}>
      <Card.Content>
        <Image
          circular
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
            as={NavLink}
            to={`/projects/${project.id}`}
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
  );
};

export default observer(ProjectListItem);
