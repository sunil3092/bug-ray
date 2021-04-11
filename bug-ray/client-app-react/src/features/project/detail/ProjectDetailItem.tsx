import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Image } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import { useStore } from "../../../app/stores/store";
import ProjectSidebar from "./ProjectSidebar";

interface Props {
  project: Project;
}

const ProjectDetailItem = ({ project }: Props) => {
  const {
    projectStore: { updateContribution, loading, cancelProjectToggle },
  } = useStore();

  return (
    <Card fluid className={project.isCancelled ? "redGlow" : ""}>
      <Card.Content>
        <Image
          circular
          floated="right"
          size="mini"
          src={project.owner?.image || "/assets/user.png"}
        />
        {/* {project.isCancelled && (
          <Label
            attached="top"
            style={{ position: "absolute", zIndex: 1000, left: -14 }}
            ribbon
            color="red"
            content="Cancelled"
          />
        )} */}
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
          <>
            <Button
              color={project.isCancelled ? "green" : "red"}
              basic
              floated="left"
              content={
                project.isCancelled ? "Re-Activate Project" : "Cancel Project"
              }
              onClick={cancelProjectToggle}
              loading={loading}
            />
            <Button
              as={Link}
              to={`/manage/${project.id}`}
              floated="right"
              color="blue"
              content="Edit"
              disabled={project.isCancelled}
            />
          </>
        ) : project.isContributing ? (
          <Button
            floated="right"
            color="red"
            onClick={updateContribution}
            loading={loading}
            content="Cancel"
          />
        ) : (
          <Button
            floated="left"
            color="orange"
            onClick={updateContribution}
            loading={loading}
            content="Contribute"
            disabled={project.isCancelled}
          />
        )}
      </Card.Content>
    </Card>
  );
};

export default observer(ProjectDetailItem);
