import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import ProjectContributorsList from "./ProjectContributorsList";

interface props {
  project: Project;
}

const ProjectListItem = ({ project }: props) => {
  // const { projectStore } = useStore();

  // const { deleteProject, loading } = projectStore;

  // const [target, setTarget] = useState("");

  // function handleProjectDelete(
  //   e: SyntheticEvent<HTMLButtonElement>,
  //   id: string
  // ) {
  //   setTarget(e.currentTarget.name);
  //   deleteProject(id);
  // }

  return (
    <Segment.Group>
      <Segment>
        {project.isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Cancelled"
            style={{ textAlign: "center" }}
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{project.name}</Item.Header>
              <Item.Description>
                Owned by {project.hostUsername}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> Estimate end{" "}
        {format(project.estimate!, "do MMMM yyyy")}
      </Segment>
      <Segment secondary>
        <ProjectContributorsList contributors={project.contributors!} />
      </Segment>
      <Segment clearing>
        <span>{project.description}</span>
        <Button
          as={Link}
          to={`/projects/${project.id}`}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};

export default observer(ProjectListItem);
