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
        <Image
          circular
          floated="right"
          size="mini"
          src={project.owner?.image || "/assets/user.png"}
        />
        <Card.Header>{project.name}</Card.Header>
        <Card.Meta>
          <span className="date">
            Active Since {format(project.estimate!, "dd MMM yyyy")}
          </span>
        </Card.Meta>
        <Card.Description>{project.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ProjectSidebar contributors={project.contributors!} />
      </Card.Content>
      <Card.Content extra>
        {project.isOwner ? (
          <Button
            as={Link}
            to={`/manage/${project.id}`}
            floated="right"
            color="blue"
            content="Edit"
          />
        ) : project.isContributing ? (
          <Button
            as={Link}
            to="/projects"
            floated="right"
            color="red"
            content="Cancel"
          />
        ) : (
          <Button
            as={Link}
            to="/projects"
            floated="left"
            color="orange"
            content="Contribute"
          />
        )}
      </Card.Content>
    </Card>
  );
};

export default ProjectDetailItem;
