import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Segment, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

const HomePage = () => {
  const { userStore } = useStore();

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        {userStore.isLoggedIn ? (
          <Button
            as={Link}
            to="/projects"
            size="massive"
            inverted
            circular
            icon="bug"
            className="whiteGlow"
          />
        ) : (
          <Button
            as={Link}
            to="/login"
            size="massive"
            inverted
            circular
            icon="user"
            className="whiteGlow"
          />
        )}
      </Container>
    </Segment>
  );
};

export default observer(HomePage);
