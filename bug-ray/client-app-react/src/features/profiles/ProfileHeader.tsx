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

const ProfileHeader = () => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image avatar size="small" src={"/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Header as="h1" content="DisplayName" />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
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
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
