import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Nothing like this exists in the application
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/projects" primary>
          {" "}
          Return to Projects
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
