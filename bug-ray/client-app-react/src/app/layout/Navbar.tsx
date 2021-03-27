import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu inverted fixed="top" size="huge">
      <Menu.Item icon="bug" className="whiteGlow" as={NavLink} to="/" exact />
      <Menu.Item
        name="Bug-Ray"
        as={NavLink}
        to="/"
        className="whiteGlow"
        exact
      />
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
    </Menu>
  );
};

export default Navbar;
