import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import LodingComponet from "../../../app/layout/LodingComponet";
import { useStore } from "../../../app/stores/store";
import EffortList from "../effort/EffortList";
import ProjectComments from "./ProjectComments";
import ProjectSidebar from "./ProjectSidebar";
import { format } from "date-fns";

const ProjectDetail = () => {
  const { projectStore } = useStore();
  const { selectedProject: project, loadProject, lodaingInital } = projectStore;

  //Extracting value form URL (UsePrams is hook form React-Rocuter-Dom)
  const { id } = useParams<{ id: string }>();

  //Use Extracted Id from URL to load the data on load of page
  useEffect(() => {
    if (id) loadProject(id);
  }, [loadProject, id]);

  if (lodaingInital || !project) return <LodingComponet />;

  return (
    <Grid>
      <Grid.Column width="10">
        <EffortList />
        <ProjectComments />
      </Grid.Column>
      <Grid.Column width="6">
        <Card fluid>
          <Card.Content>
            <Image
              circular
              floated="right"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
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
            <Button.Group widths="2">
              <Button
                as={Link}
                to={`/manage/${project.id}`}
                basic
                color="blue"
                content="Edit"
              />
              <Button
                as={Link}
                to="/projects"
                basic
                color="red"
                content="Cancel"
              />
            </Button.Group>
          </Card.Content>
        </Card>
        <ProjectSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProjectDetail);
