import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Card } from "semantic-ui-react";
import LodingComponet from "../../../app/layout/LodingComponet";
import { useStore } from "../../../app/stores/store";

const ProjectDetail = () => {
  const { projectStore } = useStore();
  const {
    selectedProject: project,
    openForm,
    cancelSelectedProject,
  } = projectStore;

  if (!project) return <LodingComponet />;

  return (
    <Card fluid>
      {/* <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" /> */}
      <Card.Content>
        <Card.Header>{project.name}</Card.Header>
        <Card.Meta>
          <span className="date">
            Estimate of the Project {project.estimate}
          </span>
        </Card.Meta>
        <Card.Description>{project.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => openForm(project.id)}
          />
          <Button
            basic
            color="red"
            content="Cancel"
            onClick={cancelSelectedProject}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ProjectDetail);
