import React from "react";
import { Button, Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu inverted fixed="top">
      <Menu.Item icon="bug" className="whiteGlow" />
      <Menu.Item name="Bug-Ray" />
      <Menu.Item>
        <Button positive content="Add Effort" />
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
