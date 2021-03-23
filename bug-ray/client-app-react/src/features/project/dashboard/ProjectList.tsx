import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Card, Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ProjectListItem from "./ProjectListItem";

const ProjectList = () => {
  const { projectStore } = useStore();

  const { groupByEstimate } = projectStore;

  return (
    <>
      {groupByEstimate.map(([group, projects]) => (
        <Fragment key={group}>
          <Header sub color="purple">
            {group}
          </Header>
          <Card.Group>
            {projects.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </Card.Group>
        </Fragment>
      ))}
    </>
  );
};

export default observer(ProjectList);
