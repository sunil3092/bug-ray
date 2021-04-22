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
  Divider,
  Icon,
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
                content={"Continue as " + userStore.user?.displayName}
              />
            </Grid.Row>
            <Grid.Row>
              <Header as="h3" inverted content={"OR"} />
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
            <Icon circular name="bug" size="huge" bordered />
            <Header as="h1" content="Welcome to Bug-Ray" inverted />
            <Divider />
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="massive"
              inverted
              circular
              icon="sign in alternate"
              className="whiteGlow"
              content="Login"
            />
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="massive"
              inverted
              circular
              icon="pencil alternate"
              className="whiteGlow"
              content="Register"
            />
          </>
        )}
      </Container>
    </Segment>
  );
};

export default observer(HomePage);
