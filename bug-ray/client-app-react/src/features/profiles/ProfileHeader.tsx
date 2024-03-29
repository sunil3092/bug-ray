import { observer } from "mobx-react-lite";
import React from "react";
import {
  Divider,
  Grid,
  Header,
  Item,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import TrackButton from "./TrackButton";

interface Props {
  profile: Profile;
}

const ProfileHeader = ({ profile }: Props) => {
  // console.log(profile);

  return (
    <Segment>
      <Grid>
        <Grid.Row centered>
          <Item.Group>
            <Item>
              <Item.Image
                bordered
                circular
                size="small"
                src={profile.image || "/assets/user.png"}
              />
            </Item>
          </Item.Group>
        </Grid.Row>
        <Grid.Row centered>
          <Item.Group>
            <Item>
              <Item.Content verticalAlign="middle">
                <Header as="h1" content={profile.displayName} />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Grid.Column width={5}>
            <Statistic.Group widths={2}>
              <Statistic>
                <Statistic.Value>{profile.trackingCount}</Statistic.Value>
                <Statistic.Label>Trackers</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{profile.trackedCount}</Statistic.Value>
                <Statistic.Label>Tracking</Statistic.Label>
              </Statistic>
            </Statistic.Group>
            <Divider />
            <TrackButton profile={profile} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
