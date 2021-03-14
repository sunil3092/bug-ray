import React from "react";
import { Button, Menu } from "semantic-ui-react";

interface Props {
  openForm: () => void;
}

const Navbar = ({ openForm }: Props) => {
  return (
    <Menu inverted fixed="top" size="huge">
      <Menu.Item icon="bug" className="whiteGlow" />
      <Menu.Item name="Bug-Ray" />
      <Menu.Item>
        <Button positive content="Add Project" onClick={openForm} />
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
