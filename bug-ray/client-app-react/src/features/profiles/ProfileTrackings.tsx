import { observer } from "mobx-react-lite";
import React from "react";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileCard from "./ProfileCard";

const ProfileTrackings = () => {
  const { profileStore } = useStore();
  const { profile, trackings, loadingTrackings, activeTab } = profileStore;

  return (
    <Tab.Pane loading={loadingTrackings}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              activeTab === 2
                ? `Users Tracking ${profile?.displayName}`
                : `Users ${profile?.displayName} is Tracking `
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={4}>
            {trackings.map((track) => (
              <ProfileCard key={track?.username} profile={track!} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileTrackings);
