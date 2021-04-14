import { observer } from "mobx-react-lite";
import React from "react";
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../app/models/profile";

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
          <Grid.Column width={16}>
            <Statistic.Group widths={2}>
              <Statistic>
                <Statistic.Value>1</Statistic.Value>
                <Statistic.Label>Followers</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>5</Statistic.Value>
                <Statistic.Label>Following</Statistic.Label>
              </Statistic>
              {/* <Statistic>
              <Statistic.Value>42</Statistic.Value>
              <Statistic.Label>Teamsize/Contributors</Statistic.Label>
            </Statistic> */}
            </Statistic.Group>

            <Divider />
            <Reveal animated="move">
              <Reveal.Content visible style={{ width: "100%" }}>
                <Button fluid color="blue" content="Follow" />
              </Reveal.Content>
              <Reveal.Content hidden style={{ width: "100%" }}>
                <Button
                  fluid
                  basic
                  color={true ? "red" : "green"}
                  content="Unfollow"
                />
              </Reveal.Content>
            </Reveal>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
