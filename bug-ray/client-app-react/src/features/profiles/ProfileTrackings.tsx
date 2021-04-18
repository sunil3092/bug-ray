import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileCard from "./ProfileCard";

const ProfileTrackings = () => {
  const { profileStore } = useStore();
  const { profile, trackings, loadTrackings, loadingTrackings } = profileStore;

  useEffect(() => {
    loadTrackings("trackers");
  }, [loadTrackings]);

  return (
    <Tab.Pane loading={loadingTrackings}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`Users Tracking ${profile?.displayName}`}
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
