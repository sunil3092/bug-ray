import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";

const ProjectSidebar = () => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        secondary
        inverted
        style={{ border: "none", backgroundColor: "#0d324d" }}
      >
        Members
      </Segment>
      <Segment attached>
        <List relaxed divided>
          <Item style={{ position: "relative" }}>
            <Label
              style={{ position: "absolute" }}
              color="orange"
              ribbon="right"
            >
              Owner
            </Label>
            <Image
              size="tiny"
              src={
                "https://react.semantic-ui.com/images/avatar/large/steve.jpg"
              }
            />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Bob</Link>
              </Item.Header>
              <Item.Extra style={{ color: "orange" }}>Contributing</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: "relative" }}>
            <Image
              size="tiny"
              src={
                "https://react.semantic-ui.com/images/avatar/small/christian.jpg"
              }
            />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Tom</Link>
              </Item.Header>
              <Item.Extra style={{ color: "orange" }}>Contributing</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: "relative" }}>
            <Image
              size="tiny"
              src={"https://react.semantic-ui.com/images/avatar/small/joe.jpg"}
            />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Sully</Link>
              </Item.Header>
            </Item.Content>
          </Item>
        </List>
      </Segment>
    </Fragment>
  );
};

export default ProjectSidebar;
