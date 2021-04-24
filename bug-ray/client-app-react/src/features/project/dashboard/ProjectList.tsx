import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Item } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ProjectListItem from "./ProjectListItem";

const ProjectList = () => {
  const { projectStore } = useStore();

  const { groupByEstimate } = projectStore;

  return (
    <>
      {groupByEstimate.map(([group, projects]) => (
        <Fragment key={group}>
          {/* <Label size="large" color="blue">
            {format(new Date(group), "eeee do MMMM")}
          </Label> */}
          <Item.Group divided>
            {projects.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </>
  );
};

export default observer(ProjectList);
