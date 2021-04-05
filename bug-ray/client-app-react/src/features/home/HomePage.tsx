import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Segment, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

const HomePage = () => {
  const { userStore, modalStore } = useStore();

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
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="massive"
              inverted
              circular
              icon="sign in alternate"
              className="whiteGlow"
            />
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="massive"
              inverted
              circular
              icon="pencil alternate"
              className="whiteGlow"
            />
          </>
        )}
      </Container>
    </Segment>
  );
};

export default observer(HomePage);
