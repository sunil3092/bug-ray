import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import React, { SyntheticEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { TabProps, Tab, Grid, Header, Card } from "semantic-ui-react";
import { UserProjects } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

const ProfileProjects = () => {
  const panes = [
    { menuItem: "All", pane: { key: "all" } },
    { menuItem: "Contributions", pane: { key: "Contribution" } },
    { menuItem: "Owned", pane: { key: "Owned" } },
  ];

  const { profileStore } = useStore();
  const {
    loadUserProjects,
    profile,
    loadingProjects,
    userProjects,
  } = profileStore;
  useEffect(() => {
    loadUserProjects(profile!.username);
  }, [loadUserProjects, profile]);
  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserProjects(
      profile!.username,
      panes[data.activeIndex as number].pane.key
    );
  };
  return (
    <Tab.Pane loading={loadingProjects}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Projects"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userProjects.map((project: UserProjects) => (
              <Card as={Link} to={`/projects/${project.id}`} key={project.id}>
                <Card.Content>
                  <Card.Header textAlign="center">{project.name}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(project.estimate), "do LLL")}</div>
                    <div>{format(new Date(project.estimate), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileProjects);
