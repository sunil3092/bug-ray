import React from "react";
import { Link } from "react-router-dom";
import { Container, Segment, Button } from "semantic-ui-react";

const HomePage = () => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <>
          <Button
            as={Link}
            to="/projects"
            size="massive"
            inverted
            circular
            icon="bug"
            className="whiteGlow"
          />
        </>
      </Container>
    </Segment>
  );
};

export default HomePage;
