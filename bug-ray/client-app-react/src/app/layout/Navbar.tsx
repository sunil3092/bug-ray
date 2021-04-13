import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  Menu,
  Image,
  Dropdown,
  Container,
  Icon,
} from "semantic-ui-react";
import { useStore } from "../stores/store";

const Navbar = () => {
  const {
    userStore: { user, logout },
  } = useStore();

  return (
    <Menu inverted fixed="top" size="huge">
      <Container>
        <Menu.Item
          name="Bug-Ray"
          as={NavLink}
          to="/"
          className="whiteGlow"
          exact
        >
          <Icon name="bug" />
          Bug-Ray
        </Menu.Item>
        <Menu.Item name="Projects" as={NavLink} to="/projects" />
        <Menu.Item name="Errors" as={NavLink} to="/errors" />
        <Menu.Item>
          <Button
            positive
            content="Add Project"
            as={NavLink}
            to="/createProject"
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Image
            src={user?.image || "/assets/user.png"}
            avatar
            spaced="right"
          />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/${user?.username}`}
                text="Profile"
                icon="user"
              />
              <Dropdown.Item onClick={logout} text="Logout" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
