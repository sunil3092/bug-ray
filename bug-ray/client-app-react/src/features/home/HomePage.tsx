import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Segment,
  Button,
  Image,
  Header,
  Grid,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

const HomePage = () => {
  const { userStore, modalStore } = useStore();

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        {userStore.isLoggedIn ? (
          <Grid centered>
            <Grid.Row>
              <Image
                circular
                as={Link}
                to="/projects"
                size="small"
                src={userStore.user?.image || "/assets/user.png"}
                className="whiteBoxGlow"
                bordered
              />
            </Grid.Row>
            <Grid.Row>
              <Header
                as="h1"
                inverted
                content={"Welcome " + userStore.user?.displayName}
              />
            </Grid.Row>
            <Grid.Row>
              <Button
                color="grey"
                basic
                inverted
                content="Logout"
                onClick={userStore.logout}
              />
            </Grid.Row>
          </Grid>
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
