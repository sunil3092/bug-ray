import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Image } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import ProjectSidebar from "./ProjectSidebar";

interface Props {
  project: Project;
}

const ProjectDetailItem = ({ project }: Props) => {
  return (
    <Card fluid>
      <Card.Content>
        <Image circular floated="right" size="mini" src="/assets/user.png" />
        <Card.Header>{project.name}</Card.Header>
        <Card.Meta>
          <span className="date">
            Active Since {format(project.estimate!, "dd MMM yyyy")}
          </span>
        </Card.Meta>
        <Card.Description>{project.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ProjectSidebar />
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            as={Link}
            to={`/manage/${project.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button as={Link} to="/projects" basic color="red" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ProjectDetailItem;
